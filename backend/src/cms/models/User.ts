import mongoose, { Schema, type Document, type Model } from "mongoose";

export type UserDocument = Document & {
  email: string;
  passwordHash: string;
  name: string;
  phone: string;
  avatar: string;
  role: "admin";
  createdAt: Date;
  updatedAt: Date;
};

const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    phone: { type: String, default: "", trim: true },
    avatar: { type: String, default: "" },
    role: { type: String, enum: ["admin"], default: "admin" },
  },
  { timestamps: true },
);

export const User: Model<UserDocument> =
  mongoose.models.User ?? mongoose.model<UserDocument>("User", userSchema);
