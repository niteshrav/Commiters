import mongoose, { Schema, type Document, type Model } from "mongoose";

export type NavLink = { label: string; url: string; order: number };

export type NavbarDocument = Document & {
  logo: string;
  logoAlt: string;
  navLinks: NavLink[];
  ctaLabel: string;
  ctaUrl: string;
  isActive: boolean;
  updatedAt: Date;
  createdAt: Date;
};

const navLinkSchema = new Schema<NavLink>(
  {
    label: { type: String, required: true },
    url: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { _id: false },
);

const navbarSchema = new Schema<NavbarDocument>(
  {
    logo: { type: String, default: "" },
    logoAlt: { type: String, default: "Commiters" },
    navLinks: { type: [navLinkSchema], default: [] },
    ctaLabel: { type: String, default: "Start Project" },
    ctaUrl: { type: String, default: "/contact" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Navbar: Model<NavbarDocument> =
  mongoose.models.Navbar ?? mongoose.model<NavbarDocument>("Navbar", navbarSchema);
