import { Request, Response } from 'express';
import AnalyticsEvent from '../models/Event.model';

export const trackEvent = async (req: Request, res: Response) => {
  try {
    const { type, page, referrer, device, browser, os, duration, sessionId } = req.body;

    // Optional: Get location from IP (geoip-lite or similar service)
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    await AnalyticsEvent.create({
      type,
      page,
      referrer,
      device,
      browser,
      os,
      duration,
      sessionId,
      // ip could be mapped to city/country here using a geo-service
    });

    // Return 204 No Content for analytics calls to save bandwidth
    return res.status(204).send();
  } catch (error) {
    console.error('Analytics Error:', error);
    return res.status(500).json({ success: false });
  }
};

import Admin from '../models/Admin.model';
import Lead from '../models/Lead.model';
import Blog from '../models/Blog.model';

export const getAnalyticsDashboard = async (req: Request, res: Response) => {
  try {
    const totalLeads = await Lead.countDocuments();
    const totalBlogs = await Blog.countDocuments({ published: true });
    const totalMembers = await Admin.countDocuments();
    
    // Active visitors: pageviews in the last 15 minutes
    const fifteenMinsAgo = new Date(Date.now() - 15 * 60 * 1000);
    const activeVisitors = await AnalyticsEvent.countDocuments({ 
      type: 'pageview', 
      createdAt: { $gte: fifteenMinsAgo } 
    });

    return res.status(200).json({ 
      success: true, 
      data: { 
        totalLeads,
        totalBlogs,
        activeVisitors,
        totalMembers
      } 
    });
  } catch (error) {
    console.error('Dashboard Error:', error);
    return res.status(500).json({ success: false });
  }
};
