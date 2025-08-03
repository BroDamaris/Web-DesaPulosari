import { Hono } from 'hono';
import { getAllGaleri, getGaleriById, createGaleri, updateGaleri, deleteGaleri } from '../controllers/galeri.js';
import { verifyUser } from '../middleware/authUser.js';

const router = new Hono();

router.get('/', getAllGaleri);
router.get('/:id', getGaleriById);
router.post('/', verifyUser, createGaleri);
router.put('/:id', verifyUser, updateGaleri);
router.delete('/:id', verifyUser, deleteGaleri);

export default router;
