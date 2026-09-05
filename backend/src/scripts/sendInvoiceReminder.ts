import "dotenv/config";
import { parseInvoiceReminderCliArgs, sendPaymentReminderEmail } from "../lib/invoiceReminder";

async function main() {
  try {
    const input = parseInvoiceReminderCliArgs(process.argv.slice(2));
    const result = await sendPaymentReminderEmail(input);
    console.log(`Sent reminder to ${result.to}: ${result.subject}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to send reminder.";
    console.error(message);
    process.exitCode = 1;
  }
}

void main();
