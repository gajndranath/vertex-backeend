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

export const getAnalyticsDashboard = async (req: Request, res: Response) => {
  try {
    // This will aggregate data for the admin dashboard later
    const totalEvents = await AnalyticsEvent.countDocuments();
    return res.status(200).json({ success: true, data: { totalEvents } });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};
