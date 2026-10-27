import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  createOrder,
  getAreaByCity,
  getBlogPostBySlug,
  getBlogPosts,
  getProductBySlug,
  getProducts,
  getRelatedProducts,
  getReviews,
  getServiceAreas,
  getServiceBySlug,
  getServices,
  getUnitPrice,
  getWarehouses,
  submitQuoteRequest,
  submitTradeApplication,
} from "@/lib/data/catalog";

describe("catalog", () => {
  it("loads the seeded counts", async () => {
    const rugs = await getProducts({ type: "rug" }, "title", { pageSize: 100 });
    const furniture = await getProducts({ type: "furniture" }, "title", { pageSize: 100 });
    const services = await getServices();
    const areas = await getServiceAreas();
    const reviews = await getReviews();
    const posts = await getBlogPosts();
    const warehouses = await getWarehouses();
    assert.equal(rugs.total, 40);
    assert.equal(furniture.total, 20);
    assert.equal(services.length, 4);
    assert.equal(areas.length, 12);
    assert.equal(reviews.length, 30);
    assert.equal(posts.length, 6);
    assert.equal(warehouses.length, 4);
  });

  it("filters washable rugs and prices sizes by area", async () => {
    const washable = await getProducts({ washable: true }, "title", { pageSize: 20 });
    assert.equal(washable.total, 6);
    const product = await getProductBySlug("pale-oushak-field");
    assert.ok(product);
    assert.equal(await getUnitPrice(product.id, "8x10"), 2480);
    assert.equal(await getUnitPrice(product.id, "5x7"), Math.round((2480 * (5 * 7)) / 80));
    const related = await getRelatedProducts(product.slug);
    assert.equal(related.length, 4);
    assert.equal(
      related.every((item) => item.slug !== product.slug),
      true,
    );
  });

  it("finds a service city and a blog post", async () => {
    const area = await getAreaByCity("newark");
    assert.equal(area?.state, "New Jersey");
    const cleaning = await getServiceBySlug("rug-cleaning");
    assert.equal(cleaning?.name, "Rug cleaning");
    const post = await getBlogPostBySlug("measure-a-room-in-feet-and-inches");
    assert.equal(post?.author, "Wool & Loom Studio");
    const productReviews = await getReviews({ targetType: "product", targetId: "rug-001" });
    assert.ok(productReviews.length > 0);
  });

  it("logs a quote, a trade application, and an order", async () => {
    const quote = await submitQuoteRequest({
      name: "Studio",
      email: "studio@woolandloom.com",
      city: "Newark",
      serviceSlug: "rug-cleaning",
    });
    assert.ok(quote.id);
    const application = await submitTradeApplication({
      businessName: "North Room",
      contactName: "Studio",
      email: "studio@woolandloom.com",
      phone: "201-555-0148",
      city: "Newark",
      state: "New Jersey",
    });
    assert.ok(application.id);
    const order = await createOrder({
      email: "studio@woolandloom.com",
      items: [{ productId: "rug-001", sizeLabel: "5x7", colorName: "Ivory", qty: 1 }],
    });
    assert.equal(order.shipping, 0);
    assert.equal(order.subtotal, Math.round((2480 * (5 * 7)) / 80));
    assert.equal(order.tax, Math.round(order.subtotal * 0.08 * 100) / 100);
  });
});
