"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { addToCart } from "@/components/cart/storage";

const RoomPreview = dynamic(() => import("@/components/product/RoomPreview"), { ssr: false });
const QuoteModal = dynamic(() => import("@/components/ui/QuoteModal"), { ssr: false });

export function ProductActions({
  slug,
  name,
  price,
  image,
  imageAlt,
  href,
  inStock,
}: {
  slug: string;
  name: string;
  price: number;
  image: string;
  imageAlt: string;
  href: string;
  inStock: boolean;
}) {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState(false);
  const [quote, setQuote] = useState(false);

  return (
    <div className="mt-6 flex flex-col items-start gap-3">
      <button
        type="button"
        className="inline-flex min-h-12 items-center justify-center rounded-[2px] bg-inverse px-5 text-inverse-foreground disabled:opacity-50"
        disabled={!inStock}
        onClick={() => {
          addToCart({ slug, name, price, image, imageAlt, href });
          setMessage("Added to cart. Payment is not taken on this site yet.");
        }}
      >
        {inStock ? "Add to cart" : "Sold out"}
      </button>
      <button type="button" className="inline-flex min-h-12 items-center justify-center rounded-[2px] border border-line px-5" onClick={() => setRoom(true)}>
        View in a room
      </button>
      <button type="button" className="inline-flex min-h-12 items-center justify-center rounded-[2px] border border-line px-5" onClick={() => setQuote(true)}>
        Ask about care
      </button>
      <p className="min-h-6 text-sm" role="status">
        {message}
      </p>
      {room ? <RoomPreview name={name} image={image} alt={imageAlt} onClose={() => setRoom(false)} /> : null}
      {quote ? <QuoteModal intent={`care-${slug}`} onClose={() => setQuote(false)} /> : null}
    </div>
  );
}
