export type CartItem = {
  slug: string;
  name: string;
  price: number;
  image: string;
  imageAlt: string;
  href: string;
  qty: number;
};

const key = "wool-loom-cart";

function isItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") return false;
  const item = value as CartItem;
  return typeof item.slug === "string" && typeof item.name === "string" && typeof item.price === "number" && typeof item.qty === "number";
}

export function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(key) || "[]") as unknown;
    return Array.isArray(parsed) ? parsed.filter(isItem) : [];
  } catch {
    return [];
  }
}

export function writeCart(items: CartItem[]) {
  window.localStorage.setItem(key, JSON.stringify(items));
}

export function addToCart(item: Omit<CartItem, "qty">) {
  const items = readCart();
  const existing = items.find((entry) => entry.slug === item.slug);
  if (existing) existing.qty += 1;
  else items.push({ ...item, qty: 1 });
  writeCart(items);
  return items;
}
