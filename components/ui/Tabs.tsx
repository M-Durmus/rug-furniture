"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function Tabs({
  label,
  tabs,
}: {
  label: string;
  tabs: { id: string; label: string; content: ReactNode }[];
}) {
  const baseId = useId();
  const [active, setActive] = useState(tabs[0]?.id ?? "");
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  function move(nextIndex: number) {
    const index = (nextIndex + tabs.length) % tabs.length;
    const tab = tabs[index];
    if (!tab) return;
    setActive(tab.id);
    refs.current[index]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = tabs.findIndex((tab) => tab.id === active);
    if (event.key === "ArrowRight") {
      event.preventDefault();
      move(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      move(0);
    } else if (event.key === "End") {
      event.preventDefault();
      move(tabs.length - 1);
    }
  }

  return (
    <div>
      <div role="tablist" aria-label={label} onKeyDown={onKeyDown} className="flex gap-1 border-b border-line">
        {tabs.map((tab, index) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              ref={(node) => {
                refs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab.id)}
              className={cn(
                "min-h-10 px-3 text-sm",
                selected ? "border-b-2 border-ink text-ink" : "text-mute",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${baseId}-panel-${tab.id}`}
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          hidden={tab.id !== active}
          tabIndex={0}
          className="pt-4 leading-6"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
