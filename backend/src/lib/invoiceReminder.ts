import nodemailer from "nodemailer";
import { resolveSmtpConfig } from "./smtpConfig";

export type PaymentBankDetails = {
  accountName: string;
  bankName: string;
  accountNumber: string;
  ifsc?: string;
  upi?: string;
};

export type PaymentReminderEmail = {
  subject: string;
  text: string;
  html: string;
};

export type SendPaymentReminderInput = {
  to: string;
  clientName: string;
  projectName: string;
  pendingAmount: number | string;
  dueDate: Date | string;
  bankDetails: PaymentBankDetails;
};

export type SendPaymentReminderResult = {
  to: string;
  subject: string;
};

function requireText(value: string, label: string): string {
  const trimmed = value.trim();
  if (!trimmed) throw new Error(`${label} is required.`);
  return trimmed;
}

function parseDueDate(dueDate: Date | string): Date {
  if (dueDate instanceof Date) {
    if (Number.isNaN(dueDate.getTime())) throw new Error("Due date is invalid.");
    return dueDate;
  }

  const trimmed = requireText(dueDate, "Due date");
  const isoDateOnly = /^\d{4}-\d{2}-\d{2}$/.test(trimmed)
    ? `${trimmed}T00:00:00.000Z`
    : trimmed;
  const parsed = new Date(isoDateOnly);
  if (Number.isNaN(parsed.getTime())) throw new Error("Due date is invalid.");
  return parsed;
}

function formatDueDate(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function formatPendingAmount(amount: number | string): string {
  if (typeof amount === "number") {
    if (!Number.isFinite(amount) || amount <= 0) throw new Error("Amount is invalid.");
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  }

  return requireText(amount, "Amount");
}

function normalizeBankDetails(bankDetails: PaymentBankDetails): PaymentBankDetails {
  const accountName = bankDetails.accountName?.trim() ?? "";
  const bankName = bankDetails.bankName?.trim() ?? "";
  const accountNumber = bankDetails.accountNumber?.trim() ?? "";
  if (!accountName || !bankName || !accountNumber) {
    throw new Error("Bank details are incomplete.");
  }

  const ifsc = bankDetails.ifsc?.trim();
  const upi = bankDetails.upi?.trim();

  return {
    accountName,
    bankName,
    accountNumber,
    ...(ifsc ? { ifsc } : {}),
    ...(upi ? { upi } : {}),
  };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function bankDetailLines(bankDetails: PaymentBankDetails): string[] {
  const lines = [
    `Account name: ${bankDetails.accountName}`,
    `Bank: ${bankDetails.bankName}`,
    `Account number: ${bankDetails.accountNumber}`,
  ];
  if (bankDetails.ifsc) lines.push(`IFSC: ${bankDetails.ifsc}`);
  if (bankDetails.upi) lines.push(`UPI: ${bankDetails.upi}`);
  return lines;
}

export function generatePaymentReminderEmail(
  clientName: string,
  projectName: string,
  pendingAmount: number | string,
  dueDate: Date | string,
  bankDetails: PaymentBankDetails,
): PaymentReminderEmail {
  const name = requireText(clientName, "Client name");
  const project = requireText(projectName, "Project name");
  const amount = formatPendingAmount(pendingAmount);
  const formattedDueDate = formatDueDate(parseDueDate(dueDate));
  const bank = normalizeBankDetails(bankDetails);
  const transferLines = bankDetailLines(bank);

  const subject = `Payment reminder: ${project} milestone`;
  const text = [
    `Dear ${name},`,
    "",
    `I hope you are well. This is a polite reminder that the next payment milestone for ${project} is due on ${formattedDueDate}.`,
    "",
    `Outstanding amount: ${amount}`,
    "",
    "Completing this transfer keeps delivery on schedule and lets our team keep momentum on the remaining work. If the payment is already on its way, reply with the transaction reference and we will update our records the same day.",
    "",
    "Please use the following bank details:",
    ...transferLines,
    "",
    "If any part of the milestone or invoice needs a quick clarification, reply to this email and I will help.",
    "",
    "Thank you for the continued partnership.",
    "",
    "Warm regards,",
    "Accounts",
    "Commiters",
    "https://www.commiters.com",
  ].join("\n");

  const htmlTransferRows = transferLines
    .map((line) => `<li>${escapeHtml(line)}</li>`)
    .join("");

  const html = [
    `<p>Dear ${escapeHtml(name)},</p>`,
    `<p>I hope you are well. This is a polite reminder that the next payment milestone for <strong>${escapeHtml(project)}</strong> is due on <strong>${escapeHtml(formattedDueDate)}</strong>.</p>`,
    `<p>Outstanding amount: <strong>${escapeHtml(amount)}</strong></p>`,
    "<p>Completing this transfer keeps delivery on schedule and lets our team keep momentum on the remaining work. If the payment is already on its way, reply with the transaction reference and we will update our records the same day.</p>",
    "<p>Please use the following bank details:</p>",
    `<ul>${htmlTransferRows}</ul>`,
    "<p>If any part of the milestone or invoice needs a quick clarification, reply to this email and I will help.</p>",
    "<p>Thank you for the continued partnership.</p>",
    "<p>Warm regards,<br>Accounts<br>Commiters<br>https://www.commiters.com</p>",
  ].join("");

  return { subject, text, html };
}

export async function sendPaymentReminderEmail(
  input: SendPaymentReminderInput,
): Promise<SendPaymentReminderResult> {
  const to = requireText(input.to, "Recipient email");
  const email = generatePaymentReminderEmail(
    input.clientName,
    input.projectName,
    input.pendingAmount,
    input.dueDate,
    input.bankDetails,
  );

  const smtp = resolveSmtpConfig();
  if (!smtp) {
    throw new Error("SMTP is not enabled.");
  }

  const transport = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: { user: smtp.user, pass: smtp.pass },
  });

  await transport.sendMail({
    from: smtp.from,
    to,
    subject: email.subject,
    text: email.text,
    html: email.html,
  });

  return { to, subject: email.subject };
}

function readCliFlag(argv: string[], name: string): string | undefined {
  const flag = `--${name}`;
  const index = argv.indexOf(flag);
  if (index === -1) return undefined;
  const value = argv[index + 1];
  if (!value || value.startsWith("--")) return undefined;
  return value;
}

export function parseInvoiceReminderCliArgs(argv: string[]): SendPaymentReminderInput {
  const to = readCliFlag(argv, "to");
  const clientName = readCliFlag(argv, "client");
  const projectName = readCliFlag(argv, "project");
  const pendingAmount = readCliFlag(argv, "amount");
  const dueDate = readCliFlag(argv, "due");
  const accountName = readCliFlag(argv, "account-name");
  const bankName = readCliFlag(argv, "bank-name");
  const accountNumber = readCliFlag(argv, "account-number");
  const ifsc = readCliFlag(argv, "ifsc");
  const upi = readCliFlag(argv, "upi");

  if (
    !to ||
    !clientName ||
    !projectName ||
    !pendingAmount ||
    !dueDate ||
    !accountName ||
    !bankName ||
    !accountNumber
  ) {
    throw new Error(
      "Missing required flags: --to --client --project --amount --due --account-name --bank-name --account-number",
    );
  }

  return {
    to,
    clientName,
    projectName,
    pendingAmount,
    dueDate,
    bankDetails: {
      accountName,
      bankName,
      accountNumber,
      ...(ifsc ? { ifsc } : {}),
      ...(upi ? { upi } : {}),
    },
  };
}
