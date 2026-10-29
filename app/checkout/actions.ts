"use server";

import { createOrder, getProducts, getUnitPrice } from "@/lib/data/catalog";
import { checkoutSchema, type CheckoutInput } from "@/lib/checkout/schema";
import { couponError } from "@/lib/checkout/coupon";
import type { CartItem } from "@/types";

export type OrderReceipt = {
  id: string;
  email: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  lines: { title: string; sizeLabel: string; colorName: string; qty: number; total: number }[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
};

export async function placeOrder(
  input: CheckoutInput & { items: CartItem[] },
): Promise<{ receipt: OrderReceipt } | { errors: Record<string, string> }> {
  const parsed = checkoutSchema.safeParse(input);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!errors[key]) errors[key] = issue.message;
    }
    return { errors };
  }
  const codeError = couponError(parsed.data.coupon);
  if (codeError) return { errors: { coupon: codeError } };
  if (input.items.length === 0) return { errors: { form: "Your cart is empty." } };

  try {
    const order = await createOrder({
      email: parsed.data.email,
      items: input.items,
      coupon: parsed.data.coupon,
    });
    const catalog = await getProducts({}, "title", { pageSize: 200 });
    const byId = new Map(catalog.items.map((product) => [product.id, product]));
    const lines = [];
    for (const item of order.items) {
      const product = byId.get(item.productId);
      const unit = (await getUnitPrice(item.productId, item.sizeLabel)) ?? 0;
      lines.push({
        title: product?.title ?? "Saved piece",
        sizeLabel: item.sizeLabel,
        colorName: item.colorName,
        qty: item.qty,
        total: Math.round(unit * item.qty * 100) / 100,
      });
    }
    return {
      receipt: {
        id: order.id,
        email: parsed.data.email,
        name: parsed.data.name,
        address: parsed.data.address,
        city: parsed.data.city,
        state: parsed.data.state,
        zip: parsed.data.zip,
        lines,
        subtotal: order.subtotal,
        discount: order.discount,
        shipping: order.shipping,
        tax: order.tax,
        total: order.total,
      },
    };
  } catch {
    return {
      errors: { form: "A piece in the cart could not be priced. Remove it and try again." },
    };
  }
}
