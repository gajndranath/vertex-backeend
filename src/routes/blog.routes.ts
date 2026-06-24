import { Router } from 'express';
import { createBlog, getBlogs, getBlogBySlug, updateBlog, deleteBlog } from '../controllers/blog.controller';
import { verifyToken, checkRole } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.get('/', getBlogs);
router.get('/:slug', getBlogBySlug);

// Protected admin routes
router.post('/', verifyToken, checkRole('admin'), createBlog);
router.put('/:id', verifyToken, checkRole('admin'), updateBlog);
router.delete('/:id', verifyToken, checkRole('admin'), deleteBlog);

export default router;
