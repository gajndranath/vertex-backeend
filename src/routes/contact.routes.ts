import { Router } from 'express';
import { submitContactForm, getLeads } from '../controllers/contact.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

// Public route for contact form
router.post('/', submitContactForm);

// Protected admin route
router.get('/', verifyToken, getLeads);

export default router;
