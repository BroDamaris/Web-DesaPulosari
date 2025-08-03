import { createDb } from '../db/drizzle.js';
import { galeri as galeriSchema } from '../models/schema.js';
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

export const getAllGaleri = async (c) => {
	try {
		const db = createDb(c.env.DB);
		const allGaleri = await db.select().from(galeriSchema);
		return c.json({ success: true, data: allGaleri });
	} catch (error) {
		console.error('Error fetching all galeri:', error);
		return c.json({ success: false, message: 'Internal Server Error' }, 500);
	}
};

export const getGaleriById = async (c) => {
	try {
		const id = parseInt(c.req.param('id'));
		if (isNaN(id)) {
			return c.json({ success: false, message: 'Invalid ID' }, 400);
		}

		const db = createDb(c.env.DB);
		const result = await db.select().from(galeriSchema).where(eq(galeriSchema.id, id));

		if (result.length === 0) {
			return c.json({ success: false, message: 'Galeri not found' }, 404);
		}

		return c.json({ success: true, data: result[0] });
	} catch (error) {
		console.error(`Error fetching galeri with id ${c.req.param('id')}:`, error);
		return c.json({ success: false, message: 'Internal Server Error' }, 500);
	}
};

export const createGaleri = async (c) => {
	try {
		const db = createDb(c.env.DB);
		const body = await c.req.parseBody();

		const judul = body.judul;
		const gambarFile = body.gambar;

		if (!judul || !(gambarFile instanceof File)) {
			return c.json({ success: false, message: 'Judul and gambar are required' }, 400);
		}

		// Upload image to Dropbox
		const dropboxFile = await uploadToDropbox(c, gambarFile);
		const imageUrl = await createSharedLink(c, dropboxFile.path_lower);

		// Insert into database
		const newGaleri = {
			judul,
			gambar: imageUrl,
			tanggal: getWIBDateString(),
		};

		const result = await db.insert(galeriSchema).values(newGaleri).returning();

		return c.json({ success: true, message: 'Galeri created successfully', data: result[0] }, 201);
	} catch (error) {
		console.error('Error creating galeri:', error);
		return c.json({ success: false, message: 'Internal Server Error' }, 500);
	}
};

export const updateGaleri = async (c) => {
	try {
		const id = parseInt(c.req.param('id'));
		if (isNaN(id)) {
			return c.json({ success: false, message: 'Invalid ID' }, 400);
		}

		const db = createDb(c.env.DB);
		const body = await c.req.parseBody();

		const existingGaleriResult = await db.select().from(galeriSchema).where(eq(galeriSchema.id, id));
		if (existingGaleriResult.length === 0) {
			return c.json({ success: false, message: 'Galeri not found' }, 404);
		}
		const existingGaleri = existingGaleriResult[0];

		let imageUrl = existingGaleri.gambar;
		const newImageFile = body.gambar;

		if (newImageFile instanceof File) {
			if (existingGaleri.gambar) {
				await deleteFromDropbox(c, existingGaleri.gambar);
			}
			const dropboxFile = await uploadToDropbox(c, newImageFile);
			imageUrl = await createSharedLink(c, dropboxFile.path_lower);
		}

		const updatedData = {
			judul: body.judul || existingGaleri.judul,
			gambar: imageUrl,
			tanggal: getWIBDateString(), // Update the timestamp on every edit
		};

		const result = await db.update(galeriSchema).set(updatedData).where(eq(galeriSchema.id, id)).returning();

		return c.json({ success: true, message: 'Galeri updated successfully', data: result[0] });
	} catch (error) {
		console.error(`Error updating galeri with id ${c.req.param('id')}:`, error);
		return c.json({ success: false, message: 'Internal Server Error' }, 500);
	}
};

export const deleteGaleri = async (c) => {
	try {
		const id = parseInt(c.req.param('id'));
		if (isNaN(id)) {
			return c.json({ success: false, message: 'Invalid ID' }, 400);
		}

		const db = createDb(c.env.DB);

		// Find the galeri to get the image URL
		const galeriToDeleteResult = await db.select().from(galeriSchema).where(eq(galeriSchema.id, id));
		if (galeriToDeleteResult.length === 0) {
			return c.json({ success: false, message: 'Galeri not found' }, 404);
		}
		const galeriToDelete = galeriToDeleteResult[0];

		// Delete the image from Dropbox
		if (galeriToDelete.gambar) {
			await deleteFromDropbox(c, galeriToDelete.gambar);
		}

		// Delete the record from the database
		await db.delete(galeriSchema).where(eq(galeriSchema.id, id));

		return c.json({ success: true, message: 'Galeri deleted successfully' });
	} catch (error) {
		console.error(`Error deleting galeri with id ${c.req.param('id')}:`, error);
		return c.json({ success: false, message: 'Internal Server Error' }, 500);
	}
};
