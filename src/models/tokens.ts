import { model, Schema, SchemaTypes } from 'mongoose';

enum TokenType {
  ACCESS,
  REFRESH,
  RESET_PASSWORD,
}
const tokenSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: TokenType,
      required: true,
    },
    userId: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },

    blacklisted: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Token = model('Token', tokenSchema);

export default Token;
