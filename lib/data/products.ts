import slugs from "@/data/slugs.json";
import { imageSize } from "@/lib/site";
import { getSize, getWarehouse } from "@/lib/data/facets";
import type { Product, Review, WarehouseId } from "@/lib/data/types";

type Seed = {
  name: string;
  price: number;
  sizeSlug?: string;
  style: string;
  styleSlug?: string;
  color: string;
  colorSlug?: string;
  material: string;
  origin: string;
  warehouseId: WarehouseId;
  palette: string;
  dimensions: string;
  inStock?: boolean;
};

const reviewBank: Review[] = [
  {
    author: "Helen P.",
    rating: 5,
    title: "The size matched the tape",
    body: "We measured the living room in feet and inches, ordered the stated size, and the rug arrived within half an inch of that. It shipped from the New Jersey warehouse in a week.",
    date: "2026-03-18",
  },
  {
    author: "Marcus T.",
    rating: 5,
    title: "Wool feels dense, not scratchy",
    body: "The pile is firm enough for dining chairs and still comfortable in socks. Color in our north-facing room matches the description on the page.",
    date: "2026-05-02",
  },
  {
    author: "Priya S.",
    rating: 4,
    title: "Clear warehouse update",
    body: "Support told us which warehouse held the piece and when the freight desk would call. The driver placed it in the room we named.",
    date: "2026-01-29",
  },
  {
    author: "Jonah L.",
    rating: 5,
    title: "Right scale under a sofa",
    body: "Front legs of the sofa and both chairs sit on the rug, with a border of oak floor left at the walls. That is the placement the size guide described.",
    date: "2026-06-14",
  },
  {
    author: "Elena V.",
    rating: 4,
    title: "Honest note about wear",
    body: "The vintage piece shows lighter wool on one end. The listing said so, and it looks settled rather than damaged once the furniture was down.",
    date: "2026-02-09",
  },
  {
    author: "Chris A.",
    rating: 5,
    title: "Runner fits the hall",
    body: "We kept three inches of floor on each side of a three-foot hall. The kilim lies flat and does not curl at the ends.",
    date: "2026-07-21",
  },
  {
    author: "Naomi K.",
    rating: 5,
    title: "Furniture arrived blanket-wrapped",
    body: "The sideboard was wrapped, the driver checked the wall we planned to use, and the oak finish matches the sample description.",
    date: "2026-04-03",
  },
  {
    author: "Luis M.",
    rating: 4,
    title: "Useful care instructions",
    body: "The page explained vacuuming with the nap and when to ask for a cleaning quote. After one season the ivory field still looks even.",
    date: "2026-08-11",
  },
];

const rugSeeds: Record<string, Seed> = {
  "sivas-medallion": {
    name: "Sivas Medallion",
    price: 2480,
    sizeSlug: "8x10",
    style: "Persian",
    styleSlug: "persian",
    color: "Ivory",
    colorSlug: "ivory",
    material: "Hand-knotted wool",
    origin: "Sivas, Turkey",
    warehouseId: "nj",
    palette: "an ivory field, an indigo medallion, and small terracotta flowers",
    dimensions: "8' × 10'",
  },
  "hereke-border": {
    name: "Hereke Border",
    price: 4200,
    sizeSlug: "9x12",
    style: "Persian",
    styleSlug: "persian",
    color: "Blue",
    colorSlug: "blue",
    material: "Hand-knotted wool",
    origin: "Hereke, Turkey",
    warehouseId: "ga",
    palette: "a deep blue field and a cream main border",
    dimensions: "9' × 12'",
  },
  "usak-angora": {
    name: "Uşak Angora",
    price: 3100,
    sizeSlug: "8x10",
    style: "Oushak",
    styleSlug: "oushak",
    color: "Ivory",
    colorSlug: "ivory",
    material: "Hand-knotted wool",
    origin: "Uşak, Turkey",
    warehouseId: "tx",
    palette: "an open ivory field with faded apricot motifs",
    dimensions: "8' × 10'",
  },
  "konya-kilim": {
    name: "Konya Kilim",
    price: 980,
    sizeSlug: "6x9",
    style: "Kilim",
    styleSlug: "kilim",
    color: "Terracotta",
    colorSlug: "terracotta",
    material: "Flatweave wool",
    origin: "Konya, Turkey",
    warehouseId: "ca",
    palette: "terracotta diamonds on a warm ivory ground",
    dimensions: "6' × 9'",
  },
  "bergama-vintage": {
    name: "Bergama Vintage",
    price: 2760,
    sizeSlug: "8x10",
    style: "Vintage",
    styleSlug: "vintage",
    color: "Sage",
    colorSlug: "sage",
    material: "Hand-knotted wool",
    origin: "Bergama, Turkey",
    warehouseId: "nj",
    palette: "a sage field with an abrashed brown medallion",
    dimensions: "8' × 10'",
  },
  "milas-geometric": {
    name: "Milas Geometric",
    price: 740,
    sizeSlug: "5x7",
    style: "Modern",
    styleSlug: "modern",
    color: "Charcoal",
    colorSlug: "charcoal",
    material: "Hand-knotted wool",
    origin: "Milas, Turkey",
    warehouseId: "ga",
    palette: "charcoal lines on a stone field",
    dimensions: "5' × 7'",
  },
  "kars-runner": {
    name: "Kars Runner",
    price: 620,
    sizeSlug: "2x8",
    style: "Kilim",
    styleSlug: "kilim",
    color: "Terracotta",
    colorSlug: "terracotta",
    material: "Flatweave wool",
    origin: "Kars, Turkey",
    warehouseId: "tx",
    palette: "narrow terracotta borders and a cream center stripe",
    dimensions: "2'6\" × 8'",
  },
  "isparta-garden": {
    name: "Isparta Garden",
    price: 3900,
    sizeSlug: "9x12",
    style: "Persian",
    styleSlug: "persian",
    color: "Sage",
    colorSlug: "sage",
    material: "Hand-knotted wool",
    origin: "Isparta, Turkey",
    warehouseId: "ca",
    palette: "a sage field with scattered garden sprigs",
    dimensions: "9' × 12'",
  },
  "dosemealti-field": {
    name: "Döşemealtı Field",
    price: 1120,
    sizeSlug: "5x7",
    style: "Vintage",
    styleSlug: "vintage",
    color: "Ivory",
    colorSlug: "ivory",
    material: "Hand-knotted wool",
    origin: "Döşemealtı, Turkey",
    warehouseId: "nj",
    palette: "an ivory field with a worn rust medallion",
    dimensions: "5' × 7'",
  },
  "yahyali-medallion": {
    name: "Yahyalı Medallion",
    price: 1680,
    sizeSlug: "6x9",
    style: "Persian",
    styleSlug: "persian",
    color: "Terracotta",
    colorSlug: "terracotta",
    material: "Hand-knotted wool",
    origin: "Yahyalı, Turkey",
    warehouseId: "ga",
    palette: "a terracotta field and an ivory medallion",
    dimensions: "6' × 9'",
  },
  "oushak-pale": {
    name: "Pale Oushak",
    price: 3340,
    sizeSlug: "8x10",
    style: "Oushak",
    styleSlug: "oushak",
    color: "Ivory",
    colorSlug: "ivory",
    material: "Hand-knotted wool",
    origin: "Uşak, Turkey",
    warehouseId: "tx",
    palette: "a pale ivory field with sand and blush drawing",
    dimensions: "8' × 10'",
  },
  "grid-flatweave": {
    name: "Grid Flatweave",
    price: 690,
    sizeSlug: "5x7",
    style: "Modern",
    styleSlug: "modern",
    color: "Charcoal",
    colorSlug: "charcoal",
    material: "Flatweave wool",
    origin: "Denizli, Turkey",
    warehouseId: "ca",
    palette: "a charcoal grid on natural wool",
    dimensions: "5' × 7'",
  },
  "anatolian-blue": {
    name: "Anatolian Blue",
    price: 2890,
    sizeSlug: "8x10",
    style: "Vintage",
    styleSlug: "vintage",
    color: "Blue",
    colorSlug: "blue",
    material: "Hand-knotted wool",
    origin: "Central Anatolia, Turkey",
    warehouseId: "nj",
    palette: "an indigo field softened by years of sun",
    dimensions: "8' × 10'",
  },
  "hemp-kilim": {
    name: "Hemp Kilim",
    price: 860,
    sizeSlug: "6x9",
    style: "Kilim",
    styleSlug: "kilim",
    color: "Sage",
    colorSlug: "sage",
    material: "Wool and hemp flatweave",
    origin: "Aydın, Turkey",
    warehouseId: "ga",
    palette: "sage bands on undyed hemp",
    dimensions: "6' × 9'",
  },
  "salon-oushak": {
    name: "Salon Oushak",
    price: 4600,
    sizeSlug: "9x12",
    style: "Oushak",
    styleSlug: "oushak",
    color: "Ivory",
    colorSlug: "ivory",
    material: "Hand-knotted wool",
    origin: "Uşak, Turkey",
    warehouseId: "tx",
    palette: "a large ivory field with widely spaced motifs",
    dimensions: "9' × 12'",
  },
  "entry-kilim": {
    name: "Entry Kilim",
    price: 280,
    sizeSlug: "2x3",
    style: "Kilim",
    styleSlug: "kilim",
    color: "Terracotta",
    colorSlug: "terracotta",
    material: "Flatweave wool",
    origin: "Malatya, Turkey",
    warehouseId: "ca",
    palette: "a small terracotta diamond and a dark border",
    dimensions: "2' × 3'",
    inStock: false,
  },
  "coastal-stripe": {
    name: "Coastal Stripe",
    price: 720,
    sizeSlug: "3x5",
    style: "Modern",
    styleSlug: "modern",
    color: "Blue",
    colorSlug: "blue",
    material: "Flatweave wool",
    origin: "Izmir, Turkey",
    warehouseId: "nj",
    palette: "wide blue and ivory stripes",
    dimensions: "3' × 5'",
  },
  "library-grid": {
    name: "Library Grid",
    price: 1540,
    sizeSlug: "8x10",
    style: "Modern",
    styleSlug: "modern",
    color: "Charcoal",
    colorSlug: "charcoal",
    material: "Hand-knotted wool",
    origin: "Kayseri, Turkey",
    warehouseId: "ga",
    palette: "a charcoal lattice on a warm gray field",
    dimensions: "8' × 10'",
  },
};

const furnitureSeeds: Record<string, Seed> = {
  "linen-lounge-chair": {
    name: "Linen Lounge Chair",
    price: 1280,
    style: "Lounge",
    color: "Ivory",
    material: "Oak frame and linen",
    origin: "Upholstered in North Carolina",
    warehouseId: "nj",
    palette: "ivory linen with a low oak arm",
    dimensions: "32\" wide × 34\" deep × 31\" high",
  },
  "oak-coffee-table": {
    name: "Oak Coffee Table",
    price: 890,
    style: "Table",
    color: "Natural",
    material: "Solid white oak",
    origin: "Made in the United States",
    warehouseId: "ga",
    palette: "straight white oak with a soft matte oil",
    dimensions: "48\" wide × 24\" deep × 16\" high",
  },
  "walnut-sideboard": {
    name: "Walnut Sideboard",
    price: 2140,
    style: "Storage",
    color: "Walnut",
    material: "Solid walnut",
    origin: "Made in the United States",
    warehouseId: "tx",
    palette: "a long walnut case with two banks of doors",
    dimensions: "72\" wide × 18\" deep × 32\" high",
  },
  "boucle-sofa": {
    name: "Boucle Sofa",
    price: 2680,
    style: "Seating",
    color: "Ivory",
    material: "Kiln-dried frame and boucle",
    origin: "Upholstered in North Carolina",
    warehouseId: "ca",
    palette: "ivory boucle on a low, deep seat",
    dimensions: "84\" wide × 38\" deep × 31\" high",
  },
  "travertine-side-table": {
    name: "Travertine Side Table",
    price: 540,
    style: "Table",
    color: "Stone",
    material: "Travertine and oak",
    origin: "Stone top, U.S. oak base",
    warehouseId: "nj",
    palette: "a honed travertine top on a square oak base",
    dimensions: "18\" wide × 18\" deep × 22\" high",
  },
  "oak-bench": {
    name: "Oak Bench",
    price: 460,
    style: "Seating",
    color: "Natural",
    material: "Solid white oak",
    origin: "Made in the United States",
    warehouseId: "ga",
    palette: "a plain oak bench with a slightly eased edge",
    dimensions: "60\" wide × 14\" deep × 18\" high",
  },
};

function reviewsFor(index: number): Review[] {
  return [reviewBank[index % reviewBank.length], reviewBank[(index + 3) % reviewBank.length]];
}

function toProduct(slug: string, seed: Seed, index: number, kind: "rug" | "furniture"): Product {
  const size = seed.sizeSlug ? getSize(seed.sizeSlug) : undefined;
  const warehouse = getWarehouse(seed.warehouseId);
  const sizeLabel = size?.label ?? seed.dimensions;
  const folder = kind === "rug" ? "rugs" : "furniture";
  const image = `/images/${folder}/${slug}.png`;
  const month = String((index % 8) + 1).padStart(2, "0");
  const description =
    kind === "rug"
      ? `${seed.name} is a ${seed.material.toLowerCase()} ${seed.style.toLowerCase()} rug from ${seed.origin}, with ${seed.palette}. It measures ${sizeLabel} and ships from our ${warehouse.name} in ${warehouse.city}, ${warehouse.region}.`
      : `${seed.name} is ${seed.material.toLowerCase()}, ${seed.palette}. It measures ${seed.dimensions} and ships from our ${warehouse.name} in ${warehouse.city}, ${warehouse.region}.`;

  return {
    id: `wl-${kind}-${index + 1}`,
    slug,
    name: seed.name,
    kind,
    price: seed.price,
    sku: `WL-${kind === "rug" ? "R" : "F"}-${1001 + index}`,
    image,
    imageAlt: `${seed.name}, ${seed.material.toLowerCase()} in ${seed.color.toLowerCase()}, ${sizeLabel}`,
    width: imageSize.product.width,
    height: imageSize.product.height,
    description,
    details: [
      `${seed.material}, made for rooms with daily traffic.`,
      `Ships from ${warehouse.city}, ${warehouse.region}. Freight is free on rugs over $1,500 within the continental United States.`,
      "Sizes are listed in feet and inches. Measure your floor before you order.",
    ],
    sizeLabel,
    sizeSlug: seed.sizeSlug,
    style: seed.style,
    styleSlug: seed.styleSlug,
    color: seed.color,
    colorSlug: seed.colorSlug,
    material: seed.material,
    origin: seed.origin,
    dimensions: seed.dimensions,
    warehouseId: seed.warehouseId,
    inStock: seed.inStock !== false,
    rating: 4.6 + (index % 4) * 0.1,
    reviewCount: 11 + (index % 17),
    reviews: reviewsFor(index),
    added: `2026-${month}-15`,
    featuredRank: index + 1,
    serviceSlugs:
      kind === "rug"
        ? ["rug-cleaning", "rug-repair", "custom-sizing", "pickup-and-delivery"]
        : ["pickup-and-delivery"],
    href: kind === "rug" ? `/rugs/${slug}` : `/furniture/${slug}`,
  };
}

function build(list: string[], seeds: Record<string, Seed>, kind: "rug" | "furniture"): Product[] {
  return list.map((slug, index) => {
    const seed = seeds[slug];
    if (!seed) throw new Error(`Missing ${kind} seed for ${slug}`);
    return toProduct(slug, seed, index, kind);
  });
}

export const rugs: Product[] = build(slugs.rugs, rugSeeds, "rug");
export const furniture: Product[] = build(slugs.furniture, furnitureSeeds, "furniture");
export const products: Product[] = [...rugs, ...furniture];

export function getProducts(): Product[] {
  return products;
}

export function getRugs(): Product[] {
  return rugs;
}

export function getFurniture(): Product[] {
  return furniture;
}

export function getProduct(slug: string): Product | undefined {
  return products.find((item) => item.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const pool = product.kind === "rug" ? rugs : furniture;
  const same = pool.filter((item) => item.slug !== product.slug && item.styleSlug && item.styleSlug === product.styleSlug);
  const rest = pool.filter((item) => item.slug !== product.slug && item.styleSlug !== product.styleSlug);
  return [...same, ...rest].slice(0, limit);
}

export function getProductsBySlugs(list: string[]): Product[] {
  return list.flatMap((slug) => {
    const product = getProduct(slug);
    return product ? [product] : [];
  });
}
