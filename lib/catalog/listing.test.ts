import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { resolveListing } from "@/lib/catalog/listing";

describe("catalog listing urls", () => {
  it("keeps the clean rugs page indexable", async () => {
    const result = await resolveListing({ section: "rugs", kind: "index", searchParams: {} });
    assert.equal(result.type, "ok");
    if (result.type !== "ok") return;
    assert.equal(result.index, true);
    assert.equal(result.canonicalPath, "/rugs");
    assert.equal(result.total, 40);
    assert.equal(result.products.length, 24);
    assert.equal(result.pageCount, 2);
    assert.equal(result.nextHref, "/rugs?page=2");
  });

  it("noindexes page 2 and points canonical at the clean path", async () => {
    const result = await resolveListing({
      section: "rugs",
      kind: "index",
      searchParams: { page: "2" },
    });
    assert.equal(result.type, "ok");
    if (result.type !== "ok") return;
    assert.equal(result.index, false);
    assert.equal(result.canonicalPath, "/rugs");
    assert.equal(result.prevHref, "/rugs");
    assert.equal(result.products.length, 16);
  });

  it("noindexes a non-default sort", async () => {
    const result = await resolveListing({
      section: "rugs",
      kind: "index",
      searchParams: { sort: "newest" },
    });
    assert.equal(result.type, "ok");
    if (result.type !== "ok") return;
    assert.equal(result.index, false);
    assert.equal(result.canonicalPath, "/rugs");
    assert.equal(result.products[0]?.product.id, "rug-040");
  });

  it("redirects one size query to the size landing", async () => {
    const result = await resolveListing({
      section: "rugs",
      kind: "index",
      searchParams: { size: "8x10" },
    });
    assert.deepEqual(result, { type: "redirect", path: "/rugs/size/8x10" });
  });

  it("indexes a size landing and noindexes a second filter", async () => {
    const clean = await resolveListing({
      section: "rugs",
      kind: "size",
      slug: "8x10",
      searchParams: {},
    });
    assert.equal(clean.type, "ok");
    if (clean.type !== "ok") return;
    assert.equal(clean.index, true);
    assert.equal(clean.canonicalPath, "/rugs/size/8x10");
    assert.ok(clean.total > 0);

    const filtered = await resolveListing({
      section: "rugs",
      kind: "size",
      slug: "8x10",
      searchParams: { color: "ivory" },
    });
    assert.equal(filtered.type, "ok");
    if (filtered.type !== "ok") return;
    assert.equal(filtered.index, false);
    assert.equal(filtered.canonicalPath, "/rugs/size/8x10");
  });

  it("indexes one material filter and noindexes two filters", async () => {
    const one = await resolveListing({
      section: "rugs",
      kind: "index",
      searchParams: { material: "hand-knotted-wool" },
    });
    assert.equal(one.type, "ok");
    if (one.type !== "ok") return;
    assert.equal(one.index, true);
    assert.equal(one.canonicalPath, "/rugs?material=hand-knotted-wool");

    const messy = await resolveListing({
      section: "rugs",
      kind: "index",
      searchParams: { material: "hand-knotted-wool", color: "ivory" },
    });
    assert.deepEqual(messy, {
      type: "redirect",
      path: "/rugs?color=ivory&material=hand-knotted-wool",
    });
    const two = await resolveListing({
      section: "rugs",
      kind: "index",
      searchParams: { color: "ivory", material: "hand-knotted-wool" },
    });
    assert.equal(two.type, "ok");
    if (two.type !== "ok") return;
    assert.equal(two.index, false);
    assert.equal(two.canonicalPath, "/rugs");
  });

  it("strips page 1 and the featured sort", async () => {
    const result = await resolveListing({
      section: "rugs",
      kind: "index",
      searchParams: { page: "1", sort: "featured" },
    });
    assert.deepEqual(result, { type: "redirect", path: "/rugs" });
  });

  it("404s a page past the end and an unknown size", async () => {
    const page = await resolveListing({
      section: "rugs",
      kind: "index",
      searchParams: { page: "9" },
    });
    assert.equal(page.type, "notFound");
    const size = await resolveListing({
      section: "rugs",
      kind: "size",
      slug: "not-a-size",
      searchParams: {},
    });
    assert.equal(size.type, "notFound");
  });

  it("resolves style, color, room, and category landings", async () => {
    const style = await resolveListing({
      section: "rugs",
      kind: "style",
      slug: "oushak",
      searchParams: {},
    });
    const color = await resolveListing({
      section: "rugs",
      kind: "color",
      slug: "blue",
      searchParams: {},
    });
    const room = await resolveListing({
      section: "rugs",
      kind: "room",
      slug: "living-room",
      searchParams: {},
    });
    const sofas = await resolveListing({
      section: "furniture",
      kind: "category",
      slug: "sofas",
      searchParams: {},
    });
    for (const result of [style, color, room, sofas]) {
      assert.equal(result.type, "ok");
      if (result.type !== "ok") continue;
      assert.equal(result.index, true);
      assert.ok(result.total > 0);
      assert.ok(result.faq.length > 0);
    }
  });
});
