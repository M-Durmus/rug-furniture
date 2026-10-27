import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { getProduct, getProducts } from "../lib/data/products";
import { getCity, getGuide, getPost, getService } from "../lib/data";
import { articleJsonLd, faqJsonLd, howToJsonLd, localServiceJsonLd, organizationAndWebsiteJsonLd, productJsonLd, serviceJsonLd } from "../lib/seo/jsonld";
import { buildListing } from "../lib/seo/listing";
import { getRugs } from "../lib/data/products";
import { getFaqs } from "../lib/data/content";

function assert(condition: unknown, message: string) {
  if (!condition) throw new Error(message);
}

const rugs = getRugs();

function listing(raw: Record<string, string>, extra?: { kind?: "rugs" | "furniture" | "style"; basePath?: string; locked?: { key: "style"; value: string } }) {
  return buildListing({
    kind: extra?.kind ?? "rugs",
    basePath: extra?.basePath ?? "/rugs",
    locked: extra?.locked,
    raw,
    products: extra?.kind === "furniture" ? getProducts().filter((item) => item.kind === "furniture") : rugs,
  });
}

const clean = listing({});
assert(clean.type === "ok" && clean.index && clean.canonicalPath === "/rugs", "clean /rugs should be indexable");

const pageOne = listing({ page: "1" });
assert(pageOne.type === "redirect" && pageOne.to === "/rugs", "page=1 should redirect to /rugs");

const pageTwo = listing({ page: "2" });
assert(pageTwo.type === "ok" && pageTwo.index && pageTwo.canonicalPath === "/rugs?page=2" && pageTwo.relPrev === "/rugs", "page 2 should be self-canonical");

const pageThree = listing({ page: "3" });
assert(pageThree.type === "notFound", "page 3 should 404");

const sorted = listing({ sort: "price-asc" });
assert(sorted.type === "ok" && !sorted.index && sorted.canonicalPath === "/rugs", "sort should be noindex and canonical to /rugs");

const defaultSort = listing({ sort: "featured" });
assert(defaultSort.type === "redirect" && defaultSort.to === "/rugs", "default sort should redirect");

const oneFacet = listing({ style: "persian" });
assert(oneFacet.type === "redirect" && oneFacet.to === "/rugs/style/persian", "single facet should redirect to its landing page");

const facetAndSort = listing({ style: "persian", sort: "price-asc" });
assert(facetAndSort.type === "redirect" && facetAndSort.to === "/rugs/style/persian?sort=price-asc", "single facet keeps a real sort");

const twoFacets = listing({ style: "persian", color: "ivory" });
assert(twoFacets.type === "ok" && !twoFacets.index && twoFacets.canonicalPath === "/rugs", "combined facets should be noindex");

const landing = listing({ color: "ivory" }, { kind: "style", basePath: "/rugs/style/persian", locked: { key: "style", value: "persian" } });
assert(landing.type === "ok" && !landing.index && landing.canonicalPath === "/rugs/style/persian", "extra facet on a landing page should canonical to that page");

const landingPage = listing({ page: "2" }, { kind: "style", basePath: "/rugs/style/persian", locked: { key: "style", value: "persian" } });
assert(landingPage.type === "notFound" || (landingPage.type === "ok" && landingPage.index), "landing pagination is indexable when that page exists");

const furnitureNoise = listing({ color: "blue" }, { kind: "furniture", basePath: "/furniture" });
assert(furnitureNoise.type === "redirect" && furnitureNoise.to === "/furniture", "furniture ignores rug facets");

const product = getProduct("sivas-medallion");
assert(product, "missing sivas");
const productSchema = productJsonLd(product!);
assert(productSchema.offers["@type"] === "Offer", "Offer");
assert(productSchema.aggregateRating["@type"] === "AggregateRating", "AggregateRating");
assert(productSchema.review[0]?.["@type"] === "Review", "Review");

const service = getService("rug-cleaning");
const city = getCity("newark");
assert(service && city, "missing service city");
const local = localServiceJsonLd(service!, city!);
assert(local["@graph"].some((node) => node["@type"] === "Service"), "Service");
assert(local["@graph"].some((node) => node["@type"] === "LocalBusiness"), "LocalBusiness");
assert(serviceJsonLd(service!).offers["@type"] === "Offer", "service offer");

const post = getPost("wool-pile-in-a-busy-room");
assert(post && articleJsonLd(post)["@type"] === "Article", "Article");
const guide = getGuide("measure-for-a-rug");
assert(guide && howToJsonLd(guide).step.length > 0, "HowTo");
assert(faqJsonLd(getFaqs()).mainEntity.length > 0, "FAQPage");
const siteGraph = organizationAndWebsiteJsonLd();
assert(siteGraph["@graph"].some((node) => node["@type"] === "Organization"), "Organization");
assert(siteGraph["@graph"].some((node) => node["@type"] === "WebSite" && node.potentialAction["@type"] === "SearchAction"), "WebSite SearchAction");

for (const item of getProducts()) {
  assert(existsSync(join(process.cwd(), "public", item.image)), `missing image ${item.image}`);
}

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return walk(path);
    return path.endsWith(`${join("app", "page.tsx")}`.slice(1)) || name === "page.tsx" || name === "not-found.tsx" ? [path] : [];
  });
}

const routes = walk(join(process.cwd(), "app")).filter((path) => path.endsWith("page.tsx") || path.endsWith("not-found.tsx"));
for (const route of routes) {
  const source = readFileSync(route, "utf8");
  assert(/export (const metadata|async function generateMetadata|function generateMetadata)/.test(source), `${route} is missing metadata`);
}

const robots = readFileSync(join(process.cwd(), "app", "robots.ts"), "utf8");
for (const path of ["/cart", "/checkout", "/account", "/design", "/search"]) {
  assert(robots.includes(path), `robots missing ${path}`);
}

const sitemap = readFileSync(join(process.cwd(), "app", "sitemap.ts"), "utf8");
for (const section of ["products", "categories", "landings", "services", "local", "blog", "guides"]) {
  assert(sitemap.includes(`"${section}"`), `sitemap missing ${section}`);
}

console.log(`SEO checks passed for ${routes.length} routes`);
