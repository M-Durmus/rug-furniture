"use client";

import { useSyncExternalStore } from "react";

export const FAVORITES_KEY = "wool-loom-favorites";
const EVENT = "wool-loom-favorites";

export type SavedFavorite = {
  id: string;
  title: string;
  href: string;
  colors: string[];
  subject: "rug" | "furniture";
  style?: string;
  furniture?: "sofa" | "table" | "chair" | "side";
};

function subscribe(onStoreChange: () => void) {
  window.addEventListener(EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function read() {
  return window.localStorage.getItem(FAVORITES_KEY) ?? "[]";
}

export function parseFavorites(raw: string): SavedFavorite[] {
  try {
    const value = JSON.parse(raw) as unknown;
    if (!Array.isArray(value)) return [];
    return value.filter(
      (item): item is SavedFavorite =>
        !!item &&
        typeof item === "object" &&
        typeof item.id === "string" &&
        typeof item.title === "string",
    );
  } catch {
    return [];
  }
}

function write(items: SavedFavorite[]) {
  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(EVENT));
}

export function useFavorites() {
  const raw = useSyncExternalStore(subscribe, read, () => "[]");
  const items = parseFavorites(raw);

  function toggle(item: SavedFavorite) {
    const next = items.some((saved) => saved.id === item.id)
      ? items.filter((saved) => saved.id !== item.id)
      : [item, ...items];
    write(next);
  }

  return {
    items,
    toggle,
    saved: (id: string) => items.some((item) => item.id === id),
  };
}
