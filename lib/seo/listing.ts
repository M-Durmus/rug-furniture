import { getColor, getSize, getStyle } from "@/lib/data/facets";
import type { Product } from "@/lib/data/types";
import { site } from "@/lib/site";

/**
 * Listing index rules
 * -------------------
 * Indexable:
 * - /rugs, /furniture, and one-facet landings: /rugs/size/[size], /rugs/style/[style], /rugs/color/[color]
 * - Page 2+ of those URLs, self-canonical as ?page=N, with rel prev/next
 * Noindex, follow. Canonical drops the query:
 * - Any non-default sort
 * - Two or more facets, or a facet query on top of a landing page
 * 308 redirects:
 * - page=1, sort=featured, empty values, and unknown params are removed
 * - A single facet query on /rugs redirects to that facet's landing page
 * - A query that repeats the landing's own facet is removed
 * 404:
 * - Non-integer pages, leading zeros, and pages past the last page
 */

export const PAGE_SIZE = 9;

export const SORTS = [
  { key: "featured", label: "Featured" },
  { key: "newest", label: "Newest" },
  { key: "price-asc", label: "Price: low to high" },
  { key: "price-desc", label: "Price: high to low" },
] as const;

export type SortKey = (typeof SORTS)[number]["key"];
export type FacetKey = "size" | "style" | "color";
export type RawSearchParams = Record<string, string | string[] | undefined>;
export type FacetSelection = Partial<Record<FacetKey, string>>;

export type ListingKind = "rugs" | "furniture" | "size" | "style" | "color";

export type ListingInput = {
  kind: ListingKind;
  basePath: string;
  locked?: { key: FacetKey; value: string };
  raw: RawSearchParams;
  products: Product[];
};

export type ListingModel = {
  type: "ok";
  kind: ListingKind;
  basePath: string;
  title: string;
  description: string;
  intro: string;
  index: boolean;
  canonicalPath: string;
  page: number;
  pageCount: number;
  total: number;
  sort: SortKey;
  queryFacets: FacetSelection;
  appliedFacets: FacetSelection;
  products: Product[];
  prevHref?: string;
  nextHref?: string;
  relPrev?: string;
  relNext?: string;
};

export type ListingResult = { type: "redirect"; to: string } | { type: "notFound" } | ListingModel;

const FACETS: FacetKey[] = ["size", "style", "color"];

function first(raw: RawSearchParams, key: string): string | undefined {
  const value = raw[key];
  if (Array.isArray(value)) return value[0];
  return value;
}

export function isValidFacet(key: FacetKey, value: string): boolean {
  if (key === "size") return Boolean(getSize(value));
  if (key === "style") return Boolean(getStyle(value));
  return Boolean(getColor(value));
}

function href(path: string, params: Record<string, string | undefined>): string {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) query.set(key, value);
  }
  const text = query.toString();
  return text ? `${path}?${text}` : path;
}

function sortProducts(items: Product[], sort: SortKey): Product[] {
  const copy = [...items];
  if (sort === "price-asc") copy.sort((a, b) => a.price - b.price || a.name.localeCompare(b.name));
  else if (sort === "price-desc") copy.sort((a, b) => b.price - a.price || a.name.localeCompare(b.name));
  else if (sort === "newest") copy.sort((a, b) => b.added.localeCompare(a.added) || a.name.localeCompare(b.name));
  else copy.sort((a, b) => a.featuredRank - b.featuredRank);
  return copy;
}

function filterProducts(items: Product[], facets: FacetSelection): Product[] {
  return items.filter((product) => {
    if (facets.size && product.sizeSlug !== facets.size) return false;
    if (facets.style && product.styleSlug !== facets.style) return false;
    if (facets.color && product.colorSlug !== facets.color) return false;
    return true;
  });
}

function copyFor(kind: ListingKind, locked?: { key: FacetKey; value: string }): { title: string; description: string; intro: string } {
  if (kind === "furniture") {
    return {
      title: "Furniture",
      description: "Shop oak, linen, and walnut furniture scaled for Wool & Loom rugs, in stock at U.S. warehouses.",
      intro: "These pieces are built to sit with the rugs: chair legs fully on the pile or fully off it, and tables low enough for a wool edge. Delivery is quoted from the warehouse that holds the piece.",
    };
  }
  if (locked?.key === "size") {
    const facet = getSize(locked.value);
    if (!facet) return { title: "Turkish Rugs", description: site.description, intro: "" };
    return { title: facet.title, description: facet.description, intro: facet.intro };
  }
  if (locked?.key === "style") {
    const facet = getStyle(locked.value);
    if (!facet) return { title: "Turkish Rugs", description: site.description, intro: "" };
    return { title: facet.title, description: facet.description, intro: facet.intro };
  }
  if (locked?.key === "color") {
    const facet = getColor(locked.value);
    if (!facet) return { title: "Turkish Rugs", description: site.description, intro: "" };
    return { title: facet.title, description: facet.description, intro: facet.intro };
  }
  return {
    title: "Turkish Rugs",
    description: "Shop Turkish rugs in stock at Wool & Loom warehouses in New Jersey, Georgia, Texas, and California.",
    intro: "Every rug on this page is already in a U.S. warehouse. Sizes are in feet and inches. Filter by a single size, style, or color to open a page we ask search engines to index.",
  };
}

export function buildListing(input: ListingInput): ListingResult {
  if (input.locked && !isValidFacet(input.locked.key, input.locked.value)) return { type: "notFound" };

  const allowed = new Set(input.kind === "furniture" ? ["sort", "page"] : ["size", "style", "color", "sort", "page"]);
  const unknown = Object.keys(input.raw).some((key) => first(input.raw, key) !== undefined && !allowed.has(key));

  let pageRaw = first(input.raw, "page");
  let sortRaw = first(input.raw, "sort");
  const queryFacets: FacetSelection = {};
  let dirty = unknown;

  for (const key of FACETS) {
    const value = first(input.raw, key);
    if (!value) continue;
    if (input.kind === "furniture" || !isValidFacet(key, value) || (input.locked?.key === key && input.locked.value === value)) {
      dirty = true;
      continue;
    }
    queryFacets[key] = value;
  }

  if (pageRaw === "1" || pageRaw === "") {
    dirty = true;
    pageRaw = undefined;
  }
  if (sortRaw === "featured" || sortRaw === "") {
    dirty = true;
    sortRaw = undefined;
  } else if (sortRaw && !SORTS.some((item) => item.key === sortRaw)) {
    dirty = true;
    sortRaw = undefined;
  }

  const facetKeys = FACETS.filter((key) => queryFacets[key]);
  if (input.kind === "rugs" && facetKeys.length === 1) {
    const key = facetKeys[0];
    return {
      type: "redirect",
      to: href(`/rugs/${key}/${queryFacets[key]}`, { sort: sortRaw, page: pageRaw }),
    };
  }

  if (dirty) {
    return {
      type: "redirect",
      to: href(input.basePath, {
        size: queryFacets.size,
        style: queryFacets.style,
        color: queryFacets.color,
        sort: sortRaw,
        page: pageRaw,
      }),
    };
  }

  if (pageRaw && !/^[1-9]\d*$/.test(pageRaw)) return { type: "notFound" };
  const page = pageRaw ? Number(pageRaw) : 1;
  const sort = (sortRaw as SortKey | undefined) ?? "featured";
  const appliedFacets: FacetSelection = { ...queryFacets };
  if (input.locked) appliedFacets[input.locked.key] = input.locked.value;

  const filtered = sortProducts(filterProducts(input.products, appliedFacets), sort);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  if (page > pageCount) return { type: "notFound" };

  const extraFacet = facetKeys.length > 0;
  const index = !extraFacet && sort === "featured";
  const copy = copyFor(input.kind, input.locked);
  const title = index && page > 1 ? `${copy.title}, page ${page}` : copy.title;
  const canonicalPath = !index ? input.basePath : page > 1 ? `${input.basePath}?page=${page}` : input.basePath;

  const pageHref = (nextPage: number) =>
    href(input.basePath, {
      size: queryFacets.size,
      style: queryFacets.style,
      color: queryFacets.color,
      sort: sort === "featured" ? undefined : sort,
      page: nextPage > 1 ? String(nextPage) : undefined,
    });

  const prevHref = page > 1 ? pageHref(page - 1) : undefined;
  const nextHref = page < pageCount ? pageHref(page + 1) : undefined;

  return {
    type: "ok",
    kind: input.kind,
    basePath: input.basePath,
    title,
    description: copy.description,
    intro: copy.intro,
    index,
    canonicalPath,
    page,
    pageCount,
    total: filtered.length,
    sort,
    queryFacets,
    appliedFacets,
    products: filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    prevHref,
    nextHref,
    relPrev: index ? prevHref : undefined,
    relNext: index ? nextHref : undefined,
  };
}

export function defaultListing(input: Omit<ListingInput, "raw">): ListingModel {
  const result = buildListing({ ...input, raw: {} });
  if (result.type !== "ok") throw new Error(`Default listing for ${input.basePath} did not resolve`);
  return result;
}
