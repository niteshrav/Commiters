import React from "react";
import PageHeroImmersive from "../components/PageHeroImmersive";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { pageTitle } from "../lib/siteMeta";
import { COMMITERS_EMAIL_PRIMARY, COMMITERS_EMAIL_SECONDARY } from "../lib/siteContact";

export default function TermsPage() {
  useDocumentTitle(pageTitle("Terms of Service"));

  return (
    <>
      <PageHeroImmersive centered>
        <h1 className="hero-title typography-display">Terms of Service</h1>
        <p className="muted hero-subtext--premium">
          <strong>Effective Date:</strong> April 15, 2026
        </p>
      </PageHeroImmersive>

      <section className="section">
        <div className="card">
          <p className="muted">
            Welcome to Commiters (<strong>www.commiters.com</strong>), operated by Commiters Softwares.
            By using this website, you agree to the terms below.
          </p>

          <h2 className="legal-heading">Use of Website</h2>
          <p className="muted">
            You agree to use this website lawfully and not misuse forms, content, or communication channels.
          </p>

          <h2 className="legal-heading">Service Information</h2>
          <p className="muted">
            All service descriptions are informational and may be refined based on your exact project scope and requirements.
          </p>

          <h2 className="legal-heading">Proposals and Pricing</h2>
          <p className="muted">
            Final pricing, timeline, and deliverables are defined in written proposals or agreements after project discussions.
          </p>

          <h2 className="legal-heading">Intellectual Property</h2>
          <p className="muted">
            All content on this website, including text and branding, belongs to Commiters Softwares unless otherwise stated.
          </p>

          <h2 className="legal-heading">Client Materials</h2>
          <p className="muted">You confirm that you own or have rights to materials you share with us.</p>

          <h2 className="legal-heading">Limitation of Liability</h2>
          <p className="muted">Commiters Softwares is not liable for indirect or consequential losses from use of this website.</p>

          <h2 className="legal-heading">Third-Party Tools</h2>
          <p className="muted">
            This website may use third-party services such as hosting, forms, and analytics. Their use is subject to each provider's terms.
          </p>

          <h2 className="legal-heading">Termination</h2>
          <p className="muted">We reserve the right to limit or block misuse of the website or contact channels.</p>

          <h2 className="legal-heading">Governing Law</h2>
          <p className="muted">These terms are governed by applicable laws of India.</p>

          <h2 className="legal-heading">Updates to Terms</h2>
          <p className="muted">We may update these terms periodically. Updates will be posted on this page.</p>

          <h2 className="legal-heading">Contact</h2>
          <p className="muted">
            For questions related to these terms, email{" "}
            <a href={`mailto:${COMMITERS_EMAIL_PRIMARY}`}>{COMMITERS_EMAIL_PRIMARY}</a> or{" "}
            <a href={`mailto:${COMMITERS_EMAIL_SECONDARY}`}>{COMMITERS_EMAIL_SECONDARY}</a>.
          </p>
        </div>
      </section>
    </>
  );
}

