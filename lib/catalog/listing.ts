import { productPath } from "@/lib/catalog/product-path";
import { colors, getColor, getSize, getStyle, sizes, styles } from "@/lib/data/facets";
import { getCategories, getProducts, getUnitPrice } from "@/lib/data/catalog";
import type { Category, Product, ProductSize } from "@/types";

/**
 * Listing URL rules
 * -----------------
 * Indexable: the clean path, or a root page with exactly one query filter
 * that has no landing of its own (material, price, warehouse, washable, stock).
 * A single size, style, color, or room on /rugs redirects to its landing.
 * Noindex, follow, canonical is the clean path:
 * - sort other than featured
 * - page after the first
 * - more than one dimension (the landing plus a query filter, or two query filters)
 * rel prev/next still point at the neighboring pages of the same query.
 */

export const LISTING_PAGE_SIZE = 24;

export const SORTS = [
  { key: "featured", label: "Featured" },
  { key: "newest", label: "Newest" },
  { key: "price-asc", label: "Price low to high" },
  { key: "price-desc", label: "Price high to low" },
  { key: "rating", label: "Best rated" },
] as const;

export type SortKey = (typeof SORTS)[number]["key"];
export type RawSearchParams = Record<string, string | string[] | undefined>;
export type ListingSection = "rugs" | "furniture";
export type ListingKind = "index" | "category" | "size" | "style" | "color" | "room";

export type ListingRequest = {
  section: ListingSection;
  kind: ListingKind;
  slug?: string;
  searchParams: RawSearchParams;
};

export type FacetOption = {
  slug: string;
  label: string;
  href: string;
  active: boolean;
  count: number;
  hex?: string;
};

export type ListingModel = {
  type: "ok";
  title: string;
  description: string;
  intro: string;
  seoText: string;
  faq: { question: string; answer: string }[];
  crumbs: { name: string; path: string }[];
  chips: { label: string; href: string; current: boolean }[];
  groups: {
    sizes: FacetOption[];
    colors: FacetOption[];
    styles: FacetOption[];
    materials: FacetOption[];
    rooms: FacetOption[];
    warehouses: FacetOption[];
  };
  washable: { href: string; active: boolean };
  stock: { href: string; active: boolean };
  price: { action: string; min: string; max: string; hidden: { name: string; value: string }[] };
  active: { label: string; href: string }[];
  clearHref: string;
  filterCount: number;
  sorts: { label: string; href: string; current: boolean }[];
  total: number;
  noun: string;
  page: number;
  pageCount: number;
  pages: { label: string; href: string; current: boolean }[];
  prevHref?: string;
  nextHref?: string;
  products: { product: Product; size: ProductSize; unitPrice: number; href: string }[];
  suggestions: { label: string; href: string }[];
  index: boolean;
  canonicalPath: string;
  section: ListingSection;
};

export type ListingResolution =
  { type: "redirect"; path: string } | { type: "notFound" } | ListingModel;

type Filters = {
  size?: string;
  color?: string;
  style?: string;
  material?: string;
  room?: string;
  warehouse?: string;
  min?: number;
  max?: number;
  washable?: boolean;
  stock?: boolean;
};

type Location = {
  section: ListingSection;
  kind: ListingKind;
  slug?: string;
  filters: Filters;
  sort: SortKey;
  page: number;
};

const WAREHOUSES = [
  { slug: "new-jersey", name: "New Jersey" },
  { slug: "georgia", name: "Georgia" },
  { slug: "texas", name: "Texas" },
  { slug: "california", name: "California" },
] as const;

const COLOR_ALIASES: Record<string, string[]> = {
  blue: ["blue", "indigo", "navy"],
  terracotta: ["terracotta", "brick", "apricot", "clay"],
  charcoal: ["charcoal", "walnut"],
};

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function serial(id: string): number {
  const match = /(\d+)$/.exec(id);
  return match ? Number(match[1]) : 0;
}

function pay(product: Product): number {
  return product.salePrice ?? product.price;
}

function productType(section: ListingSection): Product["type"] {
  return section === "rugs" ? "rug" : "furniture";
}

function matchesStyle(product: Product, slug: string): boolean {
  if (slugify(product.style) === slug) return true;
  if (slug === "oushak") return product.category === "oushak";
  if (slug === "vintage") return product.category === "vintage";
  if (slug === "persian") {
    return (
      product.category === "persian-style" ||
      slugify(product.style).includes("persian") ||
      slugify(product.style).includes("heriz")
    );
  }
  if (slug === "kilim") {
    return (
      slugify(product.style).includes("kilim") ||
      product.tags.some((tag) => slugify(tag) === "kilim")
    );
  }
  return false;
}

function matchesColor(product: Product, slug: string): boolean {
  const accepted = new Set(COLOR_ALIASES[slug] ?? [slug]);
  return product.colors.some((color) => accepted.has(slugify(color.name)));
}

function matches(product: Product, loc: Location): boolean {
  if (product.type !== productType(loc.section)) return false;
  if (loc.kind === "category" && product.category !== loc.slug) return false;
  if (loc.kind === "size" && !product.sizes.some((size) => size.label === loc.slug)) return false;
  if (loc.kind === "style" && loc.slug && !matchesStyle(product, loc.slug)) return false;
  if (loc.kind === "color" && loc.slug && !matchesColor(product, loc.slug)) return false;
  if (loc.kind === "room" && !product.room.some((room) => slugify(room) === loc.slug)) return false;
  const filters = loc.filters;
  if (filters.size && !product.sizes.some((size) => size.label === filters.size)) return false;
  if (filters.style && !matchesStyle(product, filters.style)) return false;
  if (filters.color && !matchesColor(product, filters.color)) return false;
  if (filters.room && !product.room.some((room) => slugify(room) === filters.room)) return false;
  if (filters.material && slugify(product.material) !== filters.material) return false;
  if (filters.warehouse && slugify(product.warehouse) !== filters.warehouse) return false;
  if (filters.washable && !product.washable) return false;
  if (filters.stock && product.stock < 1) return false;
  if (filters.min !== undefined && pay(product) < filters.min) return false;
  if (filters.max !== undefined && pay(product) > filters.max) return false;
  return true;
}

function compare(sort: SortKey) {
  return (a: Product, b: Product) => {
    if (sort === "price-asc") return pay(a) - pay(b);
    if (sort === "price-desc") return pay(b) - pay(a);
    if (sort === "rating") return b.rating - a.rating || b.reviewCount - a.reviewCount;
    if (sort === "newest") return serial(b.id) - serial(a.id);
    return b.rating * b.reviewCount - a.rating * a.reviewCount || serial(b.id) - serial(a.id);
  };
}

function countFilters(filters: Filters): number {
  let count = 0;
  if (filters.size) count += 1;
  if (filters.color) count += 1;
  if (filters.style) count += 1;
  if (filters.material) count += 1;
  if (filters.room) count += 1;
  if (filters.warehouse) count += 1;
  if (filters.min !== undefined || filters.max !== undefined) count += 1;
  if (filters.washable) count += 1;
  if (filters.stock) count += 1;
  return count;
}

function dimensions(loc: Location): number {
  return (loc.kind === "index" ? 0 : 1) + countFilters(loc.filters);
}

function indexable(loc: Location): boolean {
  return dimensions(loc) <= 1 && loc.page === 1 && loc.sort === "featured";
}

export function basePath(loc: Pick<Location, "section" | "kind" | "slug">): string {
  if (loc.section === "furniture") {
    return loc.kind === "category" && loc.slug ? `/furniture/${loc.slug}` : "/furniture";
  }
  if (loc.kind === "category" && loc.slug) return `/rugs/${loc.slug}`;
  if (loc.kind === "size" && loc.slug) return `/rugs/size/${loc.slug}`;
  if (loc.kind === "style" && loc.slug) return `/rugs/style/${loc.slug}`;
  if (loc.kind === "color" && loc.slug) return `/rugs/color/${loc.slug}`;
  if (loc.kind === "room" && loc.slug) return `/rugs/room/${loc.slug}`;
  return "/rugs";
}

function pathOf(loc: Location): string {
  const params = new URLSearchParams();
  const filters = loc.filters;
  if (filters.size) params.set("size", filters.size);
  if (filters.color) params.set("color", filters.color);
  if (filters.style) params.set("style", filters.style);
  if (filters.material) params.set("material", filters.material);
  if (filters.room) params.set("room", filters.room);
  if (filters.warehouse) params.set("warehouse", filters.warehouse);
  if (filters.min !== undefined) params.set("min", String(filters.min));
  if (filters.max !== undefined) params.set("max", String(filters.max));
  if (filters.washable) params.set("washable", "1");
  if (filters.stock) params.set("stock", "1");
  if (loc.sort !== "featured") params.set("sort", loc.sort);
  if (loc.page > 1) params.set("page", String(loc.page));
  const query = params.toString();
  const path = basePath(loc);
  return query ? `${path}?${query}` : path;
}

function pathFromRaw(base: string, raw: RawSearchParams): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(raw)) {
    if (typeof value === "string") params.append(key, value);
    else if (Array.isArray(value)) for (const item of value) params.append(key, item);
  }
  const query = params.toString();
  return query ? `${base}?${query}` : base;
}

function normalize(loc: Location): Location {
  const filters: Filters = { ...loc.filters };
  let kind = loc.kind;
  let slug = loc.slug;
  const move = (key: "size" | "style" | "color" | "room") => {
    const value = filters[key];
    if (kind !== key || !value) return;
    if (value !== slug) slug = value;
    delete filters[key];
  };
  move("size");
  move("style");
  move("color");
  move("room");
  if (loc.section === "rugs" && kind === "index") {
    const keys = (["size", "style", "color", "room"] as const).filter((key) => filters[key]);
    if (keys.length === 1 && countFilters(filters) === 1) {
      const key = keys[0];
      kind = key;
      slug = filters[key];
      delete filters[key];
    }
  }
  return { ...loc, kind, slug, filters };
}

function first(value: string | string[] | undefined): string | undefined {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value[0];
  return undefined;
}

function parsedSize(slug: string): { label: string; spoken: string } | undefined {
  const match = /^(\d+)x(\d+)$/.exec(slug);
  if (!match) return undefined;
  return { label: `${match[1]} × ${match[2]}`, spoken: `${match[1]} by ${match[2]} foot` };
}

function sizeLabel(slug: string): string {
  return parsedSize(slug)?.label ?? getSize(slug)?.name ?? slug;
}

function sizeRank(slug: string): number {
  if (slug === "custom") return Number.MAX_SAFE_INTEGER;
  const match = /^(\d+)x(\d+)$/.exec(slug);
  if (!match) return Number.MAX_SAFE_INTEGER - 1;
  return Number(match[1]) * Number(match[2]);
}

type Catalog = {
  products: Product[];
  categories: Category[];
  sizes: Set<string>;
  styles: Map<string, string>;
  colors: Map<string, { name: string; hex: string }>;
  materials: Map<string, string>;
  rooms: Map<string, string>;
};

async function loadCatalog(section: ListingSection): Promise<Catalog> {
  const type = productType(section);
  const [page, categories] = await Promise.all([
    getProducts({ type }, "title", { pageSize: 200 }),
    getCategories(),
  ]);
  const products = page.items;
  const sizeSet = new Set(products.flatMap((product) => product.sizes.map((size) => size.label)));
  if (section === "rugs") for (const size of sizes) sizeSet.add(size.slug);
  const styleMap = new Map<string, string>();
  if (section === "rugs") for (const style of styles) styleMap.set(style.slug, style.name);
  for (const product of products) {
    const slug = slugify(product.style);
    if (!styleMap.has(slug)) styleMap.set(slug, product.style);
  }
  const colorMap = new Map<string, { name: string; hex: string }>();
  if (section === "rugs") {
    for (const color of colors) colorMap.set(color.slug, { name: color.name, hex: "" });
  }
  for (const product of products) {
    for (const color of product.colors) {
      const slug = slugify(color.name);
      if (!colorMap.has(slug)) colorMap.set(slug, { name: color.name, hex: color.hex });
    }
  }
  for (const [slug, meta] of colorMap) {
    if (meta.hex) continue;
    const accepted = new Set(COLOR_ALIASES[slug] ?? [slug]);
    const found = products
      .flatMap((product) => product.colors)
      .find((color) => accepted.has(slugify(color.name)));
    colorMap.set(slug, { name: meta.name, hex: found?.hex ?? "#cbbba4" });
  }
  const materialMap = new Map<string, string>();
  const roomMap = new Map<string, string>();
  for (const product of products) {
    materialMap.set(slugify(product.material), product.material);
    for (const room of product.room) roomMap.set(slugify(room), room);
  }
  return {
    products,
    categories,
    sizes: sizeSet,
    styles: styleMap,
    colors: colorMap,
    materials: materialMap,
    rooms: roomMap,
  };
}

function knownLock(
  kind: ListingKind,
  slug: string | undefined,
  catalog: Catalog,
  section: ListingSection,
): boolean {
  if (kind === "index") return true;
  if (!slug) return false;
  if (kind === "category") {
    const parent = section === "rugs" ? "rugs" : "furniture";
    return catalog.categories.some(
      (category) =>
        category.slug === slug &&
        category.parentSlug === parent &&
        category.type === productType(section),
    );
  }
  if (kind === "size") return section === "rugs" && catalog.sizes.has(slug);
  if (kind === "style") return section === "rugs" && catalog.styles.has(slug);
  if (kind === "color") return section === "rugs" && catalog.colors.has(slug);
  if (kind === "room") return section === "rugs" && catalog.rooms.has(slug);
  return false;
}

function readFilters(
  raw: RawSearchParams,
  catalog: Catalog,
): { filters: Filters; sort: SortKey; page: number } | "bad-page" {
  const pageToken = raw.page;
  if (Array.isArray(pageToken)) return "bad-page";
  let page = 1;
  if (typeof pageToken === "string") {
    if (!/^[1-9]\d*$/.test(pageToken)) return "bad-page";
    page = Number(pageToken);
  }
  const sortToken = first(raw.sort);
  const sort = SORTS.some((item) => item.key === sortToken) ? (sortToken as SortKey) : "featured";
  const filters: Filters = {};
  const size = first(raw.size);
  const color = first(raw.color);
  const style = first(raw.style);
  const material = first(raw.material);
  const room = first(raw.room);
  const warehouse = first(raw.warehouse);
  if (size && catalog.sizes.has(size)) filters.size = size;
  if (color && catalog.colors.has(color)) filters.color = color;
  if (style && catalog.styles.has(style)) filters.style = style;
  if (material && catalog.materials.has(material)) filters.material = material;
  if (room && catalog.rooms.has(room)) filters.room = room;
  if (warehouse && WAREHOUSES.some((item) => item.slug === warehouse))
    filters.warehouse = warehouse;
  const minToken = first(raw.min);
  const maxToken = first(raw.max);
  if (minToken && /^\d+$/.test(minToken) && Number(minToken) > 0) filters.min = Number(minToken);
  if (maxToken && /^\d+$/.test(maxToken) && Number(maxToken) > 0) filters.max = Number(maxToken);
  if (filters.min !== undefined && filters.max !== undefined && filters.min > filters.max) {
    const swap = filters.min;
    filters.min = filters.max;
    filters.max = swap;
  }
  if (first(raw.washable) === "1") filters.washable = true;
  if (first(raw.stock) === "1") filters.stock = true;
  return { filters, sort, page };
}

function optionHref(
  loc: Location,
  key: "size" | "style" | "color" | "room" | "material" | "warehouse",
  value: string,
): string {
  const lockOff = loc.kind === key && loc.slug === value;
  if (lockOff) {
    return pathOf(normalize({ ...loc, kind: "index", slug: undefined, page: 1 }));
  }
  const filters = { ...loc.filters };
  if (filters[key] === value) delete filters[key];
  else filters[key] = value;
  return pathOf(normalize({ ...loc, filters, page: 1 }));
}

function flagHref(loc: Location, key: "washable" | "stock"): string {
  const filters = { ...loc.filters };
  if (filters[key]) delete filters[key];
  else filters[key] = true;
  return pathOf(normalize({ ...loc, filters, page: 1 }));
}

function without(loc: Location, key: keyof Filters): string {
  const filters = { ...loc.filters };
  if (key === "min" || key === "max") {
    delete filters.min;
    delete filters.max;
  } else delete filters[key];
  return pathOf(normalize({ ...loc, filters, page: 1 }));
}

function usd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function priceLabel(filters: Filters): string {
  if (filters.min !== undefined && filters.max !== undefined)
    return `${usd(filters.min)}–${usd(filters.max)}`;
  if (filters.min !== undefined) return `From ${usd(filters.min)}`;
  return `Up to ${usd(filters.max ?? 0)}`;
}

function inPool(product: Product, loc: Location): boolean {
  if (product.type !== productType(loc.section)) return false;
  if (loc.kind === "category") return product.category === loc.slug;
  return true;
}

function headingForCategory(category: Category): { title: string; crumb: string } {
  if (category.type === "furniture") return { title: category.name, crumb: category.name };
  if (category.slug === "rugs") return { title: "Turkish Rugs", crumb: "Rugs" };
  if (category.slug === "turkish") return { title: "Turkish Weave Rugs", crumb: "Turkish" };
  return { title: `${category.name} Rugs`, crumb: category.name };
}

function copyFor(
  loc: Location,
  catalog: Catalog,
): Pick<
  ListingModel,
  "title" | "description" | "intro" | "seoText" | "faq" | "crumbs" | "chips"
> | null {
  const home = { name: "Home", path: "/" };
  const rugs = { name: "Rugs", path: "/rugs" };
  const furniture = { name: "Furniture", path: "/furniture" };
  const parent = loc.section === "rugs" ? rugs : furniture;
  if (loc.kind === "index" || loc.kind === "category") {
    const slug = loc.kind === "index" ? (loc.section === "rugs" ? "rugs" : "furniture") : loc.slug;
    const category = catalog.categories.find((item) => item.slug === slug);
    if (!category) return null;
    const heading = headingForCategory(category);
    const children = catalog.categories.filter(
      (item) => item.parentSlug === (loc.kind === "index" ? category.slug : category.parentSlug),
    );
    const crumbs =
      loc.kind === "index"
        ? [home, { name: heading.crumb, path: basePath(loc) }]
        : [home, parent, { name: heading.crumb, path: basePath(loc) }];
    return {
      title: heading.title,
      description: category.intro,
      intro: category.intro,
      seoText: category.seoText,
      faq: category.faq,
      crumbs,
      chips: children.map((item) => ({
        label: item.name,
        href: `/${loc.section}/${item.slug}`,
        current: item.slug === loc.slug,
      })),
    };
  }
  if (loc.section !== "rugs" || !loc.slug) return null;
  const slug = loc.slug;
  if (loc.kind === "size") {
    const facet = getSize(slug);
    const parsed = parsedSize(slug);
    const facetFits = Boolean(facet && (!parsed || facet.name === parsed.label));
    const label = parsed?.label ?? facet?.name ?? slug;
    const spoken = parsed?.spoken ?? label;
    const intro =
      facetFits && facet
        ? facet.intro
        : `A ${spoken} rug from Wool & Loom, measured in feet and held in a U.S. warehouse.`;
    return {
      title: facetFits && facet ? facet.title : `${label} Turkish Rugs`,
      description:
        facetFits && facet
          ? facet.description
          : `Shop ${spoken} Turkish rugs in stock at Wool & Loom warehouses in the United States.`,
      intro,
      seoText: `${intro} Wool & Loom ships from New Jersey, Georgia, Texas, and California. The price follows the size on the listing. Cleaning, repair, and a custom cut are quoted separately.`,
      faq: sizeFaq(slug, label),
      crumbs: [home, rugs, { name: label, path: basePath(loc) }],
      chips: [...catalog.sizes]
        .sort((a, b) => sizeRank(a) - sizeRank(b))
        .map((item) => ({
          label: sizeLabel(item),
          href: `/rugs/size/${item}`,
          current: item === slug,
        })),
    };
  }
  if (loc.kind === "style") {
    const facet = getStyle(slug);
    const label = facet?.name ?? catalog.styles.get(slug) ?? slug;
    return {
      title: facet?.title ?? `${label} Rugs`,
      description:
        facet?.description ??
        `Shop ${label} rugs handpicked in Turkey and shipped from Wool & Loom warehouses in the United States.`,
      intro: facet?.intro ?? `${label} rugs from Wool & Loom, in stock at a U.S. warehouse.`,
      seoText: `${facet?.intro ?? `${label} is one of the drawings we keep in stock.`} Each listing names the warehouse and the delivery window. Wool pieces are cleaned by quote. Rugs marked washable can go in a home washer.`,
      faq: careFaq(label),
      crumbs: [home, rugs, { name: label, path: basePath(loc) }],
      chips: styleChips(slug, catalog),
    };
  }
  if (loc.kind === "color") {
    const facet = getColor(slug);
    const label = facet?.name ?? catalog.colors.get(slug)?.name ?? slug;
    return {
      title: facet?.title ?? `${label} Turkish Rugs`,
      description:
        facet?.description ?? `Shop ${label.toLowerCase()} Turkish rugs in stock at Wool & Loom.`,
      intro:
        facet?.intro ?? `${label} Turkish rugs, stocked in the United States and sized in feet.`,
      seoText: `${facet?.intro ?? `${label} wool is one of the grounds we keep in the warehouse.`} Rotate the rug once a season so the color wears evenly. A quote covers cleaning when the pile needs more than a vacuum.`,
      faq: careFaq(`${label} rugs`),
      crumbs: [home, rugs, { name: label, path: basePath(loc) }],
      chips: [...catalog.colors.entries()].map(([item, meta]) => ({
        label: meta.name,
        href: `/rugs/color/${item}`,
        current: item === slug,
      })),
    };
  }
  const room = catalog.rooms.get(slug);
  if (!room) return null;
  const lower = room.toLowerCase();
  return {
    title: `Rugs for the ${room}`,
    description: `Shop Turkish rugs for the ${lower}. Sizes are in feet and inches, and every piece ships from a Wool & Loom warehouse.`,
    intro: `Turkish rugs sized for a ${lower}, in stock in the United States.`,
    seoText: `Place the rug so the furniture in the ${lower} shares it. Front legs of a sofa or chair should rest on the pile, and a table should sit fully on it. Measure the clear floor in feet and inches before you choose a size.`,
    faq: [
      {
        question: `What rug size fits a ${lower}?`,
        answer: `Measure the clear floor in feet and inches, then leave a border of bare floor at the walls. The rug size calculator compares stock sizes for a ${lower}.`,
      },
      {
        question: "Do you ship from a U.S. warehouse?",
        answer:
          "Yes. New Jersey, Georgia, Texas, and California each hold stock. The listing names the warehouse and the delivery window.",
      },
    ],
    crumbs: [home, rugs, { name: room, path: basePath(loc) }],
    chips: [...catalog.rooms.entries()].map(([item, name]) => ({
      label: name,
      href: `/rugs/room/${item}`,
      current: item === slug,
    })),
  };
}

function sizeFaq(slug: string, label: string): { question: string; answer: string }[] {
  if (slug === "custom") {
    return [
      {
        question: "How is a custom size priced?",
        answer:
          "Cutting and binding are priced by quote after we know the rug and the finished size in feet and inches. The stock price is only the starting point.",
      },
      {
        question: "Where do I start?",
        answer:
          "Compare stock sizes with the rug size calculator, then request a quote for the cut you measured.",
      },
    ];
  }
  return [
    {
      question: `Is ${label} the finished size?`,
      answer: `${label} is the size in feet. Measure the clear floor in feet and inches and leave a border of bare floor so the rug does not meet the wall or a swinging door.`,
    },
    {
      question: "Can you cut a stock rug to another size?",
      answer:
        "Yes. Custom sizing is priced by quote. Use the rug size calculator to compare stock sizes, then send the finished measurement.",
    },
  ];
}

function careFaq(label: string): { question: string; answer: string }[] {
  return [
    {
      question: `Are ${label} in stock in the United States?`,
      answer:
        "Each rug on this page ships from New Jersey, Georgia, Texas, or California. The listing names the warehouse and the delivery window in days.",
    },
    {
      question: "How should I care for the wool?",
      answer:
        "Vacuum with the pile and rotate the rug once a season. Cleaning and repair are priced by quote. Only rugs marked washable go in a home washer.",
    },
  ];
}

function styleChips(
  current: string,
  catalog: Catalog,
): { label: string; href: string; current: boolean }[] {
  const slugs = new Set(styles.map((style) => style.slug));
  if (!slugs.has(current)) slugs.add(current);
  return [...slugs].map((slug) => ({
    label: getStyle(slug)?.name ?? catalog.styles.get(slug) ?? slug,
    href: `/rugs/style/${slug}`,
    current: slug === current,
  }));
}

async function present(product: Product, sizeSlug?: string) {
  const matched = sizeSlug ? product.sizes.find((size) => size.label === sizeSlug) : undefined;
  let size = matched;
  if (!size) {
    const target = pay(product);
    for (const candidate of product.sizes) {
      const unit = await getUnitPrice(product.id, candidate.label);
      if (unit === target) {
        size = candidate;
        break;
      }
    }
  }
  size = size ?? product.sizes[0];
  if (!size) throw new Error(`${product.slug} has no sizes`);
  const unit = await getUnitPrice(product.id, size.label);
  return {
    product,
    size,
    unitPrice: unit ?? pay(product),
    href: productPath(product),
  };
}

function suggestions(section: ListingSection): { label: string; href: string }[] {
  if (section === "furniture") {
    return [
      { label: "Sofas", href: "/furniture/sofas" },
      { label: "Coffee tables", href: "/furniture/coffee-tables" },
      { label: "Turkish rugs", href: "/rugs" },
    ];
  }
  return [
    { label: "8 × 10 rugs", href: "/rugs/size/8x10" },
    { label: "Oushak rugs", href: "/rugs/oushak" },
    { label: "Rug size calculator", href: "/tools/rug-size-calculator" },
    { label: "Rug care", href: "/services" },
  ];
}

function hiddenFields(loc: Location): { name: string; value: string }[] {
  const params = new URLSearchParams(pathOf({ ...loc, page: 1 }).split("?")[1] ?? "");
  params.delete("min");
  params.delete("max");
  params.delete("page");
  return [...params.entries()].map(([name, value]) => ({ name, value }));
}

export async function listingParamSlugs(
  kind: "size" | "style" | "color" | "room" | "rug-category" | "furniture-category",
): Promise<string[]> {
  if (kind === "rug-category" || kind === "furniture-category") {
    const section = kind === "rug-category" ? "rugs" : "furniture";
    const catalog = await loadCatalog(section);
    const parent = section === "rugs" ? "rugs" : "furniture";
    return catalog.categories
      .filter(
        (category) => category.parentSlug === parent && category.type === productType(section),
      )
      .map((category) => category.slug);
  }
  const catalog = await loadCatalog("rugs");
  if (kind === "size") return [...catalog.sizes].sort((a, b) => sizeRank(a) - sizeRank(b));
  if (kind === "style") return [...catalog.styles.keys()];
  if (kind === "color") return [...catalog.colors.keys()];
  return [...catalog.rooms.keys()];
}

export async function resolveListing(request: ListingRequest): Promise<ListingResolution> {
  if (request.section === "furniture" && request.kind !== "index" && request.kind !== "category") {
    return { type: "notFound" };
  }
  const catalog = await loadCatalog(request.section);
  if (!knownLock(request.kind, request.slug, catalog, request.section)) return { type: "notFound" };
  const parsed = readFilters(request.searchParams, catalog);
  if (parsed === "bad-page") return { type: "notFound" };
  const loc = normalize({
    section: request.section,
    kind: request.kind,
    slug: request.slug,
    filters: parsed.filters,
    sort: parsed.sort,
    page: parsed.page,
  });
  if (!knownLock(loc.kind, loc.slug, catalog, loc.section)) return { type: "notFound" };
  const matched = catalog.products
    .filter((product) => matches(product, loc))
    .sort(compare(loc.sort));
  const pageCount = Math.max(1, Math.ceil(matched.length / LISTING_PAGE_SIZE));
  if (loc.page > pageCount) return { type: "notFound" };
  const destination = pathOf(loc);
  const incoming = pathFromRaw(basePath(request), request.searchParams);
  if (incoming !== destination) return { type: "redirect", path: destination };

  const copy = copyFor(loc, catalog);
  if (!copy) return { type: "notFound" };
  const sizeSlug = loc.kind === "size" ? loc.slug : loc.filters.size;
  const start = (loc.page - 1) * LISTING_PAGE_SIZE;
  const slice = matched.slice(start, start + LISTING_PAGE_SIZE);
  const products = await Promise.all(slice.map((product) => present(product, sizeSlug)));
  const pool = catalog.products.filter((product) => inPool(product, loc));
  const option = (
    key: "size" | "style" | "color" | "room" | "material" | "warehouse",
    slug: string,
    label: string,
    count: number,
    hex?: string,
  ): FacetOption => ({
    slug,
    label,
    href: optionHref(loc, key, slug),
    active: (loc.kind === key && loc.slug === slug) || loc.filters[key] === slug,
    count,
    hex,
  });
  const sizesGroup = [...catalog.sizes]
    .sort((a, b) => sizeRank(a) - sizeRank(b))
    .map((slug) =>
      option(
        "size",
        slug,
        sizeLabel(slug),
        pool.filter((product) => product.sizes.some((size) => size.label === slug)).length,
      ),
    )
    .filter((item) => item.count > 0 || item.active);
  const colorsGroup = [...catalog.colors.entries()]
    .map(([slug, meta]) =>
      option(
        "color",
        slug,
        meta.name,
        pool.filter((product) => matchesColor(product, slug)).length,
        meta.hex,
      ),
    )
    .filter((item) => item.count > 0 || item.active);
  const stylesGroup = [...catalog.styles.entries()]
    .map(([slug, label]) =>
      option("style", slug, label, pool.filter((product) => matchesStyle(product, slug)).length),
    )
    .filter((item) => item.count > 0 || item.active)
    .sort((a, b) => a.label.localeCompare(b.label));
  const materialsGroup = [...catalog.materials.entries()]
    .map(([slug, label]) =>
      option(
        "material",
        slug,
        label,
        pool.filter((product) => slugify(product.material) === slug).length,
      ),
    )
    .filter((item) => item.count > 0 || item.active)
    .sort((a, b) => a.label.localeCompare(b.label));
  const roomsGroup = [...catalog.rooms.entries()]
    .map(([slug, label]) =>
      option(
        "room",
        slug,
        label,
        pool.filter((product) => product.room.some((room) => slugify(room) === slug)).length,
      ),
    )
    .filter((item) => item.count > 0 || item.active);
  const warehousesGroup = WAREHOUSES.map((warehouse) =>
    option(
      "warehouse",
      warehouse.slug,
      warehouse.name,
      pool.filter((product) => slugify(product.warehouse) === warehouse.slug).length,
    ),
  ).filter((item) => item.count > 0 || item.active);

  const active: { label: string; href: string }[] = [];
  if (loc.filters.size)
    active.push({ label: sizeLabel(loc.filters.size), href: without(loc, "size") });
  if (loc.filters.color)
    active.push({
      label: catalog.colors.get(loc.filters.color)?.name ?? loc.filters.color,
      href: without(loc, "color"),
    });
  if (loc.filters.style)
    active.push({
      label: catalog.styles.get(loc.filters.style) ?? loc.filters.style,
      href: without(loc, "style"),
    });
  if (loc.filters.material)
    active.push({
      label: catalog.materials.get(loc.filters.material) ?? loc.filters.material,
      href: without(loc, "material"),
    });
  if (loc.filters.room)
    active.push({
      label: catalog.rooms.get(loc.filters.room) ?? loc.filters.room,
      href: without(loc, "room"),
    });
  if (loc.filters.warehouse) {
    active.push({
      label:
        WAREHOUSES.find((item) => item.slug === loc.filters.warehouse)?.name ??
        loc.filters.warehouse,
      href: without(loc, "warehouse"),
    });
  }
  if (loc.filters.min !== undefined || loc.filters.max !== undefined) {
    active.push({ label: priceLabel(loc.filters), href: without(loc, "min") });
  }
  if (loc.filters.washable) active.push({ label: "Washable only", href: without(loc, "washable") });
  if (loc.filters.stock) active.push({ label: "In stock only", href: without(loc, "stock") });

  const pages = Array.from({ length: pageCount }, (_, index) => {
    const number = index + 1;
    return {
      label: String(number),
      href: pathOf({ ...loc, page: number }),
      current: number === loc.page,
    };
  });
  const noun =
    loc.section === "rugs"
      ? matched.length === 1
        ? "rug"
        : "rugs"
      : matched.length === 1
        ? "piece"
        : "pieces";
  const index = indexable(loc);

  return {
    type: "ok",
    ...copy,
    groups: {
      sizes: sizesGroup,
      colors: colorsGroup,
      styles: stylesGroup,
      materials: materialsGroup,
      rooms: roomsGroup,
      warehouses: warehousesGroup,
    },
    washable: { href: flagHref(loc, "washable"), active: Boolean(loc.filters.washable) },
    stock: { href: flagHref(loc, "stock"), active: Boolean(loc.filters.stock) },
    price: {
      action: basePath(loc),
      min: loc.filters.min !== undefined ? String(loc.filters.min) : "",
      max: loc.filters.max !== undefined ? String(loc.filters.max) : "",
      hidden: hiddenFields(loc),
    },
    active,
    clearHref: pathOf(normalize({ ...loc, filters: {}, page: 1 })),
    filterCount: active.length,
    sorts: SORTS.map((sort) => ({
      label: sort.label,
      href: pathOf(normalize({ ...loc, sort: sort.key, page: 1 })),
      current: loc.sort === sort.key,
    })),
    total: matched.length,
    noun,
    page: loc.page,
    pageCount,
    pages,
    prevHref: loc.page > 1 ? pathOf({ ...loc, page: loc.page - 1 }) : undefined,
    nextHref: loc.page < pageCount ? pathOf({ ...loc, page: loc.page + 1 }) : undefined,
    products,
    suggestions: suggestions(loc.section),
    index,
    canonicalPath: index ? pathOf({ ...loc, page: 1, sort: "featured" }) : basePath(loc),
    section: loc.section,
  };
}
