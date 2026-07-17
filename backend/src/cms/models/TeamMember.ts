import mongoose, { Schema, type Document, type Model } from "mongoose";

export type TeamMemberDocument = Document & {
  name: string;
  designation: string;
  bio: string;
  image: string;
  linkedin: string;
  github: string;
  order: number;
  isActive: boolean;
  updatedAt: Date;
  createdAt: Date;
};

const teamSchema = new Schema<TeamMemberDocument>(
  {
    name: { type: String, required: true },
    designation: { type: String, default: "" },
    bio: { type: String, default: "" },
    image: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

teamSchema.index({ name: "text", designation: "text" });

export const TeamMember: Model<TeamMemberDocument> =
  mongoose.models.TeamMember ?? mongoose.model<TeamMemberDocument>("TeamMember", teamSchema);
