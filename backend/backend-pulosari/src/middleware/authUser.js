import { eq } from 'drizzle-orm';
import { createDb } from '../db/drizzle';
import { users } from '../models/schema';

export const verifyUser = async (c, next) => {
	try {
		const session = c.get('session');
		const userId = session.get('userId');

		if (!userId) {
			return c.json({ success: false, message: 'User tidak terautentikasi' }, 401);
		}

		const db = createDb(c.env.DB);
		const result = await db.select().from(users).where(eq(users.id, userId));
		const user = result[0];

		if (!user) {
			return c.json({ success: false, message: 'User tidak ditemukan' }, 404);
		}

		c.set('user', user);
		await next();
	} catch (error) {
		return c.json({ success: false, message: error.message }, 500);
	}
};
