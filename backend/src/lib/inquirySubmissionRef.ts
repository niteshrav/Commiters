import { randomBytes } from "node:crypto";

export type SubmissionRef = {
  id: string;
  submittedAt: Date;
};

export function createSubmissionRef(now: () => number = Date.now): SubmissionRef {
  return {
    id: randomBytes(12).toString("hex"),
    submittedAt: new Date(now()),
  };
}
