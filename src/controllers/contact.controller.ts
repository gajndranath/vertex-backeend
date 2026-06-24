import { Request, Response } from 'express';
import Lead from '../models/Lead.model';
import { sendLeadNotification } from '../services/email.service';

export const submitContactForm = async (req: Request, res: Response) => {
  try {
    const { name, company, email, phone, service, message, source, utm_source, utm_medium } = req.body;

    // Capture IP, City, Device from request
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];

    // 1. Save to Database
    const newLead = await Lead.create({
      name,
      company,
      email,
      phone,
      service,
      message,
      source: source || 'Direct',
      utm_source,
      utm_medium,
      ip: typeof ip === 'string' ? ip : '',
      device: userAgent || '',
      status: 'new'
    });

    // 2. Send Email via Resend
    await sendLeadNotification(newLead);

    return res.status(201).json({ success: true, message: 'Enquiry submitted successfully' });
  } catch (error) {
    console.error('Contact Form Error:', error);
    return res.status(500).json({ success: false, message: 'Server error while submitting form' });
  }
};

export const getLeads = async (req: Request, res: Response) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: leads });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
