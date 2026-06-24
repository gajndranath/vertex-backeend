import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  tags: string[];
  author: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  readTime: number;
}

const BlogSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  excerpt: { type: String, required: true },
  coverImage: { type: String },
  tags: [{ type: String }],
  author: { type: String, required: true },
  published: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  readTime: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model<IBlog>('Blog', BlogSchema);
