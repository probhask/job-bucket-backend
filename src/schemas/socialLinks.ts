import { Schema } from 'mongoose';

export const socialLinkSchema = new Schema(
  {
    title: { type: String, required: true },
    link: { type: String, required: true },
  },
  { _id: false },
);
