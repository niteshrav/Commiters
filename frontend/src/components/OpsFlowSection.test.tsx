import type { ReactElement } from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import OpsFlowSection from "./OpsFlowSection";
import { OPSFLOW_PERSONAL_EMAIL_ERROR } from "../lib/opsFlowLeadGate";
import { ROUTES } from "../lib/routes";
import {
  OPSFLOW_DOCUMENT_CATEGORIES,
  OPSFLOW_DROPZONE_LABEL,
  OPSFLOW_ENGINEER_CTA_LABEL,
  OPSFLOW_HERO,
  OPSFLOW_PROCESSING_LABEL,
  OPSFLOW_SECURITY_FOOTER,
  OPSFLOW_SUBMIT_LABEL,
  OPSFLOW_VALUE_CARDS,
  OPSFLOW_WORK_EMAIL_LABEL,
  OPSFLOW_WORK_EMAIL_PLACEHOLDER,
} from "../lib/opsFlowPageContent";

function pdfFile(name = "gst-invoice.pdf"): File {
  return new File(["%PDF-invoice"], name, { type: "application/pdf" });
}

function renderSection(ui: ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe("OpsFlowSection", () => {
  it("renders hero, value cards, lead-gate fields, and security footer", () => {
    renderSection(<OpsFlowSection onExtract={vi.fn()} />);

    expect(screen.getByTestId("opsflow-section")).toBeInTheDocument();
    expect(screen.getByText(OPSFLOW_HERO.eyebrow)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: OPSFLOW_HERO.headline, level: 1 })).toBeInTheDocument();
    expect(screen.getByText(OPSFLOW_HERO.subheadline)).toBeInTheDocument();

    for (const card of OPSFLOW_VALUE_CARDS) {
      expect(screen.getByRole("heading", { name: card.title, level: 2 })).toBeInTheDocument();
      expect(screen.getByText(card.body)).toBeInTheDocument();
    }

    expect(screen.getByText(OPSFLOW_DROPZONE_LABEL)).toBeInTheDocument();
    expect(screen.getByLabelText(OPSFLOW_WORK_EMAIL_LABEL)).toHaveAttribute(
      "placeholder",
      OPSFLOW_WORK_EMAIL_PLACEHOLDER,
    );
    expect(screen.getByLabelText(OPSFLOW_WORK_EMAIL_LABEL)).toBeRequired();
    for (const category of OPSFLOW_DOCUMENT_CATEGORIES) {
      expect(screen.getByRole("option", { name: category })).toBeInTheDocument();
    }
    expect(screen.getByRole("button", { name: OPSFLOW_SUBMIT_LABEL })).toBeInTheDocument();
    expect(screen.getByText(OPSFLOW_SECURITY_FOOTER)).toBeInTheDocument();
  });

  it("warns when a personal email domain is used", async () => {
    const user = userEvent.setup();
    renderSection(<OpsFlowSection onExtract={vi.fn()} />);

    await user.type(screen.getByLabelText(OPSFLOW_WORK_EMAIL_LABEL), "ops@gmail.com");
    await user.selectOptions(screen.getByLabelText(/document category/i), "GST Invoices");
    await user.upload(screen.getByTestId("opsflow-file-input"), pdfFile());
    await user.click(screen.getByRole("button", { name: OPSFLOW_SUBMIT_LABEL }));

    expect(screen.getByRole("alert")).toHaveTextContent(OPSFLOW_PERSONAL_EMAIL_ERROR);
  });

  it("accepts a dropped PDF and shows processing then download success", async () => {
    const user = userEvent.setup();
    let release!: () => void;
    const pending = new Promise<void>((resolve) => {
      release = resolve;
    });
    const onExtract = vi.fn().mockImplementation(() => pending);

    renderSection(<OpsFlowSection onExtract={onExtract} />);

    const dropzone = screen.getByTestId("opsflow-dropzone");
    fireEvent.drop(dropzone, {
      dataTransfer: { files: [pdfFile("shipping-bill.pdf")] },
    });

    await user.selectOptions(screen.getByLabelText(/document category/i), "Shipping Manifests/Bills");
    await user.type(screen.getByLabelText(OPSFLOW_WORK_EMAIL_LABEL), "coo@acme.co.in");
    await user.click(screen.getByRole("button", { name: OPSFLOW_SUBMIT_LABEL }));

    expect(screen.getByText(OPSFLOW_PROCESSING_LABEL)).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(onExtract).toHaveBeenCalledTimes(1);
    expect(onExtract.mock.calls[0]?.[0]).toMatchObject({
      category: "Shipping Manifests/Bills",
      workEmail: "coo@acme.co.in",
    });
    expect(onExtract.mock.calls[0]?.[0].file).toBeInstanceOf(File);

    release();

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent(/Extraction Complete/i);
      expect(screen.getByRole("link", { name: OPSFLOW_ENGINEER_CTA_LABEL })).toHaveAttribute("href", ROUTES.contact);
    });
  });
});
