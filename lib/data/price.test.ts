import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { priceForSize } from "@/lib/data/price";

describe("priceForSize", () => {
  it("keeps the reference size at the base price", () => {
    assert.equal(priceForSize(1000, 8, 10, 8, 10), 1000);
  });

  it("scales a 5 by 7 from an 8 by 10 base", () => {
    assert.equal(priceForSize(1000, 5, 7), 438);
  });

  it("scales a 2 by 3 from an 8 by 10 base", () => {
    assert.equal(priceForSize(1000, 2, 3), 75);
  });
});
