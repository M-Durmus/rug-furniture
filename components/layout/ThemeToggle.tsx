"use client";

import { useSyncExternalStore } from "react";
import type { ThemeChoice } from "@/types";

const storageKey = "wool-loom-theme";

function readChoice(): ThemeChoice {
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* Storage can be blocked. The page still follows the system theme. */
  }
  return "system";
}

function applyChoice(choice: ThemeChoice) {
  const root = document.documentElement;
  if (choice === "system") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", choice);
  try {
    if (choice === "system") localStorage.removeItem(storageKey);
    else localStorage.setItem(storageKey, choice);
  } catch {
    /* The attribute still applies for this view. */
  }
}

const themeEvent = "wool-loom-theme-change";

function subscribe(onStoreChange: () => void) {
  window.addEventListener(themeEvent, onStoreChange);
  return () => window.removeEventListener(themeEvent, onStoreChange);
}

export function ThemeToggle() {
  const choice = useSyncExternalStore(subscribe, readChoice, () => "system" as ThemeChoice);

  function select(next: ThemeChoice) {
    applyChoice(next);
    window.dispatchEvent(new Event(themeEvent));
  }

  return (
    <div role="group" aria-label="Color theme" className="flex items-center gap-1">
      {(
        [
          ["system", "System"],
          ["light", "Light"],
          ["dark", "Dark"],
        ] as const
      ).map(([value, label]) => (
        <button
          key={value}
          type="button"
          aria-pressed={choice === value}
          onClick={() => select(value)}
          className={`inline-flex min-h-10 items-center rounded-[2px] border px-2 text-sm ${
            choice === value ? "border-ink bg-ink text-bg" : "border-line bg-transparent text-ink"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
