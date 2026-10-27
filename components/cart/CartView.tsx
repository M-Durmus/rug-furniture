"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FramedImage } from "@/components/media/FramedImage";
import { readCart, writeCart, type CartItem } from "@/components/cart/storage";
import { formatUsd } from "@/lib/format";

export function CartView() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setItems(readCart());
    setReady(true);
  }, []);

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="min-h-64">
      {!ready ? <p>Loading your cart.</p> : null}
      {ready && items.length === 0 ? (
        <p>
          Your cart is empty.{" "}
          <Link href="/rugs" className="underline underline-offset-4">
            Shop rugs
          </Link>{" "}
          or{" "}
          <Link href="/furniture" className="underline underline-offset-4">
            shop furniture
          </Link>
          .
        </p>
      ) : null}
      {ready && items.length > 0 ? (
        <>
          <ul className="divide-y divide-line border-y border-line">
            {items.map((item) => (
              <li key={item.slug} className="grid grid-cols-[5rem_1fr] gap-4 py-4">
                <FramedImage src={item.image} alt={item.imageAlt} width={640} height={800} sizes="80px" />
                <div>
                  <h2 className="font-serif text-2xl">
                    <Link href={item.href} className="underline underline-offset-4">
                      {item.name}
                    </Link>
                  </h2>
                  <p>
                    {item.qty} × {formatUsd(item.price)}
                  </p>
                  <button
                    type="button"
                    className="mt-2 inline-flex min-h-12 items-center underline underline-offset-4"
                    onClick={() => {
                      const next = items.filter((entry) => entry.slug !== item.slug);
                      writeCart(next);
                      setItems(next);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-lg">Subtotal {formatUsd(total)}</p>
          <p className="mt-2 text-sm">Tax and final freight are not calculated yet. No payment is taken.</p>
          <Link href="/checkout" className="mt-4 inline-flex min-h-12 items-center rounded-[2px] bg-inverse px-5 text-inverse-foreground">
            Continue to checkout
          </Link>
        </>
      ) : null}
    </div>
  );
}
