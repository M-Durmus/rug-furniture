"use client";

import { useState } from "react";
import Link from "next/link";
import { ProductGallery, type GallerySlide } from "@/components/product/ProductGallery";
import { openCartDrawer } from "@/components/layout/open-cart";
import type { FurnitureKind } from "@/components/media/FurnitureArt";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";
import { useToast } from "@/components/ui/Toast";
import { lineKey, useCartStore } from "@/lib/cart/store";
import { feetLabel } from "@/components/home/ProductCard";
import type { Product } from "@/types";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export type SizeQuote = {
  label: string;
  widthFt: number;
  lengthFt: number;
  list: number;
  pay: number;
};

const rooms = [
  ["Entry", "3 × 5", "Inside the door, clear of the swing."],
  ["Hallway", "2 × 8 or 2 × 10", "About 3 inches of bare floor on each long side."],
  ["Bedroom", "8 × 10", "Under the lower two thirds of the bed, or a 5 × 8 beside it."],
  ["Living room", "8 × 10 or 9 × 12", "Front legs of a 7-foot sofa sit on an 8 × 10."],
  ["Dining room", "8 × 10 or 9 × 12", "The table, plus the chairs pulled out."],
  ["Office", "5 × 7 or 6 × 9", "Under the desk and the chair."],
];

function furnitureKind(category: string): FurnitureKind {
  if (category === "coffee-tables") return "table";
  if (category === "accent-chairs") return "chair";
  if (category === "side-tables") return "side";
  return "sofa";
}

function slidesFor(product: Product): GallerySlide[] {
  if (product.images.length > 0) {
    return product.images.map((src, index) => ({
      key: src,
      alt: `${product.title}, photo ${index + 1}`,
      src,
      colors: product.colors.map((color) => color.hex),
    }));
  }
  if (product.colors.length === 0) {
    return [{ key: "art", alt: product.title, colors: [] }];
  }
  return product.colors.map((color, index) => ({
    key: color.name,
    alt: `${product.title} in ${color.name}`,
    colors: [
      color.hex,
      ...product.colors.filter((_, colorIndex) => colorIndex !== index).map((item) => item.hex),
    ],
  }));
}

function Stars({ value }: { value: number }) {
  const filled = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <span className="text-accent" aria-hidden="true">
      {"★".repeat(filled)}
      {"☆".repeat(5 - filled)}
    </span>
  );
}

export function ProductStage({
  product,
  quotes,
  initialSize,
}: {
  product: Product;
  quotes: SizeQuote[];
  initialSize: string;
}) {
  const slides = slidesFor(product);
  const [colorIndex, setColorIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [sizeLabel, setSizeLabel] = useState(initialSize);
  const [qty, setQty] = useState(1);
  const [guideOpen, setGuideOpen] = useState(false);
  const [swatchOpen, setSwatchOpen] = useState(false);
  const [swatchSent, setSwatchSent] = useState(false);
  const [swatchErrors, setSwatchErrors] = useState<Record<string, string>>({});
  const add = useCartStore((state) => state.add);
  const toast = useToast();
  const quote = quotes.find((item) => item.label === sizeLabel) ?? quotes[0];
  const color = product.colors[colorIndex] ?? product.colors[0];
  const inStock = product.stock > 0;
  const rug = product.type === "rug";

  function selectColor(index: number) {
    setColorIndex(index);
    if (product.images.length === 0) setSlideIndex(index);
  }

  function addToCart() {
    if (!inStock || !quote || !color) return;
    const line = { productId: product.id, sizeLabel: quote.label, colorName: color.name };
    const existing = useCartStore.getState().items.find((item) => lineKey(item) === lineKey(line));
    const nextQty = (existing?.qty ?? 0) + qty;
    if (nextQty > product.stock) {
      toast(`Only ${product.stock} in stock at ${product.warehouse}.`);
      return;
    }
    add({ ...line, qty }, quote.pay);
    toast(`Added ${product.title} to the cart`);
    openCartDrawer();
  }

  function submitSwatch(formData: FormData) {
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const street = String(formData.get("street") ?? "").trim();
    const city = String(formData.get("city") ?? "").trim();
    const state = String(formData.get("state") ?? "").trim();
    const zip = String(formData.get("zip") ?? "").trim();
    const errors: Record<string, string> = {};
    if (name.length < 2) errors.name = "Enter the name for the parcel.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email.";
    if (street.length < 4) errors.street = "Enter a street address.";
    if (city.length < 2) errors.city = "Enter a city.";
    if (!/^[A-Za-z]{2}$/.test(state)) errors.state = "Use the two-letter state code.";
    if (!/^\d{5}$/.test(zip)) errors.zip = "Enter a 5-digit ZIP code.";
    setSwatchErrors(errors);
    if (Object.keys(errors).length === 0) setSwatchSent(true);
  }

  return (
    <>
      <div className="mt-8 grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
        <ProductGallery
          subject={product.type}
          furniture={furnitureKind(product.category)}
          style={product.style}
          slides={slides}
          index={slideIndex}
          onIndex={(index) => {
            setSlideIndex(index);
            if (product.images.length === 0 && product.colors.length > 0) {
              setColorIndex(Math.min(index, product.colors.length - 1));
            }
          }}
        />
        <div>
          <h1 className="text-h1">{product.title}</h1>
          <p className="mt-3">
            <a
              href="#reviews"
              className="inline-flex items-center gap-2 underline-offset-4 hover:underline"
            >
              <Stars value={product.rating} />
              <span className="sr-only">
                {product.rating.toFixed(1)} out of 5, {product.reviewCount}{" "}
                {product.reviewCount === 1 ? "review" : "reviews"}
              </span>
              <span aria-hidden="true">
                {product.rating.toFixed(1)} ({product.reviewCount}{" "}
                {product.reviewCount === 1 ? "review" : "reviews"})
              </span>
            </a>
          </p>
          {quote ? (
            <p className="mt-4 font-serif text-h3">
              {usd.format(quote.pay)}
              {quote.list !== quote.pay ? (
                <s className="ml-3 text-base font-sans text-mute">{usd.format(quote.list)}</s>
              ) : null}
            </p>
          ) : null}
          <p className={inStock ? "mt-2 text-success" : "mt-2 text-mute"}>
            {inStock
              ? `In stock, ships from ${product.warehouse} in ${product.deliveryDays} business days.`
              : `Out of stock at the ${product.warehouse} warehouse.`}
          </p>

          {product.colors.length > 0 && color ? (
            <fieldset className="mt-6">
              <legend className="text-sm font-medium">Color: {color.name}</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.colors.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    aria-label={item.name}
                    aria-pressed={index === colorIndex}
                    onClick={() => selectColor(index)}
                    className="h-8 w-8 rounded-[2px] border-2"
                    style={{
                      backgroundColor: item.hex,
                      borderColor: index === colorIndex ? "var(--ink)" : "var(--line)",
                    }}
                  />
                ))}
              </div>
            </fieldset>
          ) : null}

          {quotes.length > 1 ? (
            <div className="mt-6">
              <div className="flex items-baseline justify-between gap-3">
                <label htmlFor="product-size" className="text-sm font-medium">
                  Size
                </label>
                {rug ? (
                  <button
                    type="button"
                    className="text-sm underline underline-offset-4"
                    onClick={() => setGuideOpen(true)}
                  >
                    Size guide
                  </button>
                ) : null}
              </div>
              <Select
                id="product-size"
                className="mt-2"
                value={quote?.label}
                onChange={(event) => setSizeLabel(event.target.value)}
              >
                {quotes.map((item) => (
                  <option key={item.label} value={item.label}>
                    {feetLabel(item)} — {usd.format(item.pay)}
                  </option>
                ))}
              </Select>
              {rug ? (
                <p className="mt-2 text-sm text-mute">
                  Larger sizes are priced by area, from the same design.
                </p>
              ) : null}
            </div>
          ) : quote ? (
            <p className="mt-6 text-sm">
              Size {feetLabel(quote)}
              {rug ? (
                <>
                  {" "}
                  <button
                    type="button"
                    className="underline underline-offset-4"
                    onClick={() => setGuideOpen(true)}
                  >
                    Size guide
                  </button>
                </>
              ) : null}
            </p>
          ) : null}

          <div className="mt-6 flex items-end gap-3">
            <div>
              <label htmlFor="product-qty" className="text-sm font-medium">
                Quantity
              </label>
              <Input
                id="product-qty"
                className="mt-2 w-20"
                type="number"
                min={1}
                max={Math.max(product.stock, 1)}
                value={qty}
                onChange={(event) => {
                  const value = Number(event.target.value);
                  if (!Number.isFinite(value)) return;
                  setQty(Math.min(Math.max(product.stock, 1), Math.max(1, Math.floor(value))));
                }}
              />
            </div>
            <Button className="flex-1" onClick={addToCart} disabled={!inStock}>
              {inStock ? "Add to cart" : "Out of stock"}
            </Button>
          </div>
          <div className="mt-3 flex flex-col gap-2">
            <Button variant="outline" className="w-full" onClick={() => setSwatchOpen(true)}>
              Order a free swatch
            </Button>
            <Button
              variant="outline"
              className="w-full"
              aria-disabled="true"
              onClick={(event) => event.preventDefault()}
            >
              Preview in your room (coming soon)
            </Button>
          </div>

          <ul className="mt-6 space-y-1 text-sm">
            <li>Free shipping in the continental United States.</li>
            <li>100-day returns on an unused piece.</li>
          </ul>

          <aside className="mt-6 border border-line bg-card p-5">
            <h2 className="font-serif text-h3">Care for it for life</h2>
            <p className="mt-2">Cleaning and repair are priced by quote.</p>
            <Link href="/services" className="mt-3 inline-flex underline underline-offset-4">
              See rug care
            </Link>
          </aside>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-card px-5 py-3 lg:hidden">
        <div className="mx-auto flex max-w-[1180px] items-center gap-3">
          {quote ? <p className="font-medium">{usd.format(quote.pay)}</p> : null}
          <Button className="ml-auto" onClick={addToCart} disabled={!inStock}>
            {inStock ? "Add to cart" : "Out of stock"}
          </Button>
        </div>
      </div>

      {guideOpen ? (
        <Modal title="Size guide" onClose={() => setGuideOpen(false)}>
          <p>Sizes are in feet. Leave a border of bare floor at the walls.</p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[32rem] text-left text-sm">
            <caption className="sr-only">Rug sizes by room</caption>
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="py-2 font-medium">
                  Room
                </th>
                <th scope="col" className="py-2 font-medium">
                  Size
                </th>
                <th scope="col" className="py-2 font-medium">
                  Placement
                </th>
              </tr>
            </thead>
            <tbody>
              {rooms.map(([room, size, placement]) => (
                <tr key={room} className="border-b border-line">
                  <th scope="row" className="py-2 font-medium">
                    {room}
                  </th>
                  <td className="py-2">{size}</td>
                  <td className="py-2">{placement}</td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </Modal>
      ) : null}

      {swatchOpen ? (
        <Modal
          title="Order a free swatch"
          onClose={() => {
            setSwatchOpen(false);
            setSwatchSent(false);
            setSwatchErrors({});
          }}
        >
          {swatchSent ? (
            <p>
              Request received. We mail the {color?.name ?? "selected"} swatch at no charge from the{" "}
              {product.warehouse} warehouse.
            </p>
          ) : (
            <form
              className="space-y-3"
              onSubmit={(event) => {
                event.preventDefault();
                submitSwatch(new FormData(event.currentTarget));
              }}
            >
              <Field label="Name" name="name" error={swatchErrors.name} autoComplete="name" />
              <Field
                label="Email"
                name="email"
                type="email"
                error={swatchErrors.email}
                autoComplete="email"
              />
              <Field
                label="Street"
                name="street"
                error={swatchErrors.street}
                autoComplete="street-address"
              />
              <Field
                label="City"
                name="city"
                error={swatchErrors.city}
                autoComplete="address-level2"
              />
              <div className="grid grid-cols-2 gap-3">
                <Field
                  label="State"
                  name="state"
                  error={swatchErrors.state}
                  autoComplete="address-level1"
                  maxLength={2}
                />
                <Field
                  label="ZIP"
                  name="zip"
                  error={swatchErrors.zip}
                  autoComplete="postal-code"
                  inputMode="numeric"
                />
              </div>
              <label className="block text-sm">
                Color
                <Select name="color" className="mt-1" defaultValue={color?.name}>
                  {product.colors.map((item) => (
                    <option key={item.name} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </Select>
              </label>
              <Button type="submit" className="w-full">
                Request the swatch
              </Button>
            </form>
          )}
        </Modal>
      ) : null}
    </>
  );
}

function Field({
  label,
  name,
  error,
  type = "text",
  autoComplete,
  maxLength,
  inputMode,
}: {
  label: string;
  name: string;
  error?: string;
  type?: string;
  autoComplete?: string;
  maxLength?: number;
  inputMode?: "numeric" | "text";
}) {
  const errorId = error ? `${name}-error` : undefined;
  return (
    <label className="block text-sm">
      {label}
      <Input
        className="mt-1"
        name={name}
        type={type}
        autoComplete={autoComplete}
        maxLength={maxLength}
        inputMode={inputMode}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
      />
      {error ? (
        <span id={errorId} className="mt-1 block text-accent">
          {error}
        </span>
      ) : null}
    </label>
  );
}
