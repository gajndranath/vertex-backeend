import mongoose, { Schema, Document } from 'mongoose';

export interface IAnalyticsEvent extends Document {
  type: string;
  page: string;
  referrer?: string;
  device?: string;
  browser?: string;
  os?: string;
  city?: string;
  country?: string;
  duration?: number;
  sessionId: string;
  timestamp: Date;
}

const AnalyticsEventSchema: Schema = new Schema({
  type: { type: String, required: true },
  page: { type: String, required: true },
  referrer: { type: String },
  device: { type: String },
  browser: { type: String },
  os: { type: String },
  city: { type: String },
  country: { type: String },
  duration: { type: Number },
  sessionId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model<IAnalyticsEvent>('AnalyticsEvent', AnalyticsEventSchema);
