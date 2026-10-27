"use client";

import { useToast } from "@/components/ui/Toast";
import { useCartStore } from "@/lib/cart/store";

export function QuickAdd({
  productId,
  title,
  sizeLabel,
  colorName,
  unitPrice,
  stock,
}: {
  productId: string;
  title: string;
  sizeLabel: string;
  colorName: string;
  unitPrice: number;
  stock: number;
}) {
  const add = useCartStore((state) => state.add);
  const toast = useToast();

  return (
    <button
      type="button"
      className="mt-3 inline-flex min-h-10 items-center justify-center rounded-[2px] border border-ink px-4 text-sm disabled:opacity-50"
      disabled={stock < 1}
      onClick={() => {
        add({ productId, sizeLabel, colorName, qty: 1 }, unitPrice);
        toast(`Added ${title} to the cart`);
      }}
    >
      {stock < 1 ? "Out of stock" : "Add to cart"}
    </button>
  );
}
