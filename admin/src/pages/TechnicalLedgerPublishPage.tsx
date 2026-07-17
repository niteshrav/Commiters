import { FormEvent, useState } from "react";
import { StudioPageHeader } from "../components/StudioModal";
import { publishTechnicalLedgerArticle } from "../lib/api";
import { TECHNICAL_LEDGER_PUBLISH_COPY } from "../lib/technicalLedgerPublishCopy";

export default function TechnicalLedgerPublishPage() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [contentMarkdown, setContentMarkdown] = useState("");
  const [category, setCategory] = useState("ENGINEERING");
  const [tags, setTags] = useState("software-engineering");
  const [publishToMedium, setPublishToMedium] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setSubmitting(true);

    try {
      const response = await publishTechnicalLedgerArticle({
        title: title.trim(),
        summary: summary.trim(),
        contentMarkdown: contentMarkdown.trim(),
        category: category.trim(),
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        publishToMedium,
      });

      const article = response.article;
      const syncMessage =
        article.syncStatus === "published" && article.mediumUrl
          ? TECHNICAL_LEDGER_PUBLISH_COPY.publishedToMedium
          : article.syncStatus === "failed"
            ? `${TECHNICAL_LEDGER_PUBLISH_COPY.savedLocally} ${article.syncError ?? ""}`.trim()
            : TECHNICAL_LEDGER_PUBLISH_COPY.savedLocally;

      setMessage(syncMessage);
      setTitle("");
      setSummary("");
      setContentMarkdown("");
      setTags("software-engineering");
      setCategory("ENGINEERING");
      setPublishToMedium(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : TECHNICAL_LEDGER_PUBLISH_COPY.publishFailed);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="admin-page studio-page">
      <StudioPageHeader
        title={TECHNICAL_LEDGER_PUBLISH_COPY.title}
        description={TECHNICAL_LEDGER_PUBLISH_COPY.description}
      />

      <form className="studio-editor-card studio-form admin-ledger-publish-form" onSubmit={onSubmit}>
        <label className="studio-field">
          <span>{TECHNICAL_LEDGER_PUBLISH_COPY.titleLabel}</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>

        <label className="studio-field">
          <span>{TECHNICAL_LEDGER_PUBLISH_COPY.summaryLabel}</span>
          <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={3} required />
        </label>

        <label className="studio-field">
          <span>{TECHNICAL_LEDGER_PUBLISH_COPY.contentLabel}</span>
          <textarea value={contentMarkdown} onChange={(e) => setContentMarkdown(e.target.value)} rows={12} required />
        </label>

        <div className="admin-ledger-publish-row">
          <label className="studio-field">
            <span>{TECHNICAL_LEDGER_PUBLISH_COPY.categoryLabel}</span>
            <input value={category} onChange={(e) => setCategory(e.target.value)} />
          </label>
          <label className="studio-field">
            <span>{TECHNICAL_LEDGER_PUBLISH_COPY.tagsLabel}</span>
            <input value={tags} onChange={(e) => setTags(e.target.value)} />
          </label>
        </div>

        <label className="admin-ledger-publish-checkbox">
          <input
            type="checkbox"
            checked={publishToMedium}
            onChange={(e) => setPublishToMedium(e.target.checked)}
          />
          <span>{TECHNICAL_LEDGER_PUBLISH_COPY.publishToMediumLabel}</span>
        </label>

        {error ? <p className="error">{error}</p> : null}
        {message ? <p className="success">{message}</p> : null}

        <div className="studio-editor-actions">
          <button className="studio-btn studio-btn--primary" type="submit" disabled={submitting}>
            {submitting ? TECHNICAL_LEDGER_PUBLISH_COPY.publishing : TECHNICAL_LEDGER_PUBLISH_COPY.publishButton}
          </button>
        </div>
      </form>
    </div>
  );
}
