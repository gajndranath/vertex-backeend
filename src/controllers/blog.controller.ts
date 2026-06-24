import { Request, Response } from 'express';
import Blog from '../models/Blog.model';

export const createBlog = async (req: Request, res: Response) => {
  try {
    const newBlog = await Blog.create(req.body);
    return res.status(201).json({ success: true, data: newBlog });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getBlogs = async (req: Request, res: Response) => {
  try {
    // Public route should only see published blogs
    const filter = req.baseUrl.includes('admin') ? {} : { published: true };
    const blogs = await Blog.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getBlogBySlug = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findOne({ slug: String(req.params.slug) });
    if (!blog) return res.status(404).json({ success: false, message: 'Not found' });
    
    // Increment view count
    blog.views += 1;
    await blog.save();

    return res.status(200).json({ success: true, data: blog });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).json({ success: true, data: updatedBlog });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
