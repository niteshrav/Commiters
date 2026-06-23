import { Link, useLocation } from "react-router-dom";
import { IconCheckCircle } from "./icons";
import {
  THANK_YOU_PAGE_COPY,
  resolveThankYouSubmissionView,
  thankYouBodyForView,
} from "../lib/thankYouPageContent";
import {
  THANK_YOU_ACTIONS_CLASS,
  THANK_YOU_CONTENT_CLASS,
  THANK_YOU_LEDGER_LINK_CLASS,
  THANK_YOU_MESSAGE_CLASS,
  THANK_YOU_SUCCESS_ICON_CLASS,
  THANK_YOU_TITLE_CLASS,
} from "../lib/thankYouPageLayout";

export default function ThankYouContentSection() {
  const location = useLocation();
  const submissionView = resolveThankYouSubmissionView(location.state);

  return (
    <section
      className={`${THANK_YOU_CONTENT_CLASS} reveal-on-scroll`}
      data-testid="thank-you-content"
      aria-labelledby="thank-you-title"
    >
      <div className="thank-you-success-wrap">
        <span className="thank-you-success-dots" aria-hidden />
        <div className={THANK_YOU_SUCCESS_ICON_CLASS} data-testid={THANK_YOU_SUCCESS_ICON_CLASS}>
          <IconCheckCircle width={34} height={34} />
        </div>
      </div>

      <h1 id="thank-you-title" className={THANK_YOU_TITLE_CLASS}>
        {THANK_YOU_PAGE_COPY.title}
      </h1>

      <p className={THANK_YOU_MESSAGE_CLASS}>{thankYouBodyForView(submissionView)}</p>

      <div className={THANK_YOU_ACTIONS_CLASS} data-testid="thank-you-actions">
        <Link className="btn btn-primary thank-you-home-btn" to={THANK_YOU_PAGE_COPY.backToHomeTo}>
          ← {THANK_YOU_PAGE_COPY.backToHomeLabel}
        </Link>
        <Link className={THANK_YOU_LEDGER_LINK_CLASS} to={THANK_YOU_PAGE_COPY.projectLedgerTo}>
          {THANK_YOU_PAGE_COPY.projectLedgerLabel} →
        </Link>
      </div>
    </section>
  );
}
