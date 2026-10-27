"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { readCart, writeCart, type CartItem } from "@/components/cart/storage";
import { formatUsd } from "@/lib/format";

export function CheckoutView() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [placed, setPlaced] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setItems(readCart());
    setReady(true);
  }, []);

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (placed) {
    return <p role="status">Request saved on this device. Wool & Loom has not charged a card and has not reserved the stock.</p>;
  }

  return (
    <div className="min-h-64">
      {!ready ? <p>Loading checkout.</p> : null}
      {ready && items.length === 0 ? (
        <p>
          Nothing is waiting for checkout.{" "}
          <Link href="/rugs" className="underline underline-offset-4">
            Browse rugs
          </Link>
          .
        </p>
      ) : null}
      {ready && items.length > 0 ? (
        <>
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.slug}>
                {item.name} × {item.qty} · {formatUsd(item.price * item.qty)}
              </li>
            ))}
          </ul>
          <p className="mt-4">Subtotal {formatUsd(total)}. Shipping and tax are quoted later.</p>
          <button
            type="button"
            className="mt-6 inline-flex min-h-12 items-center rounded-[2px] bg-inverse px-5 text-inverse-foreground"
            onClick={() => {
              writeCart([]);
              setItems([]);
              setPlaced(true);
            }}
          >
            Place request
          </button>
        </>
      ) : null}
    </div>
  );
}
