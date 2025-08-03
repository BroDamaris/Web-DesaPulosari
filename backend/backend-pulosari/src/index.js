import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { sessionMiddleware, CookieStore } from 'hono-sessions';
import authRoute from './routes/authRoute.js';
import usersRoute from './routes/usersRoute.js';
import galeriRoute from './routes/galeriRoute.js';
import beritaRoute from './routes/beritaRoute.js';

const app = new Hono();
const sessionStore = new CookieStore();

app.use(
	'/*',
	cors({
		// Ganti URL di bawah ini dengan URL frontend Anda saat sudah di-deploy
		origin: [
			'http://localhost:5173',
			'http://localhost:5174',
			'https://website-desa-pulosari.anugrahdamarishakim.workers.dev',
			'https://admin-desa-pulosari.anugrahdamarishakim.workers.dev',
		],
		allowHeaders: ['Content-Type', 'Authorization'],
		credentials: true, // Wajib ada karena Anda mengirim cookie
	})
);

app.use('*', async (c, next) => {
	const session = sessionMiddleware({
		store: sessionStore,
		encryptionKey: c.env.encryptionKey,
		resave: false,
		saveUninitialized: true,
		expireAfterSeconds: 60 * 60 * 24 * 3, // 3 hari
		sessionCookieName: 'session',
		cookieOptions: {
			// path: '/',
			secure: true,
			httpOnly: true,
			sameSite: 'None',
		},
	});
	return session(c, next);
});

app.route('/api/auth', authRoute);
app.route('/api/users', usersRoute);
app.route('/api/galeri', galeriRoute);
app.route('/api/berita', beritaRoute);

app.get('/', (c) => c.text('Server Web Profile Desa Pulosari up and running!'));

export default app;
