import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  source: string;
  utm_source?: string;
  utm_medium?: string;
  ip?: string;
  city?: string;
  device?: string;
  browser?: string;
  status: 'new' | 'read' | 'converted';
  createdAt: Date;
}

const LeadSchema: Schema = new Schema({
  name: { type: String, required: true },
  company: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, required: true },
  message: { type: String, required: true },
  source: { type: String, default: 'Direct' },
  utm_source: { type: String },
  utm_medium: { type: String },
  ip: { type: String },
  city: { type: String },
  device: { type: String },
  browser: { type: String },
  status: { type: String, enum: ['new', 'read', 'converted'], default: 'new' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<ILead>('Lead', LeadSchema);
