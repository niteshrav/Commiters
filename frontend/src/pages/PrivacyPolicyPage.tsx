import React from "react";
import PageHeroImmersive from "../components/PageHeroImmersive";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { pageTitle } from "../lib/siteMeta";
import { COMMITERS_EMAIL_PRIMARY, COMMITERS_EMAIL_SECONDARY } from "../lib/siteContact";

export default function PrivacyPolicyPage() {
  useDocumentTitle(pageTitle("Privacy Policy"));

  return (
    <>
      <PageHeroImmersive centered>
        <h1 className="hero-title typography-display">Privacy Policy</h1>
        <p className="muted hero-subtext--premium">
          <strong>Effective Date:</strong> April 15, 2026
        </p>
      </PageHeroImmersive>

      <section className="section">
        <div className="card">
          <p className="muted">
            Commiters Softwares ("Commiters", "we", "our", "us") values your privacy. This
            policy explains how we collect, use, and protect your information when you visit{" "}
            <strong>www.commiters.com</strong> or contact us.
          </p>

          <h2 className="legal-heading">Information We Collect</h2>
          <ul className="list">
            <li>Name, email, phone number, and project details you submit.</li>
            <li>Basic usage data such as browser/device details and page interactions.</li>
          </ul>

          <h2 className="legal-heading">How We Use Information</h2>
          <ul className="list">
            <li>Respond to inquiries and provide consultation.</li>
            <li>Evaluate project requirements and prepare estimates.</li>
            <li>Improve website performance and user experience.</li>
            <li>Send relevant communication for your inquiry.</li>
          </ul>

          <h2 className="legal-heading">Data Sharing</h2>
          <p className="muted">
            We do not sell personal data. We may use trusted third-party tools for hosting, forms,
            and analytics only for operating the website and services.
          </p>

          <h2 className="legal-heading">Data Retention</h2>
          <p className="muted">
            We retain inquiry data as needed for service delivery, legal compliance, and business
            record management.
          </p>

          <h2 className="legal-heading">Your Rights</h2>
          <p className="muted">
            You may request access, correction, or deletion of your personal data by emailing{" "}
            <a href={`mailto:${COMMITERS_EMAIL_PRIMARY}`}>{COMMITERS_EMAIL_PRIMARY}</a> or{" "}
            <a href={`mailto:${COMMITERS_EMAIL_SECONDARY}`}>{COMMITERS_EMAIL_SECONDARY}</a>.
          </p>

          <h2 className="legal-heading">Security</h2>
          <p className="muted">
            We apply reasonable technical and operational measures to protect submitted information.
          </p>

          <h2 className="legal-heading">Policy Updates</h2>
          <p className="muted">
            We may update this policy periodically. Any update is published on this page.
          </p>

          <h2 className="legal-heading">Contact</h2>
          <p className="muted">
            For privacy-related questions, contact{" "}
            <a href={`mailto:${COMMITERS_EMAIL_PRIMARY}`}>{COMMITERS_EMAIL_PRIMARY}</a> or{" "}
            <a href={`mailto:${COMMITERS_EMAIL_SECONDARY}`}>{COMMITERS_EMAIL_SECONDARY}</a>.
          </p>
        </div>
      </section>
    </>
  );
}

