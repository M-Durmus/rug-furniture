import categoriesJson from "@/data/categories.json";
import postsJson from "@/data/blog-posts.json";
import productSeedsJson from "@/data/products.json";
import reviewsJson from "@/data/reviews.json";
import areasJson from "@/data/service-areas.json";
import servicesJson from "@/data/services.json";
import warehousesJson from "@/data/warehouses.json";
import type {
  BlogPost,
  CartItem,
  Category,
  Order,
  PageQuery,
  Product,
  ProductFilters,
  ProductPage,
  ProductSort,
  QuoteRequest,
  Review,
  ReviewTarget,
  Service,
  ServiceArea,
  TradeApplication,
  Warehouse,
} from "@/types";
import { priceForSize } from "@/lib/data/price";
import type { ProductSeed } from "@/lib/data/seed";

const seeds = productSeedsJson as ProductSeed[];
const categories = categoriesJson as Category[];
const services = servicesJson as Service[];
const areas = areasJson as ServiceArea[];
const reviews = reviewsJson as Review[];
const posts = postsJson as BlogPost[];
const warehouses = warehousesJson as Warehouse[];

function sellingPrice(price: number, salePrice?: number): number {
  return salePrice ?? price;
}

export function toProduct(seed: ProductSeed): Product {
  const size =
    seed.sizes.find(
      (item) => item.widthFt === seed.referenceWidthFt && item.lengthFt === seed.referenceLengthFt,
    ) ?? seed.sizes[0];
  if (!size) throw new Error(`Product ${seed.slug} has no sizes`);
  const price = priceForSize(
    seed.basePrice,
    size.widthFt,
    size.lengthFt,
    seed.referenceWidthFt,
    seed.referenceLengthFt,
  );
  const salePrice = seed.saleOff ? Math.round(price * (1 - seed.saleOff)) : undefined;
  return {
    id: seed.id,
    slug: seed.slug,
    title: seed.title,
    type: seed.type,
    category: seed.category,
    brand: seed.brand,
    description: seed.description,
    price,
    salePrice,
    images: seed.images,
    colors: seed.colors,
    sizes: seed.sizes,
    material: seed.material,
    origin: seed.origin,
    pile: seed.pile,
    style: seed.style,
    room: seed.room,
    washable: seed.washable,
    warehouse: seed.warehouse,
    stock: seed.stock,
    deliveryDays: seed.deliveryDays,
    rating: seed.rating,
    reviewCount: seed.reviewCount,
    tags: seed.tags,
    seoTitle: seed.seoTitle,
    seoDescription: seed.seoDescription,
  };
}

const products = seeds.map(toProduct);

function unitPriceFor(seed: ProductSeed, sizeLabel: string): number | undefined {
  const size = seed.sizes.find((item) => item.label === sizeLabel);
  if (!size) return undefined;
  const price = priceForSize(
    seed.basePrice,
    size.widthFt,
    size.lengthFt,
    seed.referenceWidthFt,
    seed.referenceLengthFt,
  );
  return seed.saleOff ? Math.round(price * (1 - seed.saleOff)) : price;
}

export async function getUnitPrice(
  productId: string,
  sizeLabel: string,
): Promise<number | undefined> {
  const seed = seeds.find((item) => item.id === productId);
  if (!seed) return undefined;
  return unitPriceFor(seed, sizeLabel);
}

function matches(product: Product, filters: ProductFilters): boolean {
  const pay = sellingPrice(product.price, product.salePrice);
  if (filters.type && product.type !== filters.type) return false;
  if (filters.category && product.category !== filters.category) return false;
  if (filters.warehouse && product.warehouse !== filters.warehouse) return false;
  if (filters.washable !== undefined && product.washable !== filters.washable) return false;
  if (filters.style && product.style.toLowerCase() !== filters.style.toLowerCase()) return false;
  if (
    filters.room &&
    !product.room.some((room) => room.toLowerCase() === filters.room!.toLowerCase())
  ) {
    return false;
  }
  if (
    filters.color &&
    !product.colors.some((color) => color.name.toLowerCase() === filters.color!.toLowerCase())
  ) {
    return false;
  }
  if (filters.minPrice !== undefined && pay < filters.minPrice) return false;
  if (filters.maxPrice !== undefined && pay > filters.maxPrice) return false;
  if (filters.query) {
    const needle = filters.query.trim().toLowerCase();
    const haystack = [
      product.title,
      product.description,
      product.style,
      product.category,
      ...product.tags,
    ]
      .join(" ")
      .toLowerCase();
    if (!haystack.includes(needle)) return false;
  }
  return true;
}

function compare(sort: ProductSort) {
  return (a: Product, b: Product) => {
    if (sort === "price-asc")
      return sellingPrice(a.price, a.salePrice) - sellingPrice(b.price, b.salePrice);
    if (sort === "price-desc")
      return sellingPrice(b.price, b.salePrice) - sellingPrice(a.price, a.salePrice);
    if (sort === "rating") return b.rating - a.rating || b.reviewCount - a.reviewCount;
    if (sort === "title") return a.title.localeCompare(b.title);
    return b.rating * b.reviewCount - a.rating * a.reviewCount;
  };
}

export async function getProducts(
  filters: ProductFilters = {},
  sort: ProductSort = "featured",
  pageQuery: PageQuery = {},
): Promise<ProductPage> {
  const pageSize = Math.max(1, pageQuery.pageSize ?? 12);
  const filtered = products.filter((product) => matches(product, filters)).sort(compare(sort));
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const page = Math.min(Math.max(1, pageQuery.page ?? 1), pageCount);
  const start = (page - 1) * pageSize;
  return {
    items: filtered.slice(start, start + pageSize),
    total: filtered.length,
    page,
    pageSize,
    pageCount,
  };
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return products.find((product) => product.slug === slug);
}

export async function getRelatedProducts(slug: string, limit = 4): Promise<Product[]> {
  const current = products.find((product) => product.slug === slug);
  if (!current) return [];
  const sameCategory = products.filter(
    (product) => product.slug !== slug && product.category === current.category,
  );
  const sameType = products.filter(
    (product) =>
      product.slug !== slug &&
      product.type === current.type &&
      product.category !== current.category,
  );
  return [...sameCategory, ...sameType].slice(0, limit);
}

export async function getCategories(): Promise<Category[]> {
  return categories;
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  return categories.find((category) => category.slug === slug);
}

export async function getServices(): Promise<Service[]> {
  return services;
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  return services.find((service) => service.slug === slug);
}

export async function getServiceAreas(): Promise<ServiceArea[]> {
  return areas;
}

export async function getAreaByCity(citySlug: string): Promise<ServiceArea | undefined> {
  return areas.find((area) => area.cities.some((city) => city.slug === citySlug));
}

export async function getReviews(target?: {
  targetType?: ReviewTarget;
  targetId?: string;
}): Promise<Review[]> {
  return reviews.filter((review) => {
    if (target?.targetType && review.targetType !== target.targetType) return false;
    if (target?.targetId && review.targetId !== target.targetId) return false;
    return true;
  });
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return posts.find((post) => post.slug === slug);
}

export async function getWarehouses(): Promise<Warehouse[]> {
  return warehouses;
}

export async function submitQuoteRequest(
  input: Omit<QuoteRequest, "id" | "createdAt">,
): Promise<QuoteRequest> {
  const request: QuoteRequest = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  console.info("[wool-loom] quote request", request.id, request.serviceSlug);
  return request;
}

export async function submitTradeApplication(
  input: Omit<TradeApplication, "id" | "createdAt">,
): Promise<TradeApplication> {
  const application: TradeApplication = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  console.info("[wool-loom] trade application", application.id);
  return application;
}

export async function createOrder(input: { email: string; items: CartItem[] }): Promise<Order> {
  let subtotal = 0;
  for (const item of input.items) {
    const unit = await getUnitPrice(item.productId, item.sizeLabel);
    if (unit === undefined) throw new Error(`Unknown item ${item.productId} ${item.sizeLabel}`);
    subtotal += unit * item.qty;
  }
  subtotal = Math.round(subtotal * 100) / 100;
  const shipping = 0;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const order: Order = {
    id: crypto.randomUUID(),
    email: input.email,
    items: input.items,
    subtotal,
    shipping,
    tax,
    total: Math.round((subtotal + shipping + tax) * 100) / 100,
    createdAt: new Date().toISOString(),
  };
  console.info("[wool-loom] order", order.id, order.total);
  return order;
}
