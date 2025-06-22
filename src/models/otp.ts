import { IOtp } from '@/types/models';
import { model, Schema, SchemaTypes } from 'mongoose';

const otpSchema = new Schema<IOtp>(
  {
    userId: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const Otp = model('Otp', otpSchema);

export default Otp;
