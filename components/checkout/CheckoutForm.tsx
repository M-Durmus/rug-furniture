"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { placeOrder, type OrderReceipt } from "@/app/checkout/actions";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useCoupon } from "@/components/checkout/coupon-store";
import { couponRate } from "@/lib/checkout/coupon";
import { checkoutSchema, type CheckoutInput } from "@/lib/checkout/schema";
import { US_STATES } from "@/lib/checkout/states";
import { hydrateCart, lineKey, useCartStore } from "@/lib/cart/store";
import { money } from "@/lib/data/price";

export const RECEIPT_KEY = "wool-loom-order-receipt";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export function CheckoutForm() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const unitPrices = useCartStore((state) => state.unitPrices);
  const hydrated = useCartStore((state) => state.hydrated);
  const clear = useCartStore((state) => state.clear);
  const { code, setCoupon } = useCoupon();
  const [placed, setPlaced] = useState(false);
  const form = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: "",
      name: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      delivery: "standard",
      coupon: "",
    },
  });

  useEffect(() => {
    hydrateCart();
  }, []);

  const subtotal = money(
    items.reduce((sum, line) => sum + (unitPrices[lineKey(line)] ?? 0) * line.qty, 0),
  );
  const discount = money(subtotal * couponRate(code));
  const taxable = money(subtotal - discount);
  const tax = money(taxable * 0.08);
  const total = money(taxable + tax);
  const busy = form.formState.isSubmitting || placed;

  function onFormSubmit(event: FormEvent<HTMLFormElement>) {
    const formEl = event.currentTarget;
    if (formEl.dataset.placing === "1") {
      event.preventDefault();
      return;
    }
    formEl.dataset.placing = "1";
    void form.handleSubmit(
      async (values) => {
        const result = await placeOrder({ ...values, coupon: code, items });
        if ("errors" in result) {
          for (const [key, message] of Object.entries(result.errors)) {
            if (key === "form" || key === "coupon") form.setError("root", { message });
            else form.setError(key as keyof CheckoutInput, { message });
          }
          formEl.dataset.placing = "";
          return;
        }
        const receipt: OrderReceipt = result.receipt;
        window.sessionStorage.setItem(RECEIPT_KEY, JSON.stringify(receipt));
        clear();
        setCoupon("");
        setPlaced(true);
        router.push(`/checkout/success?order=${receipt.id}`);
      },
      () => {
        formEl.dataset.placing = "";
      },
    )(event);
  }

  if (!hydrated) return <p className="mt-6">Loading checkout.</p>;

  if (items.length === 0) {
    return (
      <div className="mt-8 max-w-xl border border-line bg-card p-6">
        <h2 className="font-serif text-h2">Nothing to check out</h2>
        <p className="mt-3">Add a rug or a piece of furniture before placing an order.</p>
        <Button href="/cart" className="mt-6">
          Back to the cart
        </Button>
      </div>
    );
  }

  return (
    <form
      className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]"
      onSubmit={onFormSubmit}
      noValidate
    >
      <div className="space-y-8">
        <fieldset className="space-y-3">
          <legend className="font-serif text-h3">Contact</legend>
          <Field label="Email" error={form.formState.errors.email?.message} id="checkout-email">
            <Input
              id="checkout-email"
              type="email"
              autoComplete="email"
              aria-invalid={!!form.formState.errors.email}
              aria-describedby={form.formState.errors.email ? "checkout-email-error" : undefined}
              {...form.register("email")}
            />
          </Field>
        </fieldset>
        <fieldset className="space-y-3">
          <legend className="font-serif text-h3">Delivery address</legend>
          <Field label="Name" error={form.formState.errors.name?.message} id="checkout-name">
            <Input
              id="checkout-name"
              autoComplete="name"
              aria-invalid={!!form.formState.errors.name}
              aria-describedby={form.formState.errors.name ? "checkout-name-error" : undefined}
              {...form.register("name")}
            />
          </Field>
          <Field
            label="Street address"
            error={form.formState.errors.address?.message}
            id="checkout-address"
          >
            <Input
              id="checkout-address"
              autoComplete="address-line1"
              aria-invalid={!!form.formState.errors.address}
              aria-describedby={
                form.formState.errors.address ? "checkout-address-error" : undefined
              }
              {...form.register("address")}
            />
          </Field>
          <Field label="City" error={form.formState.errors.city?.message} id="checkout-city">
            <Input
              id="checkout-city"
              autoComplete="address-level2"
              aria-invalid={!!form.formState.errors.city}
              aria-describedby={form.formState.errors.city ? "checkout-city-error" : undefined}
              {...form.register("city")}
            />
          </Field>
          <Field label="State" error={form.formState.errors.state?.message} id="checkout-state">
            <Select
              id="checkout-state"
              autoComplete="address-level1"
              aria-invalid={!!form.formState.errors.state}
              aria-describedby={form.formState.errors.state ? "checkout-state-error" : undefined}
              {...form.register("state")}
            >
              <option value="">Choose a state</option>
              {US_STATES.map((state) => (
                <option key={state.code} value={state.code}>
                  {state.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="ZIP code" error={form.formState.errors.zip?.message} id="checkout-zip">
            <Input
              id="checkout-zip"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={5}
              aria-invalid={!!form.formState.errors.zip}
              aria-describedby={form.formState.errors.zip ? "checkout-zip-error" : undefined}
              {...form.register("zip")}
            />
          </Field>
        </fieldset>
        <fieldset>
          <legend className="font-serif text-h3">Delivery method</legend>
          <label className="mt-3 flex min-h-10 items-start gap-2">
            <input type="radio" value="standard" className="mt-1" {...form.register("delivery")} />
            <span>Free, 1–3 business days from the nearest warehouse</span>
          </label>
          {form.formState.errors.delivery ? (
            <p role="alert" className="mt-2 text-sm text-accent">
              {form.formState.errors.delivery.message}
            </p>
          ) : null}
        </fieldset>
        <fieldset className="border border-dashed border-line p-4">
          <legend className="font-serif text-h3">Payment</legend>
          <p id="payment-note" className="mt-3">
            Card payments will be connected to Stripe.
          </p>
          <label className="mt-3 block text-sm" htmlFor="card-placeholder">
            Card number
          </label>
          <Input
            id="card-placeholder"
            className="mt-1"
            disabled
            placeholder="Card number"
            aria-describedby="payment-note"
          />
        </fieldset>
        {form.formState.errors.root ? (
          <p role="alert" className="text-accent">
            {form.formState.errors.root.message}
          </p>
        ) : null}
        <Button type="submit" disabled={busy}>
          {busy ? "Placing the order" : "Place order"}
        </Button>
      </div>
      <aside className="h-fit border border-line bg-card p-5 lg:sticky lg:top-24">
        <h2 className="font-serif text-h3">Order summary</h2>
        <ul className="mt-4 space-y-2 text-sm">
          {items.map((item) => (
            <li key={lineKey(item)}>
              {item.qty} × {item.sizeLabel} · {item.colorName}
            </li>
          ))}
        </ul>
        <dl className="mt-4 space-y-2 text-sm">
          <Summary label="Subtotal" value={usd.format(subtotal)} />
          {discount > 0 ? <Summary label="WELCOME10" value={`−${usd.format(discount)}`} /> : null}
          <Summary label="Shipping" value="Free" />
          <Summary label="Estimated tax" value={usd.format(tax)} />
          <Summary label="Total" value={usd.format(total)} />
        </dl>
        <p className="mt-4 text-sm text-mute">Rug care services are quoted separately.</p>
      </aside>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm" htmlFor={id}>
        {label}
      </label>
      <div className="mt-1">{children}</div>
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1 text-sm text-accent">
          {error}
        </p>
      ) : null}
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
