"use client";

import { useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import { RECEIPT_KEY } from "@/components/checkout/CheckoutForm";
import { Button } from "@/components/ui/Button";
import type { OrderReceipt } from "@/app/checkout/actions";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
}

function read() {
  return window.sessionStorage.getItem(RECEIPT_KEY) ?? "";
}

function parse(raw: string): OrderReceipt | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as OrderReceipt;
    return value?.id ? value : null;
  } catch {
    return null;
  }
}

export function SuccessView() {
  const params = useSearchParams();
  const raw = useSyncExternalStore(subscribe, read, () => "");
  const receipt = parse(raw);
  const requested = params.get("order");

  if (!receipt || (requested && requested !== receipt.id)) {
    return (
      <div className="mt-8 max-w-xl border border-line bg-card p-6">
        <h2 className="font-serif text-h2">No order on this device</h2>
        <p className="mt-3">Place an order from the cart and the number will show here.</p>
        <Button href="/rugs" className="mt-6">
          Shop rugs
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div>
        <p className="text-sm text-mute">Order number</p>
        <p className="mt-1 font-medium break-all">{receipt.id}</p>
        <p className="mt-4">
          A confirmation stays on this browser for {receipt.email}. No card was charged.
        </p>
        <h2 className="mt-8 font-serif text-h2">What happens next</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5">
          <li>
            The nearest warehouse prepares the piece. Shipping is free and takes 1–3 business days.
          </li>
          <li>We reply to {receipt.email} if a size or address needs a second look.</li>
          <li>Rug care is a separate quote. Book it when the rug is home.</li>
        </ol>
        <section className="mt-8 border border-line bg-card p-5" aria-labelledby="care-cross">
          <h2 id="care-cross" className="font-serif text-h3">
            Book rug care
          </h2>
          <p className="mt-2">
            Cleaning, repair, and custom sizing are priced by quote, not from this order.
          </p>
          <Button href="/services" className="mt-4">
            Book rug care
          </Button>
        </section>
      </div>
      <aside className="h-fit border border-line bg-card p-5">
        <h2 className="font-serif text-h3">Summary</h2>
        <p className="mt-3 text-sm">
          {receipt.name}
          <br />
          {receipt.address}
          <br />
          {receipt.city}, {receipt.state} {receipt.zip}
        </p>
        <ul className="mt-4 space-y-2 text-sm">
          {receipt.lines.map((line) => (
            <li
              key={`${line.title}-${line.sizeLabel}-${line.colorName}`}
              className="flex justify-between gap-3"
            >
              <span>
                {line.qty} × {line.title}, {line.sizeLabel}, {line.colorName}
              </span>
              <span>{usd.format(line.total)}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-4 space-y-2 text-sm">
          <Summary label="Subtotal" value={usd.format(receipt.subtotal)} />
          {receipt.discount > 0 ? (
            <Summary label="Discount" value={`−${usd.format(receipt.discount)}`} />
          ) : null}
          <Summary label="Shipping" value="Free" />
          <Summary label="Estimated tax" value={usd.format(receipt.tax)} />
          <Summary label="Total" value={usd.format(receipt.total)} />
        </dl>
      </aside>
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-mute">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
