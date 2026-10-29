"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Image } from "@/components/media/Image";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { CartCatalogProduct, CartSuggestion } from "@/components/cart/types";
import { useCoupon } from "@/components/checkout/coupon-store";
import { couponError, couponRate } from "@/lib/checkout/coupon";
import { hydrateCart, lineKey, useCartStore } from "@/lib/cart/store";
import { money } from "@/lib/data/price";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export function CatalogCart({
  products,
  suggestions,
}: {
  products: CartCatalogProduct[];
  suggestions: CartSuggestion[];
}) {
  const items = useCartStore((state) => state.items);
  const unitPrices = useCartStore((state) => state.unitPrices);
  const hydrated = useCartStore((state) => state.hydrated);
  const setQty = useCartStore((state) => state.setQty);
  const remove = useCartStore((state) => state.remove);
  const { code, setCoupon } = useCoupon();
  const [draft, setDraft] = useState("");
  const [couponMessage, setCouponMessage] = useState<string | null>(null);
  const byId = new Map(products.map((product) => [product.id, product]));

  useEffect(() => {
    hydrateCart();
  }, []);

  if (!hydrated) {
    return <p className="mt-6">Loading the cart.</p>;
  }

  const subtotal = money(
    items.reduce((sum, line) => sum + (unitPrices[lineKey(line)] ?? 0) * line.qty, 0),
  );
  const rate = couponRate(code);
  const discount = money(subtotal * rate);
  const taxable = money(subtotal - discount);
  const tax = money(taxable * 0.08);
  const total = money(taxable + tax);

  if (items.length === 0) {
    return (
      <div className="mt-8 max-w-xl border border-line bg-card p-6">
        <h2 className="font-serif text-h2">Your cart is empty</h2>
        <p className="mt-3">
          Rugs and furniture you add show up here. Shipping on in-stock pieces is free.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button href="/rugs">Shop rugs</Button>
          <Button href="/furniture" variant="outline">
            Shop furniture
          </Button>
        </div>
        <p className="mt-6 text-sm text-mute">Rug care services are quoted separately.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <ul className="space-y-4">
        {items.map((item) => {
          const product = byId.get(item.productId);
          const key = lineKey(item);
          const unit = unitPrices[key] ?? 0;
          const title = product?.title ?? "Saved piece";
          return (
            <li
              key={key}
              className="grid grid-cols-[5rem_minmax(0,1fr)] gap-4 border border-line bg-card p-4 sm:grid-cols-[6rem_minmax(0,1fr)_auto]"
            >
              <div className="aspect-[4/5] bg-sand">
                <Image
                  src={product?.image}
                  alt=""
                  colors={product?.colors ?? []}
                  subject={product?.subject ?? "rug"}
                  furniture={product?.furniture}
                  style={product?.style}
                  className="h-full w-full"
                />
              </div>
              <div>
                {product ? (
                  <Link href={product.href} className="font-medium underline underline-offset-4">
                    {title}
                  </Link>
                ) : (
                  <p className="font-medium">{title}</p>
                )}
                <p className="mt-1 text-sm text-mute">
                  {item.sizeLabel} · {item.colorName}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    type="button"
                    className="inline-flex h-10 w-10 items-center justify-center border border-line"
                    aria-label={`Decrease quantity of ${title}`}
                    onClick={() => setQty(item, item.qty - 1)}
                  >
                    −
                  </button>
                  <span className="min-w-8 text-center" aria-live="polite">
                    <span className="sr-only">Quantity </span>
                    {item.qty}
                  </span>
                  <button
                    type="button"
                    className="inline-flex h-10 w-10 items-center justify-center border border-line"
                    aria-label={`Increase quantity of ${title}`}
                    disabled={product ? item.qty >= product.stock : item.qty >= 9}
                    onClick={() => setQty(item, item.qty + 1)}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    className="ml-2 text-sm underline underline-offset-4"
                    onClick={() => remove(item)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <p className="col-span-2 text-right sm:col-span-1 sm:self-start">
                {usd.format(unit * item.qty)}
              </p>
            </li>
          );
        })}
      </ul>
      <aside className="h-fit border border-line bg-card p-5 lg:sticky lg:top-24">
        <h2 className="font-serif text-h3">Order summary</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <Row label="Subtotal" value={usd.format(subtotal)} />
          {discount > 0 ? <Row label="WELCOME10" value={`−${usd.format(discount)}`} /> : null}
          <Row label="Shipping" value="Free" />
          <Row label="Estimated tax" value={usd.format(tax)} />
          <Row label="Total" value={usd.format(total)} />
        </dl>
        <form
          className="mt-4"
          onSubmit={(event) => {
            event.preventDefault();
            const message = couponError(draft);
            setCouponMessage(message);
            if (message || !draft.trim()) return;
            setCoupon(draft.trim().toUpperCase());
            setDraft("");
          }}
        >
          <label className="block text-sm" htmlFor="coupon">
            Coupon
          </label>
          <div className="mt-1 flex gap-2">
            <Input
              id="coupon"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              autoComplete="off"
            />
            <Button type="submit">Apply</Button>
          </div>
          {couponMessage ? (
            <p role="alert" className="mt-2 text-sm text-accent">
              {couponMessage}
            </p>
          ) : null}
          {code ? (
            <p className="mt-2 text-sm">
              {code} is applied.{" "}
              <button
                type="button"
                className="underline underline-offset-4"
                onClick={() => setCoupon("")}
              >
                Remove
              </button>
            </p>
          ) : (
            <p className="mt-2 text-sm text-mute">WELCOME10 takes 10% off.</p>
          )}
        </form>
        <Button href="/checkout" className="mt-4 w-full">
          Checkout
        </Button>
        <p className="mt-4 text-sm text-mute">Rug care services are quoted separately.</p>
      </aside>
      <section className="lg:col-span-2" aria-labelledby="cart-suggestions">
        <h2 id="cart-suggestions" className="font-serif text-h2">
          Before you check out
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {suggestions.map((item) => (
            <li key={item.title} className="border border-line bg-card p-5">
              <h3 className="font-serif text-h3">{item.title}</h3>
              <p className="mt-2">{item.text}</p>
              <Link
                href={item.href}
                className="mt-4 inline-flex min-h-10 items-center underline underline-offset-4"
              >
                {item.action}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-mute">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
