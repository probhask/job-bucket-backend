import { Document, Types } from 'mongoose';
import { Role } from '@/types';

export interface IUser extends Document {
  name: string;
  email: string;
  phone?: string;
  password: string;
  role: Role;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOtp extends Document {
  userId?: Types.ObjectId;
  email?: string;
  phone?: string;
  otp: string;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IToken extends Document {
  token: string;
  type: string;
  userId: Types.ObjectId;
  expiresAt: Date;
  blacklisted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
