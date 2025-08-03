import { createDb } from '../db/drizzle.js';
import { berita as beritaSchema } from '../models/schema.js';
import { eq } from 'drizzle-orm';
import { uploadToDropbox, createSharedLink, deleteFromDropbox } from '../utils/dropbox.js';

const getWIBDateString = () => {
	const date = new Date();
	const options = {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: 'Asia/Jakarta',
	};
	return date.toLocaleDateString('id-ID', options);
};

export const getAllBerita = async (c) => {
	try {
		const db = createDb(c.env.DB);
		const allBerita = await db.select().from(beritaSchema);
		return c.json({ success: true, data: allBerita });
	} catch (error) {
		console.error('Error fetching all berita:', error);
		return c.json({ success: false, message: 'Internal Server Error' }, 500);
	}
};

export const getBeritaById = async (c) => {
	try {
		const id = parseInt(c.req.param('id'));
		if (isNaN(id)) {
			return c.json({ success: false, message: 'Invalid ID' }, 400);
		}

		const db = createDb(c.env.DB);
		const result = await db.select().from(beritaSchema).where(eq(beritaSchema.id, id));

		if (result.length === 0) {
			return c.json({ success: false, message: 'Berita not found' }, 404);
		}

		return c.json({ success: true, data: result[0] });
	} catch (error) {
		console.error(`Error fetching berita with id ${c.req.param('id')}:`, error);
		return c.json({ success: false, message: 'Internal Server Error' }, 500);
	}
};

export const createBerita = async (c) => {
	try {
		const db = createDb(c.env.DB);
		const body = await c.req.parseBody();

		const judul = body.judul;
		const isi = body.isi;
		const gambarFile = body.gambar;

		if (!judul || !isi || !(gambarFile instanceof File)) {
			return c.json({ success: false, message: 'Judul, isi, dan gambar wajib diisi' }, 400);
		}

		const dropboxFile = await uploadToDropbox(c, gambarFile);
		const imageUrl = await createSharedLink(c, dropboxFile.path_lower);

		const newBerita = {
			judul,
			isi,
			gambar: imageUrl,
			tanggal: getWIBDateString(),
		};

		const result = await db.insert(beritaSchema).values(newBerita).returning();

		return c.json({ success: true, message: 'Berita berhasil dibuat', data: result[0] }, 201);
	} catch (error) {
		console.error('Error creating berita:', error);
		return c.json({ success: false, message: 'Internal Server Error' }, 500);
	}
};

/**
 * @description Memperbarui berita yang sudah ada
 */
export const updateBerita = async (c) => {
	try {
		const id = parseInt(c.req.param('id'));
		if (isNaN(id)) {
			return c.json({ success: false, message: 'Invalid ID' }, 400);
		}

		const db = createDb(c.env.DB);
		const body = await c.req.parseBody();

		// Cek apakah berita ada
		const existingBeritaResult = await db.select().from(beritaSchema).where(eq(beritaSchema.id, id));
		if (existingBeritaResult.length === 0) {
			return c.json({ success: false, message: 'Berita not found' }, 404);
		}
		const existingBerita = existingBeritaResult[0];

		let imageUrl = existingBerita.gambar;
		const newImageFile = body.gambar;

		// Jika ada file gambar baru yang di-upload
		if (newImageFile instanceof File) {
			// Hapus gambar lama dari Dropbox
			if (existingBerita.gambar) {
				await deleteFromDropbox(c, existingBerita.gambar);
			}
			// Upload gambar baru
			const dropboxFile = await uploadToDropbox(c, newImageFile);
			imageUrl = await createSharedLink(c, dropboxFile.path_lower);
		}

		const updatedData = {
			judul: body.judul || existingBerita.judul,
			isi: body.isi || existingBerita.isi,
			gambar: imageUrl,
			tanggal: getWIBDateString(), // Perbarui tanggal setiap kali ada editan
		};

		const result = await db.update(beritaSchema).set(updatedData).where(eq(beritaSchema.id, id)).returning();

		return c.json({ success: true, message: 'Berita berhasil diperbarui', data: result[0] });
	} catch (error) {
		console.error(`Error updating berita with id ${c.req.param('id')}:`, error);
		return c.json({ success: false, message: 'Internal Server Error' }, 500);
	}
};

/**
 * @description Menghapus berita
 */
export const deleteBerita = async (c) => {
	try {
		const id = parseInt(c.req.param('id'));
		if (isNaN(id)) {
			return c.json({ success: false, message: 'Invalid ID' }, 400);
		}

		const db = createDb(c.env.DB);

		// Cari berita untuk mendapatkan URL gambar
		const beritaToDeleteResult = await db.select().from(beritaSchema).where(eq(beritaSchema.id, id));
		if (beritaToDeleteResult.length === 0) {
			return c.json({ success: false, message: 'Berita not found' }, 404);
		}
		const beritaToDelete = beritaToDeleteResult[0];

		// Hapus gambar dari Dropbox
		if (beritaToDelete.gambar) {
			await deleteFromDropbox(c, beritaToDelete.gambar);
		}

		// Hapus data dari database
		await db.delete(beritaSchema).where(eq(beritaSchema.id, id));

		return c.json({ success: true, message: 'Berita berhasil dihapus' });
	} catch (error) {
		console.error(`Error deleting berita with id ${c.req.param('id')}:`, error);
		return c.json({ success: false, message: 'Internal Server Error' }, 500);
	}
};
