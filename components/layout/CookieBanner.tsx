"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

const storageKey = "wool-loom-cookies";
const eventName = "wool-loom-cookies";

type Choice = "accepted" | "declined" | "unset";

function subscribe(onStoreChange: () => void) {
  window.addEventListener(eventName, onStoreChange);
  return () => window.removeEventListener(eventName, onStoreChange);
}

function choiceNow(): Choice {
  try {
    const value = localStorage.getItem(storageKey);
    if (value === "accepted" || value === "declined") return value;
  } catch {
    return "declined";
  }
  return "unset";
}

export function CookieBanner() {
  const choice = useSyncExternalStore(subscribe, choiceNow, () => "accepted" as Choice);

  function choose(next: "accepted" | "declined") {
    try {
      localStorage.setItem(storageKey, next);
    } catch {
      /* The banner still closes for this view. */
    }
    window.dispatchEvent(new Event(eventName));
  }

  if (choice !== "unset") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-card text-ink">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm">
          We store your cart, theme, and this choice on this device. Read the{" "}
          <Link href="/privacy" className="underline underline-offset-4">
            privacy note
          </Link>
          .
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            className="inline-flex h-10 items-center rounded-[2px] border border-ink px-4"
            onClick={() => choose("declined")}
          >
            Decline
          </button>
          <button
            type="button"
            className="inline-flex h-10 items-center rounded-[2px] border border-ink bg-ink px-4 text-bg"
            onClick={() => choose("accepted")}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
