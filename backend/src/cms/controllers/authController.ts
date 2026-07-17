import bcrypt from "bcryptjs";
import { z } from "zod";
import type { Request, Response } from "express";
import { User, type UserDocument } from "../models";
import { signAuthToken } from "../middleware/auth";
import { asyncHandler } from "../utils/asyncHandler";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1).max(120),
});

const updateProfileSchema = z.object({
  name: z.string().min(1).max(120).optional(),
  email: z.string().email().optional(),
  phone: z.string().max(30).optional(),
  avatar: z.string().max(500).optional(),
});

const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(6),
    newPassword: z.string().min(8).max(128),
    confirmPassword: z.string().min(8).max(128),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New password and confirmation do not match.",
    path: ["confirmPassword"],
  });

function serializeUser(user: UserDocument) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    phone: user.phone ?? "",
    avatar: user.avatar ?? "",
    role: user.role,
  };
}

export const login = asyncHandler(async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid credentials payload." });
  }

  const user = await User.findOne({ email: parsed.data.email.toLowerCase() });
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password." });
  }

  const valid = await bcrypt.compare(parsed.data.password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: "Invalid email or password." });
  }

  const token = signAuthToken({ sub: user.id, email: user.email, role: "admin" });
  return res.json({
    token,
    user: serializeUser(user),
  });
});

export const registerInitialAdmin = asyncHandler(async (req: Request, res: Response) => {
  const existing = await User.countDocuments();
  if (existing > 0) {
    return res.status(403).json({ error: "Admin user already exists." });
  }

  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid registration payload." });
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);
  const user = await User.create({
    email: parsed.data.email.toLowerCase(),
    passwordHash,
    name: parsed.data.name,
    role: "admin",
  });

  const token = signAuthToken({ sub: user.id, email: user.email, role: "admin" });
  return res.status(201).json({
    token,
    user: serializeUser(user),
  });
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.auth?.sub);
  if (!user) return res.status(404).json({ error: "User not found." });
  return res.json({ user: serializeUser(user) });
});

export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const parsed = updateProfileSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid profile payload." });
  }

  const user = await User.findById(req.auth?.sub);
  if (!user) return res.status(404).json({ error: "User not found." });

  const updates = parsed.data;
  if (updates.email && updates.email.toLowerCase() !== user.email) {
    const taken = await User.findOne({ email: updates.email.toLowerCase() });
    if (taken && taken.id !== user.id) {
      return res.status(409).json({ error: "That email is already in use." });
    }
    user.email = updates.email.toLowerCase();
  }
  if (updates.name !== undefined) user.name = updates.name.trim();
  if (updates.phone !== undefined) user.phone = updates.phone.trim();
  if (updates.avatar !== undefined) user.avatar = updates.avatar.trim();

  await user.save();
  return res.json({ user: serializeUser(user) });
});

export const updatePassword = asyncHandler(async (req: Request, res: Response) => {
  const parsed = updatePasswordSchema.safeParse(req.body);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Invalid password payload.";
    return res.status(400).json({ error: message });
  }

  const user = await User.findById(req.auth?.sub);
  if (!user) return res.status(404).json({ error: "User not found." });

  const valid = await bcrypt.compare(parsed.data.currentPassword, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: "Current password is incorrect." });
  }

  user.passwordHash = await bcrypt.hash(parsed.data.newPassword, 12);
  await user.save();
  return res.json({ ok: true, message: "Password updated successfully." });
});
