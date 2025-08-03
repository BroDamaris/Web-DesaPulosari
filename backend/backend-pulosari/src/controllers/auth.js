import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { createDb } from '../db/drizzle';
import { users } from '../models/schema';

export const login = async (c) => {
	try {
		const { username, password } = await c.req.json();

		if (!username || !password) {
			return c.json({ success: false, message: 'Username dan password wajib diisi' }, 400);
		}

		const db = createDb(c.env.DB);
		const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
		const existingUser = result[0];

		if (!existingUser) {
			return c.json({ success: false, message: 'User tidak ditemukan' }, 404);
		}

		const match = await bcrypt.compare(password, existingUser.password);
		if (!match) {
			return c.json({ success: false, message: 'Password salah' }, 401);
		}

		const session = c.get('session');
		session.set('userId', existingUser.id);

		return c.json({ success: true, message: 'Login berhasil' }, 200);
	} catch (error) {
		return c.json({ success: false, message: error.message }, 500);
	}
};

export const Me = async (c) => {
	try {
		const session = c.get('session');
		const userId = session.get('userId');

		if (!userId) {
			return c.json({ success: false, message: 'User tidak terautentikasi' }, 401);
		}

		const db = createDb(c.env.DB);
		const result = await db
			.select({
				id: users.id,
				nama: users.nama,
				username: users.username,
			})
			.from(users)
			.where(eq(users.id, userId));

		const user = result[0];
		if (!user) {
			return c.json({ success: false, message: 'User tidak ditemukan' }, 404);
		}

		return c.json({
			success: true,
			message: 'Data user ditemukan',
			data: user,
		});
	} catch (error) {
		return c.json({ success: false, message: error.message }, 500);
	}
};

export const logout = async (c) => {
	try {
		c.get('session').deleteSession();
		return c.json({ success: true, message: 'Logout berhasil' });
	} catch (error) {
		return c.json({ success: false, message: error.message }, 500);
	}
};
