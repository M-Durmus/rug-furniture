"use client";

import { useSyncExternalStore } from "react";

export const COUPON_KEY = "wool-loom-coupon";
const EVENT = "wool-loom-coupon";

function subscribe(onStoreChange: () => void) {
  window.addEventListener(EVENT, onStoreChange);
  return () => window.removeEventListener(EVENT, onStoreChange);
}

function read() {
  return window.sessionStorage.getItem(COUPON_KEY) ?? "";
}

export function useCoupon() {
  const code = useSyncExternalStore(subscribe, read, () => "");

  function setCoupon(next: string) {
    if (next) window.sessionStorage.setItem(COUPON_KEY, next);
    else window.sessionStorage.removeItem(COUPON_KEY);
    window.dispatchEvent(new Event(EVENT));
  }

  return { code, setCoupon };
}
