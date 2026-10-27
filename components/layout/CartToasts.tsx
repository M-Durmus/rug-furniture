"use client";

import { useEffect, useRef } from "react";
import { useToast } from "@/components/ui/Toast";
import { useCartStore } from "@/lib/cart/store";

export function CartToasts() {
  const items = useCartStore((state) => state.items);
  const hydrated = useCartStore((state) => state.hydrated);
  const toast = useToast();
  const ready = useRef(false);
  const previous = useRef(0);

  useEffect(() => {
    if (!hydrated) return;
    const count = items.reduce((sum, item) => sum + item.qty, 0);
    if (ready.current && count > previous.current) toast("Added to cart");
    ready.current = true;
    previous.current = count;
  }, [hydrated, items, toast]);

  return null;
}
