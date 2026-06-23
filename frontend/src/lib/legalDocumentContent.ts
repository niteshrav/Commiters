export type LegalDocumentBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "list"; items: readonly string[] }
  | { kind: "contact"; textBefore: string; textAfter?: string };

export type LegalDocumentSectionContent = {
  id: string;
  heading: string;
  blocks: readonly LegalDocumentBlock[];
};
