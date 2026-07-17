import mongoose, { Schema, type Document, type Model } from "mongoose";

export type TestimonialDocument = Document & {
  clientName: string;
  company: string;
  review: string;
  rating: number;
  photo: string;
  order: number;
  isActive: boolean;
  updatedAt: Date;
  createdAt: Date;
};

const testimonialSchema = new Schema<TestimonialDocument>(
  {
    clientName: { type: String, required: true },
    company: { type: String, default: "" },
    review: { type: String, default: "" },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    photo: { type: String, default: "" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

testimonialSchema.index({ clientName: "text", company: "text", review: "text" });

export const Testimonial: Model<TestimonialDocument> =
  mongoose.models.Testimonial ?? mongoose.model<TestimonialDocument>("Testimonial", testimonialSchema);
