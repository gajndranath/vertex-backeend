import { Router } from 'express';
import { trackEvent, getAnalyticsDashboard } from '../controllers/analytics.controller';

const router = Router();

// Public route for tracking events from frontend
router.post('/track', trackEvent);

// Protected route for admin dashboard
router.get('/dashboard', getAnalyticsDashboard);

export default router;
