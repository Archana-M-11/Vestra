import { useActionState, useEffect, useRef, useState, useTransition } from "react";
import veeImg from "../../assets/images/vee-mascot.png";
import "./VeeAssistant.css";

const STORAGE_KEY = "vee-bubble-dismissed";
const GREETING = "Hi, I'm Vee! ✨ Need help finding your style?";
const SUGGESTIONS = ["New arrivals", "Outfit ideas", "Shoe sizing"];

/**
 * Step 5 (AI integration) goes here.
 * Replace the placeholder below with a real call, e.g.:
 *   const res = await fetch("/api/vee", { method: "POST", body: JSON.stringify({ message: text }) });
 *   return (await res.json()).reply;
 */
async function getVeeReply(text) {
  await new Promise((r) => setTimeout(r, 900));
  return `Great choice — I'll help you with "${text}" once my styling brain is connected. Soon!`;
}

export default function VeeAssistant() {
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 0, from: "vee", text: "Hi, I'm Vee! Tell me what you're shopping for and I'll help you find your style." },
  ]);
  const nextId = useRef(1);
  const listRef = useRef(null);
  const [, startTransition] = useTransition();

  const push = (from, text) =>
    setMessages((m) => [...m, { id: nextId.current++, from, text }]);

  /* React 19: form action with built-in pending state */
  const [, sendAction, isPending] = useActionState(async (_prev, formData) => {
    const text = String(formData.get("message") || "").trim();
    if (!text) return null;
    push("user", text);
    push("vee", await getVeeReply(text));
    return null;
  }, null);

  const sendSuggestion = (text) => {
    const fd = new FormData();
    fd.set("message", text);
    startTransition(() => sendAction(fd));
  };

  // show the welcome bubble shortly after load (unless dismissed this session)
  useEffect(() => {
    let dismissed = false;
    try { dismissed = sessionStorage.getItem(STORAGE_KEY) === "1"; } catch { /* storage blocked */ }
    if (dismissed) return;
    const t = setTimeout(() => setBubbleVisible(true), 1800);
    return () => clearTimeout(t);
  }, []);

  // keep newest message in view
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isPending, open]);

  // Escape closes the panel
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const dismissBubble = (e) => {
    e.stopPropagation();
    setBubbleVisible(false);
    try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch { /* ignore */ }
  };

  const openChat = () => {
    setOpen(true);
    setBubbleVisible(false);
  };

  return (
    <div className="vee-root">
      {/* Chat panel */}
      <section
        className={`vee-panel ${open ? "is-open" : ""}`}
        role="dialog"
        aria-label="Chat with Vee"
        aria-hidden={!open}
      >
        <header className="vee-panel-head">
          <img src={veeImg} alt="" className="vee-avatar" />
          <div className="vee-head-text">
            <strong>Vee</strong>
            <span>Your style assistant</span>
          </div>
          <button className="vee-icon" onClick={() => setOpen(false)} aria-label="Close chat" tabIndex={open ? 0 : -1}>
            ×
          </button>
        </header>

        <div className="vee-messages" ref={listRef}>
          {messages.map((m) => (
            <p key={m.id} className={`vee-msg vee-msg--${m.from}`}>{m.text}</p>
          ))}
          {isPending && (
            <p className="vee-msg vee-msg--vee vee-typing" aria-label="Vee is typing">
              <i /><i /><i />
            </p>
          )}
        </div>

        <div className="vee-chips">
          {SUGGESTIONS.map((s) => (
            <button key={s} type="button" className="vee-chip" disabled={isPending} onClick={() => sendSuggestion(s)} tabIndex={open ? 0 : -1}>
              {s}
            </button>
          ))}
        </div>

        <form action={sendAction} className="vee-form">
          <input
            name="message"
            className="vee-input"
            placeholder="Ask Vee anything…"
            autoComplete="off"
            aria-label="Message to Vee"
            tabIndex={open ? 0 : -1}
          />
          <button type="submit" className="vee-send" disabled={isPending} aria-label="Send" tabIndex={open ? 0 : -1}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </form>
      </section>

      {/* Welcome bubble */}
      {bubbleVisible && !open && (
        <div className="vee-bubble" role="status" onClick={openChat}>
          <span>{GREETING}</span>
          <button className="vee-dismiss" onClick={dismissBubble} aria-label="Dismiss message">
            ×
          </button>
        </div>
      )}

      {/* Floating mascot */}
      <button
        className="vee-mascot"
        onClick={() => (open ? setOpen(false) : openChat())}
        aria-label={open ? "Close chat with Vee" : "Chat with Vee"}
        aria-expanded={open}
      >
        <img src={veeImg} alt="Vee, your style assistant" />
        <span className="vee-shadow" aria-hidden="true" />
      </button>
    </div>
  );
}