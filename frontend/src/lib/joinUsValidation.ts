import { JOIN_US_POSITION_DEFAULT, JOIN_US_POSITION_OPTIONS, type JoinUsPosition } from "./joinUsPositions";
import { validateEmail, validateName } from "./contactValidation";

export function validatePositionAppliedFor(value: string): string | null {
  if (!value || value === JOIN_US_POSITION_DEFAULT) {
    return "Please select the position you are applying for.";
  }

  if (!(JOIN_US_POSITION_OPTIONS as readonly string[]).includes(value)) {
    return "Please select a valid position.";
  }

  return null;
}

export function validatePhone(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return "Please add a phone number.";
  if (!/^\+?[0-9\s()-]{7,20}$/.test(trimmed)) {
    return "Please enter a valid phone number.";
  }
  return null;
}

export function validateCoverLetter(value: string): string | null {
  if (!value.trim()) {
    return "Please add a cover letter explaining why you want to join Commiters.";
  }
  return null;
}

export function validateOptionalUrl(value: string, label: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  try {
    const url = new URL(trimmed);
    if (!["http:", "https:"].includes(url.protocol)) {
      return `Please enter a valid ${label} URL.`;
    }
    return null;
  } catch {
    return `Please enter a valid ${label} URL.`;
  }
}

export function isJoinUsPosition(value: string): value is JoinUsPosition {
  return (JOIN_US_POSITION_OPTIONS as readonly string[]).includes(value);
}

export { validateEmail, validateName };
