import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.model';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    // Find admin
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    // Check password
    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    // Create JWT
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Set HttpOnly Cookie
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res.status(200).json({
      success: true,
      user: { email: admin.email, role: admin.role }
    });

  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('access_token');
  return res.status(200).json({ success: true, message: 'Logged out successfully' });
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ success: false, message: 'Email already exists' });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create admin
    const newAdmin = new Admin({ email, passwordHash, role: 'admin' });
    await newAdmin.save();

    // Log them in immediately
    const token = jwt.sign(
      { id: newAdmin._id, email: newAdmin.email, role: newAdmin.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );

    newAdmin.lastLogin = new Date();
    await newAdmin.save();

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res.status(201).json({
      success: true,
      user: { email: newAdmin.email, role: newAdmin.role }
    });
  } catch (error) {
    console.error('Signup Error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getMembers = async (req: Request, res: Response) => {
  try {
    const members = await Admin.find().select('-passwordHash');
    return res.status(200).json({ success: true, data: members });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const addMember = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;
    
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ success: false, message: 'Email already exists' });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({ email, passwordHash, role: role || 'viewer' });
    await newAdmin.save();

    const adminResponse = newAdmin.toObject();
    delete (adminResponse as any).passwordHash;

    return res.status(201).json({ success: true, data: adminResponse });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteMember = async (req: Request, res: Response) => {
  try {
    const memberId = req.params.id;
    await Admin.findByIdAndDelete(memberId);
    return res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
