import mongoose, { Schema, Document } from 'mongoose';

export interface IAdmin extends Document {
  email: string;
  passwordHash: string;
  role: 'admin' | 'viewer';
  lastLogin?: Date;
}

const AdminSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin', 'viewer'], default: 'admin' },
  lastLogin: { type: Date }
});

export default mongoose.model<IAdmin>('Admin', AdminSchema);
