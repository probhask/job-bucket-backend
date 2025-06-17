// models/Application.ts
import { Schema, model, Types } from 'mongoose';

const applicationSchema = new Schema({
  jobId: { type: Types.ObjectId, ref: 'Job', required: true },
  seekerId: { type: Types.ObjectId, ref: 'User', required: true },
  resumeUrl: { type: String, required: true },
  answersToQuestions: [{ question: String, answer: String }],
  status: {
    type: String,
    enum: ['Applied', 'Reviewed', 'Rejected', 'Accepted', 'Withdrawn'],
    default: 'Applied',
  },
  appliedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

applicationSchema.index({ seekerId: 1, jobId: 1 }, { unique: true }); // prevent duplicate applications

export const Application = model('Application', applicationSchema);
