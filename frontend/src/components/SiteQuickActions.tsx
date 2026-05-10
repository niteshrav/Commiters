import React, { useState } from "react";
import { IconEnvelope, IconPhone, IconWhatsApp } from "./icons";
import { buildTelHref, buildWhatsAppUrl } from "../lib/siteContact";
import QuickInquiryModal from "./QuickInquiryModal";

export default function SiteQuickActions() {
  const [inquiryOpen, setInquiryOpen] = useState(false);

  return (
    <>
      <aside className="site-quick-actions" aria-label="Quick contact" data-testid="site-quick-actions">
        <a
          className="site-quick-actions__btn site-quick-actions__btn--call"
          href={buildTelHref()}
          aria-label="Call Commiters"
        >
          <IconPhone width={22} height={22} />
        </a>
        <a
          className="site-quick-actions__btn site-quick-actions__btn--whatsapp"
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp Commiters"
        >
          <IconWhatsApp width={22} height={22} />
        </a>
        <button
          type="button"
          className="site-quick-actions__btn site-quick-actions__btn--inquiry"
          aria-label="Open quick inquiry form"
          onClick={() => setInquiryOpen(true)}
        >
          <IconEnvelope width={22} height={22} />
        </button>
      </aside>

      <QuickInquiryModal open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </>
  );
}
