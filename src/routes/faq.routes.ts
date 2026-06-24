import { Router } from 'express';
import { getFaqs, createFaq, updateFaq, deleteFaq } from '../controllers/faq.controller';
import { verifyToken, checkRole } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.get('/', getFaqs);

// Protected admin routes
router.post('/', verifyToken, checkRole('admin'), createFaq);
router.put('/:id', verifyToken, checkRole('admin'), updateFaq);
router.delete('/:id', verifyToken, checkRole('admin'), deleteFaq);

export default router;
