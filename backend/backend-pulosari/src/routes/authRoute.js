import { Hono } from 'hono';
import { login, logout, Me } from '../controllers/auth.js';

const router = new Hono();

router.post('/login', login);
router.delete('/logout', logout);
router.get('/me', Me);

export default router;
