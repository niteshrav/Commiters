/** Letters, spaces, apostrophes, hyphens — ASCII names only */
const NAME_ALLOWED = /^[a-zA-Z\s'-]+$/;

/** Budget: INR amounts using digits and thousand separators (commas) */
const BUDGET_ALLOWED = /^[\d,]+$/;

/** Timeline: letters, digits, spaces, hyphen */
const TIMELINE_ALLOWED = /^[a-zA-Z0-9\s-]+$/;

export function sanitizeNameInput(value: string): string {
  return value.replace(/[^a-zA-Z\s'-]/g, "");
}

export function sanitizeBudgetInput(value: string): string {
  return value.replace(/[^\d,]/g, "");
}

export function sanitizeTimelineInput(value: string): string {
  return value.replace(/[^a-zA-Z0-9\s-]/g, "");
}

export function validateName(value: string): string | null {
  const t = value.trim();
  if (!t) return "Please enter your name.";
  if (!NAME_ALLOWED.test(t)) return "Use letters only—spaces, hyphens, and apostrophes are ok.";
  return null;
}

export function validateEmail(value: string): string | null {
  const t = value.trim();
  if (!t) return "Please enter your email.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)) return "Please enter a valid email.";
  return null;
}

export function validateBudgetOptional(value: string): string | null {
  const t = value.trim();
  if (!t) return null;
  if (!BUDGET_ALLOWED.test(t)) return "Budget: use digits and commas only (₹).";
  if (!/\d/.test(t)) return "Budget: include at least one digit (₹).";
  return null;
}

export function validateTimelineOptional(value: string): string | null {
  const t = value.trim();
  if (!t) return null;
  if (!TIMELINE_ALLOWED.test(t)) return "Timeline: use letters, numbers, spaces, and hyphens only.";
  return null;
}
