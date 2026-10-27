"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Drawer } from "@/components/ui/Drawer";
import { Image } from "@/components/media/Image";
import { useToast } from "@/components/ui/Toast";
import type { CartProductInfo } from "@/components/layout/chrome";
import { lineKey, useCartStore } from "@/lib/cart/store";
import { money as roundMoney } from "@/lib/data/price";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export function CartDrawer({
  open,
  products,
  onClose,
}: {
  open: boolean;
  products: CartProductInfo[];
  onClose: () => void;
}) {
  const items = useCartStore((state) => state.items);
  const unitPrices = useCartStore((state) => state.unitPrices);
  const setQty = useCartStore((state) => state.setQty);
  const remove = useCartStore((state) => state.remove);
  const subtotal = useMemo(
    () =>
      roundMoney(
        items.reduce((sum, line) => sum + (unitPrices[lineKey(line)] ?? 0) * line.qty, 0),
      ),
    [items, unitPrices],
  );
  const toast = useToast();
  const byId = new Map(products.map((product) => [product.id, product]));

  if (!open) return null;

  return (
    <Drawer title="Cart" onClose={onClose}>
      {items.length === 0 ? (
        <div className="mt-6">
          <p>Your cart is empty.</p>
          <div className="mt-4 flex flex-col gap-2">
            <Link href="/rugs" className="inline-flex min-h-10 items-center justify-center rounded-[2px] border border-ink bg-ink px-4 text-bg" onClick={onClose}>
              Shop rugs
            </Link>
            <Link href="/furniture" className="inline-flex min-h-10 items-center justify-center rounded-[2px] border border-ink px-4" onClick={onClose}>
              Shop furniture
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex min-h-[calc(100dvh-8rem)] flex-col">
          <ul className="space-y-4">
            {items.map((item) => {
              const product = byId.get(item.productId);
              const title = product?.title ?? "Rug";
              const key = lineKey(item);
              const unit = unitPrices[key] ?? 0;
              return (
                <li key={key} className="flex gap-3 border-b border-line pb-4">
                  <div className="h-20 w-16 shrink-0 bg-sand">
                    <Image
                      alt=""
                      colors={product?.colors ?? []}
                      subject={product?.subject ?? "rug"}
                      furniture={product?.furniture}
                      style={product?.style}
                      className="h-full w-full"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{title}</p>
                    <p className="text-sm text-mute">
                      {item.sizeLabel} · {item.colorName}
                    </p>
                    <p className="text-sm">{money.format(unit * item.qty)}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-[2px] border border-line"
                        aria-label={`Decrease quantity of ${title}`}
                        onClick={() => setQty(item, item.qty - 1)}
                      >
                        −
                      </button>
                      <span className="w-6 text-center" aria-live="polite">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-[2px] border border-line"
                        aria-label={`Increase quantity of ${title}`}
                        onClick={() => setQty(item, item.qty + 1)}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className="ml-auto text-sm underline underline-offset-4"
                        onClick={() => {
                          remove(item);
                          toast(`Removed ${title} from the cart`);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="mt-auto pt-6">
            <p className="flex justify-between font-medium">
              <span>Subtotal</span>
              <span>{money.format(subtotal)}</span>
            </p>
            <p className="mt-1 text-sm text-mute">Shipping is free. Tax is calculated at checkout.</p>
            <div className="mt-4 flex flex-col gap-2">
              <Link href="/cart" className="inline-flex min-h-10 items-center justify-center rounded-[2px] border border-ink px-4" onClick={onClose}>
                Go to cart
              </Link>
              <Link href="/checkout" className="inline-flex min-h-10 items-center justify-center rounded-[2px] border border-ink bg-ink px-4 text-bg" onClick={onClose}>
                Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
}
