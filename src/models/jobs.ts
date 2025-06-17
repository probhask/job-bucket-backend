// models/Job.ts
import { Schema, model, Types } from 'mongoose';

const jobSchema = new Schema({
  providerId: { type: Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  responsibilities: [{ type: String }],
  requirements: [{ type: String }],
  location: { type: String, required: true },
  type: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Internship', 'Contract'],
    required: true,
  },
  salaryRange: {
    min: { type: Number },
    max: { type: Number },
  },
  questions: [{ type: String }],
  isPremium: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ['Open', 'Closed'],
    default: 'Open',
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Job = model('Job', jobSchema);
