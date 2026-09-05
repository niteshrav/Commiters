import { describe, expect, it } from "vitest";
import {
  generatePaymentReminderEmail,
  parseInvoiceReminderCliArgs,
  type PaymentBankDetails,
} from "./invoiceReminder";

const bankDetails: PaymentBankDetails = {
  accountName: "Commiters Softwares",
  bankName: "HDFC Bank",
  accountNumber: "50100123456789",
  ifsc: "HDFC0001234",
  upi: "commiters@hdfcbank",
};

describe("generatePaymentReminderEmail", () => {
  it("returns a polite collection email with milestone, amount, due date, and bank details", () => {
    const email = generatePaymentReminderEmail(
      "Priya Shah",
      "AI Operational Audit",
      "$3,000",
      "2026-09-15",
      bankDetails,
    );

    expect(email.subject).toMatch(/Payment reminder/i);
    expect(email.subject).toMatch(/AI Operational Audit/);
    expect(email.text).toMatch(/Dear Priya Shah/);
    expect(email.text).toMatch(/AI Operational Audit/);
    expect(email.text).toMatch(/\$3,000/);
    expect(email.text).toMatch(/15 September 2026/);
    expect(email.text).toMatch(/HDFC Bank/);
    expect(email.text).toMatch(/50100123456789/);
    expect(email.text).toMatch(/HDFC0001234/);
    expect(email.text).toMatch(/commiters@hdfcbank/);
    expect(email.text).toMatch(/Commiters/);
    expect(email.text).not.toMatch(/overdue|legal action|immediately|final warning/i);
    expect(email.html).toMatch(/<p>Dear Priya Shah,/);
    expect(email.html).toMatch(/\$3,000/);
    expect(email.html).toMatch(/HDFC0001234/);
  });

  it("formats numeric amounts and Date due dates", () => {
    const email = generatePaymentReminderEmail(
      "Alex Chen",
      "B2B Support Portal",
      1500,
      new Date("2026-10-01T00:00:00.000Z"),
      {
        accountName: "Commiters Softwares",
        bankName: "ICICI Bank",
        accountNumber: "000111222333",
      },
    );

    expect(email.text).toMatch(/\$1,500/);
    expect(email.text).toMatch(/1 October 2026/);
    expect(email.text).toMatch(/ICICI Bank/);
    expect(email.text).not.toMatch(/IFSC|UPI/);
  });

  it("rejects incomplete reminder inputs", () => {
    expect(() =>
      generatePaymentReminderEmail(" ", "Project", "$1", "2026-09-15", bankDetails),
    ).toThrow(/client name/i);
    expect(() =>
      generatePaymentReminderEmail("Priya", " ", "$1", "2026-09-15", bankDetails),
    ).toThrow(/project name/i);
    expect(() =>
      generatePaymentReminderEmail("Priya", "Project", "", "2026-09-15", bankDetails),
    ).toThrow(/amount/i);
    expect(() =>
      generatePaymentReminderEmail("Priya", "Project", "$1", "not-a-date", bankDetails),
    ).toThrow(/due date/i);
    expect(() =>
      generatePaymentReminderEmail("Priya", "Project", "$1", "2026-09-15", {
        accountName: "",
        bankName: "HDFC Bank",
        accountNumber: "123",
      }),
    ).toThrow(/bank/i);
  });
});

describe("parseInvoiceReminderCliArgs", () => {
  it("reads structured reminder flags for the CLI sender", () => {
    expect(
      parseInvoiceReminderCliArgs([
        "--to",
        "priya@acme.com",
        "--client",
        "Priya Shah",
        "--project",
        "AI Operational Audit",
        "--amount",
        "$3,000",
        "--due",
        "2026-09-15",
        "--account-name",
        "Commiters Softwares",
        "--bank-name",
        "HDFC Bank",
        "--account-number",
        "50100123456789",
        "--ifsc",
        "HDFC0001234",
      ]),
    ).toEqual({
      to: "priya@acme.com",
      clientName: "Priya Shah",
      projectName: "AI Operational Audit",
      pendingAmount: "$3,000",
      dueDate: "2026-09-15",
      bankDetails: {
        accountName: "Commiters Softwares",
        bankName: "HDFC Bank",
        accountNumber: "50100123456789",
        ifsc: "HDFC0001234",
      },
    });
  });

  it("rejects missing CLI flags", () => {
    expect(() => parseInvoiceReminderCliArgs(["--to", "priya@acme.com"])).toThrow(/Missing required flags/i);
  });
});
