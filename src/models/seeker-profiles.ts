// models/SeekerProfile.ts
import mongoose, { Schema } from 'mongoose';
import { addressSchema } from '@/schemas/address';

const seekerProfileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    unique: true,
    required: true,
    immutable: true,
    ref: 'User',
  },
  bio: String,
  resume: String,

  workExperience: [
    new Schema(
      {
        position: String,
        experience: Number,
        from: Date,
        to: Date,
      },
      { _id: false },
    ),
  ],

  education: [
    new Schema(
      {
        type: String,
        grades: Number,
        gradeType: {
          type: String,
          enum: ['CGPA', 'PERCENTAGE'],
        },
        from: Date,
        to: Date,
      },
      { _id: false },
    ),
  ],

  address: [addressSchema],

  jobPreferences: [String],
});

export const SeekerProfile = mongoose.model(
  'SeekerProfile',
  seekerProfileSchema,
);
