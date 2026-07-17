import { useState } from "react";
import { IconBolt, IconCheckCircle } from "./icons";
import { HOME_PAGE_ASSETS } from "../lib/homePageContent";
import { JOIN_US_PAGE_ASSETS, JOIN_US_PAGE_COPY } from "../lib/joinUsPageContent";
import {
  JOIN_US_SIDEBAR_CARD_CLASS,
  JOIN_US_SIDEBAR_IMAGE_CLASS,
  JOIN_US_VISUAL_PANEL_CLASS,
} from "../lib/joinUsPageLayout";

const HIGHLIGHT_ICONS = [IconCheckCircle, IconBolt] as const;

export default function JoinUsVisualPanel() {
  const { sidebar } = JOIN_US_PAGE_COPY;
  const { officePhoto } = JOIN_US_PAGE_ASSETS;
  const [imageSrc, setImageSrc] = useState(officePhoto.src);

  return (
    <aside className={JOIN_US_VISUAL_PANEL_CLASS} data-testid="join-us-sidebar-panel">
      <div className={JOIN_US_SIDEBAR_CARD_CLASS} data-testid="join-us-precision-card">
        <h2 className="join-us-sidebar-card-title">{sidebar.title}</h2>
        <p className="join-us-sidebar-card-body">{sidebar.body}</p>
        <ul className="join-us-sidebar-highlights">
          {sidebar.highlights.map((item, index) => {
            const Icon = HIGHLIGHT_ICONS[index] ?? IconCheckCircle;
            return (
              <li key={item.title} className="join-us-sidebar-highlight">
                <Icon className="join-us-sidebar-highlight-icon" width={22} height={22} aria-hidden />
                <div>
                  <p className="join-us-sidebar-highlight-title">{item.title}</p>
                  <p className="join-us-sidebar-highlight-body">{item.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="join-us-sidebar-email-note">{sidebar.applicationsEmailNote}</p>
      </div>
      <div className={JOIN_US_SIDEBAR_IMAGE_CLASS}>
        <img
          src={imageSrc}
          alt={officePhoto.alt}
          data-testid="join-us-visual-panel-image"
          loading="lazy"
          decoding="async"
          onError={() => setImageSrc(HOME_PAGE_ASSETS.serverRacks)}
        />
      </div>
    </aside>
  );
}
