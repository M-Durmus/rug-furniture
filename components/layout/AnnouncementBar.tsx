"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { Container } from "@/components/ui/Container";

const messages = [
  { href: "/help/shipping", text: "Free shipping across the USA" },
  { href: "/help/returns", text: "100-day returns" },
  { href: "/about", text: "Shipped from our own U.S. warehouses" },
];

let messageIndex = 0;
const indexListeners = new Set<() => void>();
let timer: number | undefined;

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

function step(direction: number) {
  messageIndex = (messageIndex + direction + messages.length) % messages.length;
  indexListeners.forEach((listener) => listener());
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path
        d={direction === "left" ? "M8.5 3 L4.5 7 L8.5 11" : "M5.5 3 L9.5 7 L5.5 11"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function AnnouncementBar() {
  const index = useSyncExternalStore(subscribeIndex, () => messageIndex, () => 0);
  const message = messages[index] ?? messages[0];

  return (
    <div className="h-10 bg-bar text-bar-foreground [&_:focus-visible]:outline-bar-foreground">
      <Container className="relative flex h-10 items-center justify-center">
        <div className="flex min-w-0 items-center gap-1 sm:gap-2 sm:px-24">
          <button
            type="button"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center"
            aria-label="Previous announcement"
            onClick={() => step(-1)}
          >
            <Chevron direction="left" />
          </button>
          <Link href={message.href} className="truncate text-[13px] tracking-wide hover:underline">
            {message.text}
          </Link>
          <button
            type="button"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center"
            aria-label="Next announcement"
            onClick={() => step(1)}
          >
            <Chevron direction="right" />
          </button>
        </div>
        <Link
          href="/trade-program"
          className="absolute right-5 hidden text-[13px] tracking-wide hover:underline sm:inline"
        >
          Trade
        </Link>
      </Container>
    </div>
  );
}
