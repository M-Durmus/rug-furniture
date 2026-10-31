"use server";

import { productPath } from "@/lib/catalog/product-path";
import { getProducts } from "@/lib/data/catalog";
import { planGuide, type GuidePlan } from "@/lib/emmi/guide";
import type { Product } from "@/types";

export type EmmiPick = {
  title: string;
  href: string;
  image?: string;
  price: string;
  note: string;
};

export type EmmiReply = GuidePlan & { picks: EmmiPick[] };

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function prettySize(label: string): string {
  const [width, length] = label.split("x");
  return width && length ? `${width}×${length}` : label;
}

function toPick(product: Product, sizeLabel?: string): EmmiPick {
  const size = product.sizes.find((item) => item.label === sizeLabel) ?? product.sizes[0];
  const pay = product.salePrice ?? product.price;
  return {
    title: product.title,
    href: productPath(product),
    image: product.images[0],
    price: product.salePrice ? `${usd.format(pay)}` : usd.format(product.price),
    note: size ? `${prettySize(size.label)} · ${product.warehouse}` : product.warehouse,
  };
}

export async function askEmmi(message: string): Promise<EmmiReply> {
  const plan = planGuide(message);
  if (Object.keys(plan.filters).length === 0 && !plan.sale) {
    return { ...plan, picks: [] };
  }

  const page = await getProducts(plan.filters, "featured", { pageSize: 24 });
  let items = page.items;
  if (plan.sale) items = items.filter((product) => product.salePrice !== undefined);
  if (plan.sizeLabel) {
    const sized = items.filter((product) => product.sizes.some((size) => size.label === plan.sizeLabel));
    if (sized.length > 0) items = sized;
  }

  return { ...plan, picks: items.slice(0, 3).map((product) => toPick(product, plan.sizeLabel)) };
}
