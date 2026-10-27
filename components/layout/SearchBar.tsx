"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { SearchEntry } from "@/components/layout/chrome";

export function SearchBar({
  open,
  entries,
  onClose,
}: {
  open: boolean;
  entries: SearchEntry[];
  onClose: () => void;
}) {
  const router = useRouter();
  const ref = useRef<HTMLDialogElement>(null);
  const onCloseRef = useRef(onClose);
  const titleId = useId();
  const listId = useId();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [trackedQuery, setTrackedQuery] = useState(query);
  if (query !== trackedQuery) {
    setTrackedQuery(query);
    setActive(0);
  }

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    let disposed = false;
    const handleClose = () => {
      if (!disposed) onCloseRef.current();
    };
    if (!dialog.open) dialog.showModal();
    dialog.addEventListener("close", handleClose);
    return () => {
      disposed = true;
      dialog.removeEventListener("close", handleClose);
      if (dialog.open) {
        dialog.addEventListener("close", (event) => event.stopImmediatePropagation(), { once: true });
        dialog.close();
      }
    };
  }, []);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const pool = needle
      ? entries.filter((entry) => `${entry.title} ${entry.text} ${entry.kind}`.toLowerCase().includes(needle))
      : entries.slice(0, 6);
    return pool.slice(0, 8);
  }, [entries, query]);

  function go(entry: SearchEntry | undefined) {
    if (!entry) return;
    ref.current?.close();
    router.push(entry.href);
  }

  if (!open) return null;

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      data-placement="start"
      className="w-[min(40rem,calc(100%-2rem))] border border-line bg-card p-5 text-ink"
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
    >
      <h2 id={titleId} className="font-serif text-h3">
        Search
      </h2>
      <label htmlFor="site-search" className="sr-only">
        Search rugs, furniture, services, and journal
      </label>
      <input
        id="site-search"
        role="combobox"
        aria-expanded="true"
        aria-controls={listId}
        aria-activedescendant={results[active] ? `${listId}-${active}` : undefined}
        aria-autocomplete="list"
        type="search"
        value={query}
        autoFocus
        placeholder="Search rugs, furniture, care, journal"
        className="mt-4 h-12 w-full rounded-[2px] border border-line bg-bg px-3"
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setActive((current) => Math.min(current + 1, Math.max(results.length - 1, 0)));
          }
          if (event.key === "ArrowUp") {
            event.preventDefault();
            setActive((current) => Math.max(current - 1, 0));
          }
          if (event.key === "Enter") {
            event.preventDefault();
            go(results[active]);
          }
        }}
      />
      <p className="mt-3 text-sm text-mute">
        {query.trim() ? `${results.length} suggestions` : "Popular"}
      </p>
      <ul id={listId} role="listbox" className="mt-2">
        {results.length === 0 ? (
          <li className="py-3 text-sm">No matches. Try a size, a color, or a service.</li>
        ) : (
          results.map((entry, index) => (
            <li key={entry.id} role="presentation">
              <button
                id={`${listId}-${index}`}
                type="button"
                role="option"
                aria-selected={index === active}
                className={`flex w-full flex-col items-start rounded-[2px] px-2 py-2 text-left ${
                  index === active ? "bg-sand" : ""
                }`}
                onMouseEnter={() => setActive(index)}
                onClick={() => go(entry)}
              >
                <span className="text-xs tracking-wide text-mute uppercase">{entry.kind}</span>
                <span>{entry.title}</span>
              </button>
            </li>
          ))
        )}
      </ul>
      <button
        type="button"
        className="mt-4 inline-flex min-h-10 items-center rounded-[2px] border border-line px-4"
        onClick={() => ref.current?.close()}
      >
        Close
      </button>
    </dialog>
  );
}
