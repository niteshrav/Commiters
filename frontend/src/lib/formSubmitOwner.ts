import { SITE_FORM_INBOX } from "./siteContact";

/** All website form submissions are delivered to this inbox. */
const OWNER_INBOX = SITE_FORM_INBOX;

type OwnerLeadPayload = {
  name: string;
  email: string;
  serviceNeeded: string;
  budgetRange?: string;
  timeline?: string;
  referenceLinks?: string;
  message: string;
};

type OwnerJobApplicationPayload = {
  name: string;
  email: string;
  phone: string;
  positionAppliedFor: string;
  linkedinProfile?: string;
  portfolioGitHub?: string;
  coverLetter: string;
  resumeFileName: string;
  resumePdfBase64: string;
};

function formSubmitEndpoint(): string {
  return `https://formsubmit.co/ajax/${encodeURIComponent(OWNER_INBOX)}`;
}

type FormSubmitResponse = { success?: boolean; message?: string };

async function parseFormSubmitResponse(res: Response): Promise<FormSubmitResponse> {
  return (await res.json().catch(() => ({}))) as FormSubmitResponse;
}

export async function sendLeadToOwner(input: OwnerLeadPayload): Promise<void> {
  const res = await fetch(formSubmitEndpoint(), {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      _subject: `Website contact — ${input.serviceNeeded}`,
      _template: "table",
      _captcha: "false",
      _replyto: input.email,
      name: input.name,
      email: input.email,
      serviceNeeded: input.serviceNeeded,
      budgetRange: input.budgetRange ?? "",
      timeline: input.timeline ?? "",
      referenceLinks: input.referenceLinks ?? "",
      message: input.message,
    }),
  });

  const payload = await parseFormSubmitResponse(res);
  if (!res.ok || payload.success === false) {
    throw new Error(payload.message ?? "Could not deliver your message.");
  }
}

export async function sendJobApplicationToOwner(input: OwnerJobApplicationPayload): Promise<void> {
  const formData = new FormData();
  formData.append("_subject", `Website application — ${input.positionAppliedFor}`);
  formData.append("_template", "table");
  formData.append("_captcha", "false");
  formData.append("_replyto", input.email);
  formData.append("name", input.name);
  formData.append("email", input.email);
  formData.append("phone", input.phone);
  formData.append("positionAppliedFor", input.positionAppliedFor);
  formData.append("linkedinProfile", input.linkedinProfile ?? "");
  formData.append("portfolioGitHub", input.portfolioGitHub ?? "");
  formData.append("coverLetter", input.coverLetter);

  const binary = atob(input.resumePdfBase64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  formData.append("attachment", new Blob([bytes], { type: "application/pdf" }), input.resumeFileName);

  const res = await fetch(formSubmitEndpoint(), {
    method: "POST",
    headers: { Accept: "application/json" },
    body: formData,
  });

  const payload = await parseFormSubmitResponse(res);
  if (!res.ok || payload.success === false) {
    throw new Error(payload.message ?? "Could not deliver your application.");
  }
}

export function getOwnerInboxForForms(): string {
  return OWNER_INBOX;
}
