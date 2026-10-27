import {
  createOrder,
  getAreaByCity,
  getBlogPosts,
  getCategories,
  getProductBySlug,
  getProducts,
  getReviews,
  getServiceAreas,
  getServices,
  getUnitPrice,
  getWarehouses,
  submitQuoteRequest,
} from "@/lib/data/catalog";

async function main() {
  const rugs = await getProducts({ type: "rug" }, "title", { pageSize: 100 });
  const furniture = await getProducts({ type: "furniture" }, "title", { pageSize: 100 });
  const washable = await getProducts({ type: "rug", washable: true }, "title", { pageSize: 100 });
  const services = await getServices();
  const areas = await getServiceAreas();
  const reviews = await getReviews();
  const posts = await getBlogPosts();
  const warehouses = await getWarehouses();
  const categories = await getCategories();

  console.log(`rugs ${rugs.total}`);
  console.log(`furniture ${furniture.total}`);
  console.log(`services ${services.length}`);
  console.log(`service areas ${areas.length}`);
  console.log(`reviews ${reviews.length}`);
  console.log(`blog posts ${posts.length}`);
  console.log(`warehouses ${warehouses.length}`);
  console.log(`categories ${categories.length}`);
  console.log(`washable ${washable.total}`);

  const sample = await getProductBySlug("pale-oushak-field");
  const eight = sample ? await getUnitPrice(sample.id, "8x10") : undefined;
  const five = sample ? await getUnitPrice(sample.id, "5x7") : undefined;
  console.log(`pale oushak 8x10 ${eight} 5x7 ${five}`);

  const newark = await getAreaByCity("newark");
  console.log(`newark ${newark?.state ?? "missing"}`);

  const quote = await submitQuoteRequest({
    name: "Studio",
    email: "studio@woolandloom.com",
    city: "Newark",
    serviceSlug: "rug-cleaning",
    widthFt: 8,
    lengthFt: 10,
  });
  console.log(`quote ${quote.id}`);

  if (sample) {
    const order = await createOrder({
      email: "studio@woolandloom.com",
      items: [{ productId: sample.id, sizeLabel: "8x10", colorName: "Ivory", qty: 1 }],
    });
    console.log(`order ${order.total}`);
  }
}

void main();
