import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    avatar: { type: String, trim: true },
  },
  { timestamps: true },
);

export const User = model('User', userSchema);
