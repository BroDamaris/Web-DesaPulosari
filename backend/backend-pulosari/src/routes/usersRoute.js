import { Hono } from 'hono';
import { getUsers, getUserByID, createUser, updateUser, deleteUser } from '../controllers/users.js';
import { verifyUser } from '../middleware/authUser.js';

const router = new Hono();

router.use('/*', verifyUser);

router.get('/', getUsers);
router.get('/:id', getUserByID);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
