// models/schemas/addressSchema.ts or similar
import { Schema } from 'mongoose';

export const addressSchema = new Schema(
  {
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
  },
  { _id: false },
);
