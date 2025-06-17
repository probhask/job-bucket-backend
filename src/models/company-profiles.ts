import { Schema, SchemaTypes, model } from 'mongoose';
import { addressSchema } from '@/schemas/address';
import { socialLinkSchema } from '@/schemas/socialLinks';

const companyProfileSchema = new Schema({
  userId: {
    type: SchemaTypes.ObjectId,
    unique: true,
    required: true,
    immutable: true,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  companyLogoUrl: String,
  website: String,
  description: String,
  address: [addressSchema],
  size: String,
  socialLinks: [socialLinkSchema],
});

export const CompanyProfile = model('CompanyProfile', companyProfileSchema);
