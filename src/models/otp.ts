import { model, Schema, SchemaTypes } from 'mongoose';

const otpSchema = new Schema(
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
