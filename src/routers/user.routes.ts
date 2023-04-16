import { Router } from 'express';
import { getAuthUser } from '../controllers/user.controller';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

router.get('/me', protect, getAuthUser);

export default router;