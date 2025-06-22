import mongoose from 'mongoose';
import { Role } from 'types';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: String,
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      required: true,
    },
    isVerified: Boolean,
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('user', userSchema);

export default User;
