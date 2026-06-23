/** Resume upload constraints from the Stitch Join Us screenshot. */
export const JOIN_US_RESUME_MAX_BYTES = 5 * 1024 * 1024;
export const JOIN_US_RESUME_ACCEPT = "application/pdf,.pdf" as const;

export function validateResumeFile(file: File | null): string | null {
  if (!file) return "Please upload your resume as a PDF.";
  if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
    return "Resume must be a PDF file.";
  }
  if (file.size > JOIN_US_RESUME_MAX_BYTES) {
    return "Resume must be 5MB or smaller.";
  }
  return null;
}

export async function readResumeAsBase64(file: File): Promise<string> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Failed to read resume file."));
    reader.readAsDataURL(file);
  });

  const base64 = dataUrl.split(",")[1];
  if (!base64) throw new Error("Failed to read resume file.");
  return base64;
}
