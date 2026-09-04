import PDFDocument from "pdfkit";
import type { InquiryNotificationInput } from "./inquiryNotificationTypes";

export function inquiryKindLabel(kind: InquiryNotificationInput["kind"]): string {
  if (kind === "job_application") return "Job Application";
  if (kind === "opsflow_extract") return "OpsFlow Extract";
  return "Project Inquiry";
}

function addLine(doc: InstanceType<typeof PDFDocument>, label: string, value: string) {
  doc.font("Helvetica-Bold").text(`${label}: `, { continued: true });
  doc.font("Helvetica").text(value);
}

export function inquiryPdfFilename(input: Pick<InquiryNotificationInput, "id">): string {
  return `commiters-inquiry-${input.id}.pdf`;
}

export async function buildInquiryPdf(input: InquiryNotificationInput): Promise<Buffer> {
  const doc = new PDFDocument({ margin: 50 });
  const chunks: Buffer[] = [];

  doc.on("data", (chunk: Buffer) => chunks.push(chunk));

  const done = new Promise<Buffer>((resolve, reject) => {
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);
  });

  doc.fontSize(20).font("Helvetica-Bold").text("Commiters");
  doc.moveDown(0.5);
  doc.fontSize(14).text(`New ${inquiryKindLabel(input.kind)}`);
  doc.moveDown();

  addLine(doc, "Reference ID", input.id);
  addLine(doc, "Submitted", input.submittedAt.toISOString());
  addLine(doc, "Name", input.name);
  addLine(doc, "Email", input.email);
  if (input.phone) addLine(doc, "Phone", input.phone);
  addLine(
    doc,
    input.kind === "job_application" ? "Position" : input.kind === "opsflow_extract" ? "Document Category" : "Service Needed",
    input.serviceOrPosition,
  );
  if (input.budgetRange) addLine(doc, "Budget Range", input.budgetRange);
  if (input.timeline) addLine(doc, "Timeline", input.timeline);
  if (input.referenceLinks) addLine(doc, "Reference Links", input.referenceLinks);

  doc.moveDown();
  doc.font("Helvetica-Bold").text("Message");
  doc.font("Helvetica").text(input.message, { align: "left" });

  doc.end();
  return done;
}
