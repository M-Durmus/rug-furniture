import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import { CART_STORAGE_KEY, useCartStore } from "@/lib/cart/store";

const line = { productId: "rug-001", sizeLabel: "8x10", colorName: "Ivory", qty: 1 };

beforeEach(() => {
  useCartStore.getState().clear();
  useCartStore.persist.clearStorage();
});

describe("cart store", () => {
  it("merges quantity for the same size and color", () => {
    useCartStore.getState().add(line, 2480);
    useCartStore.getState().add({ ...line, qty: 2 }, 2480);
    const items = useCartStore.getState().items;
    assert.equal(items.length, 1);
    assert.equal(items[0]?.qty, 3);
  });

  it("keeps a different size as its own line", () => {
    useCartStore.getState().add(line, 2480);
    useCartStore.getState().add({ ...line, sizeLabel: "5x7" }, 1085);
    assert.equal(useCartStore.getState().items.length, 2);
  });

  it("sets quantity and removes a line at zero", () => {
    useCartStore.getState().add(line, 110);
    useCartStore.getState().setQty(line, 4);
    assert.equal(useCartStore.getState().items[0]?.qty, 4);
    useCartStore.getState().setQty(line, 0);
    assert.equal(useCartStore.getState().items.length, 0);
  });

  it("removes one line and clears the cart", () => {
    useCartStore.getState().add(line, 100);
    useCartStore.getState().add({ ...line, colorName: "Sage" }, 100);
    useCartStore.getState().remove(line);
    assert.equal(useCartStore.getState().items.length, 1);
    useCartStore.getState().clear();
    assert.deepEqual(useCartStore.getState().items, []);
    assert.equal(useCartStore.getState().totals().total, 0);
  });

  it("charges 8 percent tax and no shipping", () => {
    useCartStore.getState().add({ ...line, qty: 1 }, 110);
    const totals = useCartStore.getState().totals();
    assert.equal(totals.subtotal, 110);
    assert.equal(totals.shipping, 0);
    assert.equal(totals.tax, 8.8);
    assert.equal(totals.total, 118.8);
  });

  it("rounds tax to cents", () => {
    useCartStore.getState().add({ ...line, qty: 2 }, 10.1);
    const totals = useCartStore.getState().totals();
    assert.equal(totals.subtotal, 20.2);
    assert.equal(totals.tax, 1.62);
    assert.equal(totals.total, 21.82);
  });

  it("rehydrates from storage without touching window", async () => {
    useCartStore.getState().add(line, 100);
    const saved = await useCartStore.persist.getOptions().storage?.getItem(CART_STORAGE_KEY);
    useCartStore.setState({ items: [], unitPrices: {} });
    if (saved) await useCartStore.persist.getOptions().storage?.setItem(CART_STORAGE_KEY, saved);
    await useCartStore.persist.rehydrate();
    assert.equal(useCartStore.getState().items[0]?.qty, 1);
    assert.equal(useCartStore.getState().hydrated, true);
    assert.equal(useCartStore.getState().totals().subtotal, 100);
  });
});
