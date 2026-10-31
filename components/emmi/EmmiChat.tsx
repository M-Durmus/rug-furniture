"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { askEmmi, type EmmiPick } from "@/lib/emmi/ask";

type Message = {
  id: string;
  role: "emmi" | "user";
  text: string;
  suggestions?: string[];
  shop?: { href: string; label: string };
  picks?: EmmiPick[];
};

const opening: Message = {
  id: "open",
  role: "emmi",
  text: "I’m Emmi. Tell me the room, and I’ll match a rug size and a few pieces from our U.S. warehouses.",
  suggestions: ["Living room", "Bedroom", "Dining room", "Hallway", "Washable rugs", "Sofas"],
};

export function EmmiChat() {
  const panelId = useId();
  const inputId = useId();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [messages, setMessages] = useState<Message[]>([opening]);
  const wasOpen = useRef(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      return;
    }
    if (wasOpen.current) buttonRef.current?.focus();
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, pending, open]);

  async function send(text: string) {
    const message = text.trim();
    if (!message || pending) return;
    setDraft("");
    setMessages((current) => [...current, { id: `u-${current.length}`, role: "user", text: message }]);
    setPending(true);
    try {
      const reply = await askEmmi(message);
      setMessages((current) => [
        ...current,
        {
          id: `e-${current.length}`,
          role: "emmi",
          text: reply.text,
          suggestions: reply.suggestions,
          shop: reply.shop,
          picks: reply.picks,
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: `e-${current.length}`,
          role: "emmi",
          text: "I couldn’t look that up. Try a room, such as living room or bedroom.",
          suggestions: opening.suggestions,
        },
      ]);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="fixed right-5 bottom-5 z-[45] flex flex-col items-end [body:has([data-cookie-banner])_&]:bottom-[8.5rem]">
      {open ? (
        <section
          id={panelId}
          role="dialog"
          aria-label="Emmi AI"
          className="mb-3 flex max-h-[min(36rem,calc(100dvh-8rem))] w-[min(24rem,calc(100vw-1.5rem))] flex-col border border-line bg-card text-ink shadow-[0_16px_40px_rgba(23,22,20,0.16)]"
        >
          <header className="flex items-center justify-between gap-3 border-b border-line bg-sand px-4 py-3">
            <div>
              <p className="font-serif text-xl leading-none">Emmi AI</p>
              <p className="mt-1 text-xs text-mute">Rug and furniture guide</p>
            </div>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center"
              aria-label="Close Emmi AI"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </header>
          <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 py-4" aria-live="polite">
            {messages.map((message) => (
              <div key={message.id} className={message.role === "user" ? "self-end" : "self-start"}>
                <p
                  className={`max-w-[18rem] px-3 py-2 text-sm leading-6 ${
                    message.role === "user" ? "bg-ink text-bg" : "bg-sand text-ink"
                  }`}
                >
                  {message.text}
                </p>
                {message.picks && message.picks.length > 0 ? (
                  <ul className="mt-2 max-w-[20rem] space-y-2">
                    {message.picks.map((pick) => (
                      <li key={pick.href}>
                        <Link href={pick.href} className="flex gap-3 border border-line bg-bg p-2 hover:border-ink">
                          {pick.image ? (
                            <Image
                              src={pick.image}
                              alt=""
                              width={64}
                              height={80}
                              className="h-20 w-16 object-cover"
                            />
                          ) : (
                            <span className="h-20 w-16 bg-sand" />
                          )}
                          <span className="min-w-0">
                            <span className="block text-sm font-medium">{pick.title}</span>
                            <span className="mt-1 block text-xs text-mute">{pick.note}</span>
                            <span className="mt-1 block text-sm text-accent">{pick.price}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {message.shop ? (
                  <Link href={message.shop.href} className="mt-2 inline-flex min-h-10 items-center text-sm text-accent underline underline-offset-4">
                    {message.shop.label}
                  </Link>
                ) : null}
                {message.suggestions && message.suggestions.length > 0 ? (
                  <ul className="mt-2 flex max-w-[20rem] flex-wrap gap-1.5">
                    {message.suggestions.map((suggestion) => (
                      <li key={suggestion}>
                        <button
                          type="button"
                          className="inline-flex min-h-9 items-center border border-line bg-bg px-2.5 text-xs hover:border-ink"
                          onClick={() => send(suggestion)}
                        >
                          {suggestion}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
            {pending ? <p className="text-sm text-mute">Looking through the warehouse…</p> : null}
            <div ref={endRef} />
          </div>
          <form
            className="flex gap-2 border-t border-line p-3"
            onSubmit={(event) => {
              event.preventDefault();
              void send(draft);
            }}
          >
            <label htmlFor={inputId} className="sr-only">
              Message Emmi
            </label>
            <input
              ref={inputRef}
              id={inputId}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="A room, a size, or a sofa"
              className="h-11 min-w-0 flex-1 border border-line bg-bg px-3 text-sm"
            />
            <button
              type="submit"
              className="inline-flex h-11 items-center bg-accent px-4 text-sm text-bg disabled:opacity-50"
              disabled={pending || draft.trim() === ""}
            >
              Send
            </button>
          </form>
        </section>
      ) : null}
      <button
        ref={buttonRef}
        type="button"
        className="inline-flex h-14 items-center gap-3 border border-line bg-card pr-5 pl-2 text-ink shadow-[0_12px_32px_rgba(23,22,20,0.14)] transition-colors hover:border-ink"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="inline-flex h-10 w-10 items-center justify-center bg-accent font-serif text-lg leading-none text-[#f6f1e8]">
          E
        </span>
        <span className="text-left">
          <span className="block font-serif text-lg leading-none">Emmi</span>
          <span className="mt-1 block text-[10px] tracking-[0.18em] text-mute uppercase">
            {open ? "Close" : "Ask"}
          </span>
        </span>
      </button>
    </div>
  );
}
