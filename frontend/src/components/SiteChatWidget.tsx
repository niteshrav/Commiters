import { FormEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { sendChatMessage } from "../lib/chatApi";
import type { ChatHistoryItem } from "../lib/chatFallback";
import { ROUTES } from "../lib/routes";
import {
  SITE_CHAT_COPY,
  SITE_CHAT_LAUNCHER_CLASS,
  SITE_CHAT_PANEL_CLASS,
  SITE_CHAT_TEST_ID,
} from "../lib/siteChatCopy";

type ChatMessage = ChatHistoryItem & { id: string };

function createMessage(role: ChatHistoryItem["role"], content: string): ChatMessage {
  return { id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, role, content };
}

export default function SiteChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [createMessage("assistant", SITE_CHAT_COPY.greeting)]);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;
    panel.scrollTop = panel.scrollHeight;
  }, [messages, open, loading]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage = createMessage("user", trimmed);
    const history = [...messages, userMessage].map(({ role, content }) => ({ role, content }));
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const answer = await sendChatMessage(trimmed, history);
      setMessages((current) => [...current, createMessage("assistant", answer.reply)]);
    } catch {
      setMessages((current) => [...current, createMessage("assistant", SITE_CHAT_COPY.errorLabel)]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="site-chat-widget" data-testid={SITE_CHAT_TEST_ID}>
      {open ? (
        <section className={SITE_CHAT_PANEL_CLASS} aria-label={SITE_CHAT_COPY.panelTitle}>
          <header className="site-chat-panel-header">
            <div>
              <h2 className="site-chat-panel-title">{SITE_CHAT_COPY.panelTitle}</h2>
              <p className="site-chat-panel-subtitle">{SITE_CHAT_COPY.panelSubtitle}</p>
            </div>
            <button type="button" className="site-chat-close" onClick={() => setOpen(false)} aria-label={SITE_CHAT_COPY.closeLabel}>
              ×
            </button>
          </header>

          <div className="site-chat-panel-body" ref={panelRef}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`site-chat-message site-chat-message--${message.role}`}
                data-testid={`site-chat-message-${message.role}`}
              >
                {message.content}
              </div>
            ))}
            {loading ? <p className="site-chat-status">{SITE_CHAT_COPY.thinkingLabel}</p> : null}
          </div>

          <footer className="site-chat-panel-footer">
            <p className="site-chat-hint">
              {SITE_CHAT_COPY.contactHint}{" "}
              <Link to={ROUTES.contact} onClick={() => setOpen(false)}>
                Contact
              </Link>
            </p>
            <form className="site-chat-form" onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                className="site-chat-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={SITE_CHAT_COPY.inputPlaceholder}
                aria-label={SITE_CHAT_COPY.inputPlaceholder}
                maxLength={1000}
                disabled={loading}
              />
              <button type="submit" className="site-chat-send" disabled={loading || !input.trim()}>
                {SITE_CHAT_COPY.sendLabel}
              </button>
            </form>
          </footer>
        </section>
      ) : null}

      <button
        type="button"
        className={SITE_CHAT_LAUNCHER_CLASS}
        aria-label={SITE_CHAT_COPY.launcherLabel}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 5.5C4 4.12 5.12 3 6.5 3h11C18.88 3 20 4.12 20 5.5v7c0 1.38-1.12 2.5-2.5 2.5H9.5L5 19v-4H6.5C5.12 15 4 13.88 4 12.5v-7Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  );
}
