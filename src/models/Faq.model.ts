import mongoose, { Schema, Document } from 'mongoose';

export interface IFaq extends Document {
  question: string;
  answer: string;
  category: string;
  order: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const FaqSchema: Schema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: String, required: true, default: 'General' },
  order: { type: Number, default: 0 },
  published: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model<IFaq>('Faq', FaqSchema);
