import { useEffect } from "react";
import {
  ACCESSIBILITY_TEXT_SIZE_OPTIONS,
  ACCESSIBILITY_WIDGET_COPY,
} from "../lib/accessibilityContent";
import {
  ACCESSIBILITY_WIDGET_ACTIONS_CLASS,
  ACCESSIBILITY_WIDGET_BACKDROP_CLASS,
  ACCESSIBILITY_WIDGET_CLASS,
  ACCESSIBILITY_WIDGET_CLOSE_CLASS,
  ACCESSIBILITY_WIDGET_DESCRIPTION_CLASS,
  ACCESSIBILITY_WIDGET_DIALOG_CLASS,
  ACCESSIBILITY_WIDGET_OPTION_ACTIVE_CLASS,
  ACCESSIBILITY_WIDGET_OPTION_CLASS,
  ACCESSIBILITY_WIDGET_OPTION_GROUP_CLASS,
  ACCESSIBILITY_WIDGET_PANEL_CLASS,
  ACCESSIBILITY_WIDGET_RESET_CLASS,
  ACCESSIBILITY_WIDGET_SECTION_CLASS,
  ACCESSIBILITY_WIDGET_SECTION_LABEL_CLASS,
  ACCESSIBILITY_WIDGET_TITLE_CLASS,
  ACCESSIBILITY_WIDGET_TOGGLE_CLASS,
  ACCESSIBILITY_WIDGET_TOGGLE_CONTROL_CLASS,
  ACCESSIBILITY_WIDGET_TOGGLE_COPY_CLASS,
  ACCESSIBILITY_WIDGET_TOGGLE_ROW_CLASS,
} from "../lib/accessibilityLayout";
import { useAccessibility } from "./AccessibilityProvider";
import { IconAccessibility } from "./icons";

function SettingToggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (enabled: boolean) => void;
}) {
  return (
    <div className={ACCESSIBILITY_WIDGET_TOGGLE_ROW_CLASS}>
      <div className={ACCESSIBILITY_WIDGET_TOGGLE_COPY_CLASS}>
        <p>{label}</p>
        <p>{description}</p>
      </div>
      <label className={ACCESSIBILITY_WIDGET_TOGGLE_CONTROL_CLASS}>
        <input type="checkbox" checked={checked} aria-label={label} onChange={(event) => onChange(event.target.checked)} />
        <span className="accessibility-widget-switch-ui" aria-hidden />
      </label>
    </div>
  );
}

export default function AccessibilityWidget() {
  const {
    settings,
    panelOpen,
    togglePanel,
    closePanel,
    setTextSize,
    setHighContrast,
    setUnderlineLinks,
    setReduceMotion,
    resetSettings,
  } = useAccessibility();

  useEffect(() => {
    if (!panelOpen) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePanel();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closePanel, panelOpen]);

  return (
    <>
      <div className={ACCESSIBILITY_WIDGET_CLASS} data-testid="accessibility-widget">
        <button
          type="button"
          className={ACCESSIBILITY_WIDGET_TOGGLE_CLASS}
          aria-label={ACCESSIBILITY_WIDGET_COPY.toggleLabel}
          aria-expanded={panelOpen}
          aria-controls="accessibility-widget-dialog"
          onClick={togglePanel}
        >
          <IconAccessibility width={22} height={22} />
        </button>
      </div>

      {panelOpen ? (
        <div className={ACCESSIBILITY_WIDGET_PANEL_CLASS} data-testid="accessibility-widget-panel">
          <button
            type="button"
            className={ACCESSIBILITY_WIDGET_BACKDROP_CLASS}
            aria-label={ACCESSIBILITY_WIDGET_COPY.closeLabel}
            onClick={closePanel}
          />
          <div
            id="accessibility-widget-dialog"
            className={ACCESSIBILITY_WIDGET_DIALOG_CLASS}
            role="dialog"
            aria-modal="true"
            aria-labelledby="accessibility-widget-title"
            data-testid="accessibility-widget-dialog"
          >
            <h2 id="accessibility-widget-title" className={ACCESSIBILITY_WIDGET_TITLE_CLASS}>
              {ACCESSIBILITY_WIDGET_COPY.panelTitle}
            </h2>
            <p className={ACCESSIBILITY_WIDGET_DESCRIPTION_CLASS}>{ACCESSIBILITY_WIDGET_COPY.panelDescription}</p>

            <section className={ACCESSIBILITY_WIDGET_SECTION_CLASS} aria-labelledby="accessibility-text-size-label">
              <h3 id="accessibility-text-size-label" className={ACCESSIBILITY_WIDGET_SECTION_LABEL_CLASS}>
                {ACCESSIBILITY_WIDGET_COPY.textSizeLabel}
              </h3>
              <div className={ACCESSIBILITY_WIDGET_OPTION_GROUP_CLASS} role="radiogroup" aria-labelledby="accessibility-text-size-label">
                {ACCESSIBILITY_TEXT_SIZE_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={settings.textSize === option.id}
                    className={`${ACCESSIBILITY_WIDGET_OPTION_CLASS}${settings.textSize === option.id ? ` ${ACCESSIBILITY_WIDGET_OPTION_ACTIVE_CLASS}` : ""}`}
                    onClick={() => setTextSize(option.id)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </section>

            <section className={ACCESSIBILITY_WIDGET_SECTION_CLASS}>
              <SettingToggle
                label={ACCESSIBILITY_WIDGET_COPY.highContrastLabel}
                description={ACCESSIBILITY_WIDGET_COPY.highContrastDescription}
                checked={settings.highContrast}
                onChange={setHighContrast}
              />
              <SettingToggle
                label={ACCESSIBILITY_WIDGET_COPY.underlineLinksLabel}
                description={ACCESSIBILITY_WIDGET_COPY.underlineLinksDescription}
                checked={settings.underlineLinks}
                onChange={setUnderlineLinks}
              />
              <SettingToggle
                label={ACCESSIBILITY_WIDGET_COPY.reduceMotionLabel}
                description={ACCESSIBILITY_WIDGET_COPY.reduceMotionDescription}
                checked={settings.reduceMotion}
                onChange={setReduceMotion}
              />
            </section>

            <div className={ACCESSIBILITY_WIDGET_ACTIONS_CLASS}>
              <button type="button" className={`btn ${ACCESSIBILITY_WIDGET_RESET_CLASS}`} onClick={resetSettings}>
                {ACCESSIBILITY_WIDGET_COPY.resetLabel}
              </button>
              <button type="button" className={`btn ${ACCESSIBILITY_WIDGET_CLOSE_CLASS}`} onClick={closePanel}>
                {ACCESSIBILITY_WIDGET_COPY.closeLabel}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
