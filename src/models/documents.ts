// models/Document.ts
import { Schema, model, Types } from 'mongoose';

const documentSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User', required: true },
  fileType: {
    type: String,
    enum: ['resume', 'cover_letter', 'id_proof', 'other'],
    required: true,
  },
  fileUrl: { type: String, required: true },
  fileName: { type: String },
  uploadedAt: { type: Date, default: Date.now },
});

export const Document = model('Document', documentSchema);
