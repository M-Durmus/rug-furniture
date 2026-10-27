import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { money } from "@/lib/data/price";
import type { CartItem, CartTotals } from "@/types";

export const CART_STORAGE_KEY = "wool-loom-catalog-cart";

const memory = new Map<string, string>();

const cartStorage = createJSONStorage(() => ({
  getItem: (name) => {
    if (typeof window === "undefined") return memory.get(name) ?? null;
    return window.localStorage.getItem(name);
  },
  setItem: (name, value) => {
    if (typeof window === "undefined") memory.set(name, value);
    else window.localStorage.setItem(name, value);
  },
  removeItem: (name) => {
    if (typeof window === "undefined") memory.delete(name);
    else window.localStorage.removeItem(name);
  },
}));

export function lineKey(item: Pick<CartItem, "productId" | "sizeLabel" | "colorName">): string {
  return `${item.productId}::${item.sizeLabel}::${item.colorName}`;
}

type CartState = {
  items: CartItem[];
  unitPrices: Record<string, number>;
  hydrated: boolean;
  add: (item: CartItem, unitPrice: number) => void;
  remove: (item: Pick<CartItem, "productId" | "sizeLabel" | "colorName">) => void;
  setQty: (item: Pick<CartItem, "productId" | "sizeLabel" | "colorName">, qty: number) => void;
  clear: () => void;
  totals: () => CartTotals;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      unitPrices: {},
      hydrated: false,
      add: (item, unitPrice) => {
        const key = lineKey(item);
        set((state) => {
          const existing = state.items.find((line) => lineKey(line) === key);
          const items = existing
            ? state.items.map((line) =>
                lineKey(line) === key ? { ...line, qty: line.qty + item.qty } : line,
              )
            : [...state.items, { ...item }];
          return { items, unitPrices: { ...state.unitPrices, [key]: unitPrice } };
        });
      },
      remove: (item) => {
        const key = lineKey(item);
        set((state) => {
          const unitPrices = { ...state.unitPrices };
          delete unitPrices[key];
          return { items: state.items.filter((line) => lineKey(line) !== key), unitPrices };
        });
      },
      setQty: (item, qty) => {
        if (qty <= 0) {
          get().remove(item);
          return;
        }
        const key = lineKey(item);
        set((state) => ({
          items: state.items.map((line) => (lineKey(line) === key ? { ...line, qty } : line)),
        }));
      },
      clear: () => set({ items: [], unitPrices: {} }),
      totals: () => {
        const state = get();
        const subtotal = money(
          state.items.reduce(
            (sum, line) => sum + (state.unitPrices[lineKey(line)] ?? 0) * line.qty,
            0,
          ),
        );
        const shipping = 0;
        const tax = money(subtotal * 0.08);
        return { subtotal, shipping, tax, total: money(subtotal + shipping + tax) };
      },
    }),
    {
      name: CART_STORAGE_KEY,
      storage: cartStorage,
      skipHydration: true,
      partialize: (state) => ({ items: state.items, unitPrices: state.unitPrices }),
      onRehydrateStorage: () => () => {
        useCartStore.setState({ hydrated: true });
      },
    },
  ),
);

export function hydrateCart(): void {
  if (typeof window === "undefined") return;
  void useCartStore.persist.rehydrate();
}
