import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { createDb } from '../db/drizzle';
import { users } from '../models/schema';

export const getUsers = async (c) => {
	try {
		const db = createDb(c.env.DB);
		const results = await db
			.select({
				id: users.id,
				nama: users.nama,
				username: users.username,
			})
			.from(users);

		return c.json({
			success: true,
			message: results.length === 0 ? 'Tidak ada data users' : 'users berhasil di GET',
			data: results,
		});
	} catch (error) {
		return c.json({ success: false, message: error.message }, 500);
	}
};

export const getUserByID = async (c) => {
	try {
		const id = c.req.param('id');
		if (isNaN(parseInt(id))) {
			return c.json({ success: false, message: 'ID tidak valid' }, 400);
		}

		const db = createDb(c.env.DB);

		const result = await db
			.select({
				id: users.id,
				nama: users.nama,
				username: users.username,
			})
			.from(users)
			.where(eq(users.id, parseInt(id)))
			.limit(1);

		const user = result[0];
		if (!user) {
			return c.json({ success: false, message: 'User tidak ditemukan' }, 404);
		}

		return c.json({
			success: true,
			message: 'User berhasil di GET berdasarkan ID',
			data: user,
		});
	} catch (error) {
		return c.json({ success: false, message: error.message }, 500);
	}
};

export const createUser = async (c) => {
	try {
		const { nama, username, password, confPassword } = await c.req.json();
		const db = createDb(c.env.DB);

		if (!nama || !username || !password || !confPassword) {
			return c.json({ success: false, message: 'Semua field harus diisi' }, 400);
		}

		if (password.length < 8) return c.json({ success: false, message: 'Password minimal 8 karakter' }, 400);
		if (!/[A-Z]/.test(password)) return c.json({ success: false, message: 'Password harus mengandung minimal satu huruf kapital' }, 400);
		if (!/[0-9]/.test(password)) return c.json({ success: false, message: 'Password harus mengandung minimal satu angka' }, 400);
		if (password !== confPassword) return c.json({ success: false, message: 'Password dan confirm password tidak cocok' }, 400);

		const existingUser = await db.select({ id: users.id }).from(users).where(eq(users.username, username));
		if (existingUser.length > 0) {
			return c.json({ success: false, message: 'Username sudah terdaftar' }, 400);
		}

		const hashPassword = await bcrypt.hash(password, 10);

		const newUser = {
			nama,
			username,
			password: hashPassword,
		};

		await db.insert(users).values(newUser);

		return c.json(
			{
				success: true,
				message: 'User berhasil ditambahkan',
			},
			201
		);
	} catch (error) {
		return c.json({ success: false, message: error.message }, 500);
	}
};

export const updateUser = async (c) => {
	try {
		const id = c.req.param('id');
		if (isNaN(parseInt(id))) {
			return c.json({ success: false, message: 'ID tidak valid' }, 400);
		}
		const numericId = parseInt(id);

		const { nama, username, password, confPassword } = await c.req.json();
		const db = createDb(c.env.DB);

		const existingUsers = await db.select().from(users).where(eq(users.id, numericId));
		const existingUser = existingUsers[0];

		if (!existingUser) {
			return c.json({ success: false, message: 'User tidak ditemukan' }, 404);
		}

		let newUsername = existingUser.username;
		if (username && username !== existingUser.username) {
			const checkUsername = await db.select({ id: users.id }).from(users).where(eq(users.username, username));
			if (checkUsername.length > 0) return c.json({ success: false, message: 'Username sudah terdaftar' }, 400);

			newUsername = username;
		}

		let newPassword = existingUser.password;
		if (password) {
			if (password.length < 8) return c.json({ success: false, message: 'Password minimal 8 karakter' }, 400);
			if (!/[A-Z]/.test(password)) return c.json({ success: false, message: 'Password harus mengandung minimal satu huruf kapital' }, 400);
			if (!/[0-9]/.test(password)) return c.json({ success: false, message: 'Password harus mengandung minimal satu angka' }, 400);
			if (password !== confPassword) return c.json({ success: false, message: 'Password dan confirm password tidak cocok' }, 400);
			newPassword = await bcrypt.hash(password, 10);
		}

		const updatedData = {
			nama: nama || existingUser.nama,
			username: newUsername,
			password: newPassword,
		};

		await db.update(users).set(updatedData).where(eq(users.id, numericId));

		return c.json({
			success: true,
			message: 'User berhasil diperbarui',
		});
	} catch (error) {
		return c.json({ success: false, message: error.message }, 500);
	}
};

export const deleteUser = async (c) => {
	try {
		const id = c.req.param('id');
		if (isNaN(parseInt(id))) {
			return c.json({ success: false, message: 'ID tidak valid' }, 400);
		}
		const numericId = parseInt(id);

		const db = createDb(c.env.DB);

		const existingUsers = await db.select({ id: users.id }).from(users).where(eq(users.id, numericId));
		if (existingUsers.length === 0) {
			return c.json({ success: false, message: 'User tidak ditemukan' }, 404);
		}

		await db.delete(users).where(eq(users.id, numericId));

		return c.json({ success: true, message: 'User berhasil dihapus' });
	} catch (error) {
		return c.json({ success: false, message: error.message }, 500);
	}
};
