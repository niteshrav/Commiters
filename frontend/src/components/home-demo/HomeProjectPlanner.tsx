import { FormEvent, forwardRef, useImperativeHandle, useMemo, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import {
  PLANNER_STEPS,
  PLANNER_TECH,
  PLANNER_THEMES,
  PLANNER_TIMELINES,
  PLANNER_TYPE_ORDER,
  PLANNER_TYPES,
  type PlannerListKind,
  type PlannerTypeId,
} from "../../lib/homePlannerData";
import {
  EMPTY_PLANNER_STATE,
  blueprintSections,
  byId,
  downloadPlannerPdf,
  focusText,
  hintText,
  plannerContactTo,
  plannerType,
  plannerWhatsAppHref,
  projectLabel,
  resetForType,
  stageTitle,
  stepError,
  stepName,
  stepValid,
  summaryRows,
  toggleId,
  type PlannerState,
} from "../../lib/homePlanner";

export type HomeProjectPlannerHandle = {
  applyType: (id: PlannerTypeId) => void;
};

function ThemePreview({ theme }: { theme: (typeof PLANNER_THEMES)[number] }) {
  return (
    <span
      className="tpreview"
      style={{ "--tb": theme.bar, "--th": theme.hero, "--tc": theme.card, "--ta": theme.accent } as CSSProperties}
      aria-hidden="true"
    >
      <span className="tbar" />
      <span className="thero" />
      <span className="trow">
        <span />
        <span />
      </span>
    </span>
  );
}

function ChoiceButton({
  selected,
  onClick,
  label,
  note,
  top,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  note?: string;
  top?: React.ReactNode;
}) {
  return (
    <button type="button" className={`choice${selected ? " selected" : ""}`} aria-pressed={selected} onClick={onClick}>
      {top}
      <b>{label}</b>
      {note ? <small>{note}</small> : null}
    </button>
  );
}

const HomeProjectPlanner = forwardRef<HomeProjectPlannerHandle>(function HomeProjectPlanner(_, ref) {
  const [state, setState] = useState<PlannerState>(EMPTY_PLANNER_STATE);
  const [hintError, setHintError] = useState("");
  const [shake, setShake] = useState(false);

  useImperativeHandle(ref, () => ({
    applyType(id) {
      setHintError("");
      setState((current) => resetForType(current, id));
    },
  }));

  const type = plannerType(state.type);
  const stepId = PLANNER_STEPS[state.step]?.id ?? "type";
  const last = state.step === PLANNER_STEPS.length - 1;
  const progress = (state.step / (PLANNER_STEPS.length - 1)) * 100;
  const theme = byId(PLANNER_THEMES, state.theme);
  const date = useMemo(
    () => new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
    [state.step, state.type, state.theme],
  );

  function goNext() {
    if (!stepValid(state, state.step)) {
      setHintError(stepError(state));
      setShake(true);
      window.setTimeout(() => setShake(false), 350);
      return;
    }
    setHintError("");
    setState((current) => ({ ...current, step: Math.min(current.step + 1, PLANNER_STEPS.length - 1) }));
  }

  function addExtra(kind: PlannerListKind, value: string) {
    const clean = value.trim().replace(/\s+/g, " ").slice(0, 60);
    const preset = type?.[kind].some((item) => item.label.toLowerCase() === clean.toLowerCase());
    const exists = state.extras[kind].some((item) => item.toLowerCase() === clean.toLowerCase());
    if (!clean || preset || exists) return;
    setState((current) => ({
      ...current,
      extras: { ...current.extras, [kind]: [...current.extras[kind], clean] },
    }));
  }

  function onAddOwn(kind: PlannerListKind, event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.querySelector("input");
    if (!input) return;
    addExtra(kind, input.value);
    input.value = "";
  }

  return (
    <div className="finder planner" id="planner">
      <div id="plannerProgress">
        <ol className="psteps">
          {PLANNER_STEPS.map((step, index) => {
            const cls = index === state.step ? "is-now" : index < state.step ? "is-done" : "";
            return (
              <li className={cls} key={step.id}>
                <button
                  type="button"
                  disabled={index > state.step}
                  aria-current={index === state.step ? "step" : undefined}
                  onClick={() => {
                    if (index <= state.step) {
                      setHintError("");
                      setState((current) => ({ ...current, step: index }));
                    }
                  }}
                >
                  <span className="pdot">{index + 1}</span>
                  {stepName(state, index)}
                </button>
              </li>
            );
          })}
        </ol>
        <div className="pbar" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="planner-body">
        <div className="planner-main">
          <div className="finderhead">
            <h3>{stageTitle(state)}</h3>
            <span className="step">STEP {state.step + 1} OF {PLANNER_STEPS.length}</span>
          </div>
          <div className={`planner-stage${shake ? " is-shake" : " is-in"}`}>
            {stepId === "type" ? (
              <>
                <div className="choices">
                  {PLANNER_TYPE_ORDER.map((key) => {
                    const item = PLANNER_TYPES[key as PlannerTypeId];
                    return (
                      <ChoiceButton
                        key={key}
                        selected={state.type === key}
                        label={item.label}
                        note={item.note}
                        top={<span className="cicon">{item.mark}</span>}
                        onClick={() => setState((current) => resetForType(current, key as PlannerTypeId))}
                      />
                    );
                  })}
                </div>
                {state.type === "custom" ? (
                  <label className="custom-name">
                    <span className="qlabel">Project name</span>
                    <input
                      type="text"
                      maxLength={80}
                      placeholder="For example, a client portal or an operations platform"
                      value={state.customName}
                      onChange={(event) => setState((current) => ({ ...current, customName: event.target.value.slice(0, 80) }))}
                    />
                  </label>
                ) : null}
              </>
            ) : null}

            {stepId === "questions" && type
              ? type.questions.map((q) => (
                  <div className="qgroup" key={q.id}>
                    <p className="qlabel">{q.label}</p>
                    <div className="choices">
                      {q.options.map((option) => (
                        <ChoiceButton
                          key={option.id}
                          selected={state.answers[q.id] === option.id}
                          label={option.label}
                          onClick={() =>
                            setState((current) => ({ ...current, answers: { ...current.answers, [q.id]: option.id } }))
                          }
                        />
                      ))}
                    </div>
                  </div>
                ))
              : null}

            {stepId === "features" && type ? (
              <>
                <div className="choices">
                  {type.features.map((item) => (
                    <ChoiceButton
                      key={item.id}
                      selected={state.features.includes(item.id)}
                      label={item.label}
                      onClick={() => setState((current) => ({ ...current, features: toggleId(current.features, item.id) }))}
                    />
                  ))}
                  {state.extras.features.map((label, index) => (
                    <ChoiceButton
                      key={`extra-feature-${label}`}
                      selected
                      label={label}
                      note="Custom item. Select to remove."
                      onClick={() =>
                        setState((current) => ({
                          ...current,
                          extras: {
                            ...current.extras,
                            features: current.extras.features.filter((_, i) => i !== index),
                          },
                        }))
                      }
                    />
                  ))}
                </div>
                <form className="add-own" onSubmit={(event) => onAddOwn("features", event)}>
                  <input type="text" maxLength={60} placeholder="Add a custom feature" aria-label="Add a custom feature" />
                  <button className="btn small" type="submit">
                    Add
                  </button>
                </form>
              </>
            ) : null}

            {stepId === "tech" ? (
              <div className="choices">
                {PLANNER_TECH.map((item) => (
                  <ChoiceButton
                    key={item.id}
                    selected={state.tech === item.id}
                    label={item.label}
                    note={item.note}
                    onClick={() => setState((current) => ({ ...current, tech: item.id }))}
                  />
                ))}
              </div>
            ) : null}

            {stepId === "theme" ? (
              <div className="choices theme-grid">
                {PLANNER_THEMES.map((item) => (
                  <ChoiceButton
                    key={item.id}
                    selected={state.theme === item.id}
                    label={item.label}
                    note={item.note}
                    top={<ThemePreview theme={item} />}
                    onClick={() => setState((current) => ({ ...current, theme: item.id }))}
                  />
                ))}
              </div>
            ) : null}

            {stepId === "pages" && type ? (
              <>
                <div className="choices">
                  {type.pages.map((item) => (
                    <ChoiceButton
                      key={item.id}
                      selected={state.pages.includes(item.id)}
                      label={item.label}
                      onClick={() => setState((current) => ({ ...current, pages: toggleId(current.pages, item.id) }))}
                    />
                  ))}
                  {state.extras.pages.map((label, index) => (
                    <ChoiceButton
                      key={`extra-page-${label}`}
                      selected
                      label={label}
                      note="Custom item. Select to remove."
                      onClick={() =>
                        setState((current) => ({
                          ...current,
                          extras: { ...current.extras, pages: current.extras.pages.filter((_, i) => i !== index) },
                        }))
                      }
                    />
                  ))}
                </div>
                <form className="add-own" onSubmit={(event) => onAddOwn("pages", event)}>
                  <input type="text" maxLength={60} placeholder="Add a custom item" aria-label="Add a custom item" />
                  <button className="btn small" type="submit">
                    Add
                  </button>
                </form>
              </>
            ) : null}

            {stepId === "integrations" && type ? (
              <>
                <div className="choices">
                  {type.integrations.map((item) => (
                    <ChoiceButton
                      key={item.id}
                      selected={state.integrations.includes(item.id)}
                      label={item.label}
                      onClick={() =>
                        setState((current) => ({ ...current, integrations: toggleId(current.integrations, item.id) }))
                      }
                    />
                  ))}
                  {state.extras.integrations.map((label, index) => (
                    <ChoiceButton
                      key={`extra-int-${label}`}
                      selected
                      label={label}
                      note="Custom item. Select to remove."
                      onClick={() =>
                        setState((current) => ({
                          ...current,
                          extras: {
                            ...current.extras,
                            integrations: current.extras.integrations.filter((_, i) => i !== index),
                          },
                        }))
                      }
                    />
                  ))}
                </div>
                <form className="add-own" onSubmit={(event) => onAddOwn("integrations", event)}>
                  <input type="text" maxLength={60} placeholder="Add a custom integration" aria-label="Add a custom integration" />
                  <button className="btn small" type="submit">
                    Add
                  </button>
                </form>
              </>
            ) : null}

            {stepId === "timeline" ? (
              <div className="choices">
                {PLANNER_TIMELINES.map((item) => (
                  <ChoiceButton
                    key={item.id}
                    selected={state.timeline === item.id}
                    label={item.label}
                    note={item.note}
                    onClick={() => setState((current) => ({ ...current, timeline: item.id }))}
                  />
                ))}
              </div>
            ) : null}

            {stepId === "blueprint" ? (
              <div className="blueprint">
                <div className="bp-kicker">Project blueprint</div>
                <h3>{projectLabel(state)}</h3>
                <p className="bp-focus">{focusText(state)}</p>
                {theme ? (
                  <div className="bp-theme">
                    <ThemePreview theme={theme} />
                    <div>
                      <b>{theme.label}</b>
                      <small>{theme.note}</small>
                    </div>
                  </div>
                ) : null}
                <div className="bp-grid">
                  {blueprintSections(state).map((sec) => (
                    <section className="bp-block" key={sec.title}>
                      <h4>{sec.title}</h4>
                      <ul>
                        {sec.items.map((item) => (
                          <li key={`${sec.title}-${item}`}>{item}</li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
                <div className="bp-actions">
                  <Link className="btn" to={plannerContactTo()}>
                    Request a consultation
                  </Link>
                  <Link className="btn secondary" to={plannerContactTo()}>
                    Send an enquiry
                  </Link>
                  <a className="btn secondary" href={plannerWhatsAppHref(state)} target="_blank" rel="noopener noreferrer">
                    Share on WhatsApp
                  </a>
                  <button type="button" className="btn secondary" onClick={() => downloadPlannerPdf(state)}>
                    Download PDF summary
                  </button>
                </div>
                <p className="bp-note">
                  Prepared {date}. Email or WhatsApp will open with this blueprint. Scope is confirmed in conversation.
                </p>
              </div>
            ) : null}
          </div>
          <div className="finderfoot">
            <button
              className="btn secondary"
              type="button"
              hidden={state.step === 0}
              onClick={() => {
                setHintError("");
                setState((current) => ({ ...current, step: Math.max(0, current.step - 1) }));
              }}
            >
              Back
            </button>
            <small className={hintError ? "is-error" : undefined}>{hintError || hintText(state)}</small>
            <button className="btn quiet" type="button" hidden={!last} onClick={() => setState(EMPTY_PLANNER_STATE)}>
              Start over
            </button>
            <button className="btn" type="button" hidden={last} onClick={goNext}>
              {state.step === PLANNER_STEPS.length - 2 ? "View blueprint" : "Continue"}
            </button>
          </div>
        </div>
        <aside className="planner-summary">
          <h3>Project summary</h3>
          <p className="summary-lead">This summary updates with each selection. The blueprint is prepared on the final step.</p>
          {summaryRows(state).map(([label, value]) => (
            <div className="srow" key={label}>
              <span>{label}</span>
              <b>{value}</b>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
});

export default HomeProjectPlanner;
