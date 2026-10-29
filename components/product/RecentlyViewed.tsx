"use client";

import { useEffect, useSyncExternalStore } from "react";
import { ProductShelf, type ShelfItem } from "@/components/product/ProductShelf";

const KEY = "wool-loom-recently-viewed";
const EVENT = "wool-loom-recent";

function subscribe(onStoreChange: () => void) {
  window.addEventListener(EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function read() {
  return window.localStorage.getItem(KEY) ?? "[]";
}

function parse(raw: string): string[] {
  try {
    const value = JSON.parse(raw) as unknown;
    if (!Array.isArray(value)) return [];
    return value.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

export function RecentlyViewed({ slug, items }: { slug: string; items: ShelfItem[] }) {
  const raw = useSyncExternalStore(subscribe, read, () => "[]");

  useEffect(() => {
    const next = [
      slug,
      ...parse(window.localStorage.getItem(KEY) ?? "[]").filter((item) => item !== slug),
    ].slice(0, 12);
    const serialized = JSON.stringify(next);
    if (serialized === window.localStorage.getItem(KEY)) return;
    window.localStorage.setItem(KEY, serialized);
    window.dispatchEvent(new Event(EVENT));
  }, [slug]);

  const bySlug = new Map(items.map((item) => [item.slug, item]));
  const recent = parse(raw)
    .filter((item) => item !== slug)
    .map((item) => bySlug.get(item))
    .filter((item): item is ShelfItem => item !== undefined)
    .slice(0, 4);

  return <ProductShelf title="Recently viewed" items={recent} />;
}
