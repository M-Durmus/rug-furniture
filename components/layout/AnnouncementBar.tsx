"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { Container } from "@/components/ui/Container";

const storageKey = "wool-loom-announcement-dismissed";

const messages = [
  { href: "/shipping", text: "Free shipping across the USA" },
  { href: "/shipping", text: "100-day returns" },
  { href: "/about", text: "Shipped from our own U.S. warehouses" },
];

let dismissed = false;
const dismissListeners = new Set<() => void>();
let messageIndex = 0;
const indexListeners = new Set<() => void>();
let timer: number | undefined;

function subscribeDismiss(onStoreChange: () => void) {
  dismissListeners.add(onStoreChange);
  return () => dismissListeners.delete(onStoreChange);
}

function readDismissed() {
  if (dismissed) return true;
  try {
    return sessionStorage.getItem(storageKey) === "1";
  } catch {
    return false;
  }
}

function subscribeIndex(onStoreChange: () => void) {
  indexListeners.add(onStoreChange);
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (timer === undefined && !motion.matches) {
    timer = window.setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      indexListeners.forEach((listener) => listener());
    }, 4000);
  }
  return () => {
    indexListeners.delete(onStoreChange);
    if (indexListeners.size === 0 && timer !== undefined) {
      window.clearInterval(timer);
      timer = undefined;
    }
  };
}

export function AnnouncementBar() {
  const hidden = useSyncExternalStore(subscribeDismiss, readDismissed, () => false);
  const index = useSyncExternalStore(subscribeIndex, () => messageIndex, () => 0);

  if (hidden) return null;

  const message = messages[index] ?? messages[0];

  function dismiss() {
    dismissed = true;
    try {
      sessionStorage.setItem(storageKey, "1");
    } catch {
      /* The in-memory flag still hides the bar. */
    }
    dismissListeners.forEach((listener) => listener());
  }

  return (
    <div className="h-12 bg-dark text-on-dark [&_:focus-visible]:outline-[#d08b78]">
      <Container className="relative flex h-12 items-center justify-center">
        <Link href={message.href} className="truncate px-10 text-sm underline-offset-4 hover:underline">
          {message.text}
        </Link>
        <button
          type="button"
          className="absolute right-5 inline-flex h-10 w-10 items-center justify-center rounded-[2px]"
          aria-label="Dismiss announcement"
          onClick={dismiss}
        >
          <span aria-hidden="true">×</span>
        </button>
      </Container>
    </div>
  );
}
