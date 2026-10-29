import assert from "node:assert/strict";
import test from "node:test";
import { createOrder } from "@/lib/data/catalog";
import { couponError, couponRate } from "@/lib/checkout/coupon";

test("WELCOME10 is 10 percent and other codes are rejected", () => {
  assert.equal(couponRate("welcome10"), 0.1);
  assert.equal(couponRate("SAVE20"), 0);
  assert.equal(couponError("NOPE"), "That code is not active. WELCOME10 takes 10% off.");
  assert.equal(couponError("WELCOME10"), null);
});

test("a coupon reduces the tax base", async () => {
  const plain = await createOrder({
    email: "studio@woolandloom.com",
    items: [{ productId: "rug-001", sizeLabel: "5x7", colorName: "Ivory", qty: 1 }],
  });
  const saved = await createOrder({
    email: "studio@woolandloom.com",
    items: [{ productId: "rug-001", sizeLabel: "5x7", colorName: "Ivory", qty: 1 }],
    coupon: "WELCOME10",
  });
  assert.equal(plain.discount, 0);
  assert.equal(saved.subtotal, plain.subtotal);
  assert.equal(saved.discount, Math.round(plain.subtotal * 0.1 * 100) / 100);
  const taxable = Math.round((saved.subtotal - saved.discount) * 100) / 100;
  assert.equal(saved.tax, Math.round(taxable * 0.08 * 100) / 100);
  assert.ok(saved.total < plain.total);
});
