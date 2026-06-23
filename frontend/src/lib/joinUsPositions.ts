/** Position options for the Join Us application form — aligned with backend enum. */
export const JOIN_US_POSITION_OPTIONS = [
  "Full Stack Engineer",
  "AI Engineer",
  "QA Engineer",
  "Marketing Executive",
  "Other",
] as const;

export type JoinUsPosition = (typeof JOIN_US_POSITION_OPTIONS)[number];

export const JOIN_US_POSITION_DEFAULT = "Select a position" as const;
