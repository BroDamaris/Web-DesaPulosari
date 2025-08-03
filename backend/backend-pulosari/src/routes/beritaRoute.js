import { Hono } from 'hono';
import { getAllBerita, getBeritaById, createBerita, updateBerita, deleteBerita } from '../controllers/berita.js';
import { verifyUser } from '../middleware/authUser.js';

const router = new Hono();

router.get('/', getAllBerita);
router.get('/:id', getBeritaById);
router.post('/', verifyUser, createBerita);
router.put('/:id', verifyUser, updateBerita);
router.delete('/:id', verifyUser, deleteBerita);

export default router;
