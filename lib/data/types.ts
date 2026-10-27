export type WarehouseId = "nj" | "ga" | "tx" | "ca";

export type Review = {
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  kind: "rug" | "furniture";
  price: number;
  sku: string;
  image: string;
  imageAlt: string;
  width: number;
  height: number;
  description: string;
  details: string[];
  sizeLabel: string;
  sizeSlug?: string;
  style: string;
  styleSlug?: string;
  color: string;
  colorSlug?: string;
  material: string;
  origin: string;
  dimensions: string;
  warehouseId: WarehouseId;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  added: string;
  featuredRank: number;
  serviceSlugs: string[];
  href: string;
};

export type Facet = {
  slug: string;
  name: string;
  label: string;
  title: string;
  description: string;
  intro: string;
};

export type Warehouse = {
  id: WarehouseId;
  name: string;
  street: string;
  city: string;
  state: string;
  region: string;
  postalCode: string;
  phone: string;
};

export type Service = {
  slug: string;
  name: string;
  serviceType: string;
  summary: string;
  description: string;
  image: string;
  imageAlt: string;
  steps: { name: string; text: string }[];
  faqs: { question: string; answer: string }[];
};

export type City = {
  slug: string;
  name: string;
  state: string;
  warehouseId: WarehouseId;
  nearby: string[];
  note: string;
};

export type Post = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  updated: string;
  productSlugs: string[];
  sections: { heading: string; paragraphs: string[] }[];
};

export type Guide = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  totalTime: string;
  tools: string[];
  productSlugs: string[];
  intro: string[];
  steps: { name: string; text: string }[];
};

export type Faq = { question: string; answer: string };

export type NavLink = { href: string; label: string };
