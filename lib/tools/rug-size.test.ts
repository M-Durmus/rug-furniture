import assert from "node:assert/strict";
import test from "node:test";
import { recommendRugSize } from "@/lib/tools/rug-size";

test("a living room keeps a 2 foot border and picks the largest stock size", () => {
  const match = recommendRugSize("living", 12, 14);
  assert.equal(match?.slug, "8x10");
  assert.equal(match?.href, "/rugs/size/8x10");
  assert.equal(recommendRugSize("living", 14, 18)?.slug, "10x14");
});

test("a dining room keeps a 3 foot border", () => {
  const match = recommendRugSize("dining", 14, 18);
  assert.equal(match?.slug, "8x10");
  assert.equal(recommendRugSize("dining", 16, 20)?.slug, "10x14");
});

test("a bedroom keeps a 1.5 foot border", () => {
  const match = recommendRugSize("bedroom", 12, 14);
  assert.equal(match?.slug, "8x10");
});

test("a room smaller than the border has no stock size", () => {
  assert.equal(recommendRugSize("dining", 5, 6), null);
});
