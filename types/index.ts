export type ThemeChoice = "system" | "light" | "dark";

export type LogoVariant = "full" | "mark" | "light-on-dark";

export type WarehouseName = "New Jersey" | "Georgia" | "Texas" | "California";

export type ProductType = "rug" | "furniture";

export type ProductColor = { name: string; hex: string };

export type ProductSize = { label: string; widthFt: number; lengthFt: number };

export type Faq = { question: string; answer: string };

export type Product = {
  id: string;
  slug: string;
  title: string;
  type: ProductType;
  category: string;
  brand: string;
  description: string;
  price: number;
  salePrice?: number;
  images: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  material: string;
  origin: string;
  pile: string;
  style: string;
  room: string[];
  washable: boolean;
  warehouse: WarehouseName;
  stock: number;
  deliveryDays: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  type: ProductType;
  parentSlug?: string;
  intro: string;
  seoText: string;
  faq: Faq[];
  heroImage: string;
};

export type ServiceStep = { title: string; text: string };

export type Service = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  includes: string[];
  process: ServiceStep[];
  faq: Faq[];
  image: string;
};

export type ServiceCity = { name: string; slug: string; zipCodes: string[] };

export type ServiceArea = {
  state: string;
  stateSlug: string;
  cities: ServiceCity[];
};

export type ReviewTarget = "product" | "service";

export type Review = {
  id: string;
  targetType: ReviewTarget;
  targetId: string;
  author: string;
  city: string;
  rating: number;
  title: string;
  body: string;
  date: string;
};

export type BlogSection = { heading: string; paragraphs: string[] };

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  readMinutes: number;
  publishedAt: string;
  category: string;
  sections: BlogSection[];
  relatedProductSlugs: string[];
  relatedServiceSlug: string;
};

export type Warehouse = {
  name: WarehouseName;
  state: string;
  rugCount: number;
  deliveryDays: string;
};

export type TradeApplication = {
  id: string;
  businessName: string;
  contactName?: string;
  email: string;
  phone: string;
  city?: string;
  state?: string;
  website?: string;
  role?: string;
  projectTypes?: string;
  resaleCertificate?: string;
  notes?: string;
  createdAt: string;
};

export type QuoteRequest = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  city: string;
  serviceSlug: string;
  widthFt?: number;
  lengthFt?: number;
  notes?: string;
  createdAt: string;
};

export type CartItem = {
  productId: string;
  sizeLabel: string;
  colorName: string;
  qty: number;
};

export type Order = {
  id: string;
  email: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  createdAt: string;
};

export type ProductFilters = {
  type?: ProductType;
  category?: string;
  warehouse?: WarehouseName;
  washable?: boolean;
  style?: string;
  room?: string;
  color?: string;
  minPrice?: number;
  maxPrice?: number;
  query?: string;
};

export type ProductSort = "featured" | "newest" | "price-asc" | "price-desc" | "rating" | "title";

export type PageQuery = { page?: number; pageSize?: number };

export type ProductPage = {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
};

export type CartTotals = {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
};
