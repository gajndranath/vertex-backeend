import { Router } from 'express';
import { login, logout, signup, getMembers, addMember, deleteMember } from '../controllers/admin.controller';
import { verifyToken, checkRole } from '../middleware/auth.middleware';

const router = Router();

// Public auth routes
router.post('/login', login);
router.post('/signup', signup);

// Protected auth routes
router.post('/logout', verifyToken, logout);

// Team Management routes (Protected)
router.get('/members', verifyToken, getMembers);
router.post('/members', verifyToken, checkRole('admin'), addMember);
router.delete('/members/:id', verifyToken, checkRole('admin'), deleteMember);

export default router;
