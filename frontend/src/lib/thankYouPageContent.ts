import { ROUTES } from "./routes";
import { STITCH_COPY } from "./stitchDesign";

export type ThankYouSubmissionView = "client" | "candidate";

export const THANK_YOU_PAGE_COPY = {
  title: STITCH_COPY.thankYou.title,
  clientBody: STITCH_COPY.thankYou.views.client.body,
  candidateBody: STITCH_COPY.thankYou.views.candidate.body,
  backToHomeLabel: STITCH_COPY.thankYou.backToHomeLabel,
  backToHomeTo: ROUTES.home,
  projectLedgerLabel: STITCH_COPY.thankYou.projectLedgerLabel,
  projectLedgerTo: ROUTES.caseStudies,
  infrastructureLabel: STITCH_COPY.thankYou.infrastructureLabel,
} as const;

export function resolveThankYouSubmissionView(state: unknown): ThankYouSubmissionView {
  if (!state || typeof state !== "object" || !("submissionView" in state)) {
    return "client";
  }

  const view = (state as { submissionView?: unknown }).submissionView;
  return view === "candidate" ? "candidate" : "client";
}

export function thankYouBodyForView(view: ThankYouSubmissionView): string {
  return view === "candidate" ? THANK_YOU_PAGE_COPY.candidateBody : THANK_YOU_PAGE_COPY.clientBody;
}
