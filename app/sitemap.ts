import type { MetadataRoute } from "next";
import { listingParamSlugs } from "@/lib/catalog/listing";
import { productPath } from "@/lib/catalog/product-path";
import { getBlogPosts, getProducts, getServices } from "@/lib/data/catalog";
import { getFurniture, getRugs } from "@/lib/data/products";
import { localServicePath, listServedCities, SERVICE_SLUGS } from "@/lib/catalog/service-area";
import { getGuides, getPosts } from "@/lib/data/content";
import { absoluteUrl, site } from "@/lib/site";

const sections = [
  "products",
  "categories",
  "landings",
  "services",
  "local",
  "blog",
  "guides",
] as const;
type SectionId = (typeof sections)[number];

export async function generateSitemaps() {
  return sections.map((id) => ({ id }));
}

function entry(
  path: string,
  changeFrequency: "weekly" | "monthly" | "yearly",
  priority: number,
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(path),
    lastModified: site.updated,
    changeFrequency,
    priority,
  };
}

async function products(): Promise<MetadataRoute.Sitemap> {
  const previous = [...getRugs(), ...getFurniture()].map((product) => ({
    ...entry(product.href, "weekly", 0.8),
    images: [absoluteUrl(product.image)],
  }));
  const seen = new Set(previous.map((item) => item.url));
  const catalog = await getProducts({}, "title", { pageSize: 200 });
  const added = catalog.items.flatMap((product) => {
    const path = productPath(product);
    const url = absoluteUrl(path);
    if (seen.has(url)) return [];
    return [entry(path, "weekly", 0.8)];
  });
  return [...previous, ...added];
}

async function categories(): Promise<MetadataRoute.Sitemap> {
  const [rugCategories, furnitureCategories] = await Promise.all([
    listingParamSlugs("rug-category"),
    listingParamSlugs("furniture-category"),
  ]);
  return [
    entry("/", "weekly", 1),
    entry("/rugs", "weekly", 0.9),
    ...rugCategories.map((slug) => entry(`/rugs/${slug}`, "weekly", 0.8)),
    entry("/furniture", "weekly", 0.8),
    ...furnitureCategories.map((slug) => entry(`/furniture/${slug}`, "weekly", 0.8)),
    entry("/about", "yearly", 0.4),
    entry("/contact", "yearly", 0.4),
    entry("/faq", "monthly", 0.5),
    entry("/shipping", "yearly", 0.4),
    entry("/privacy", "yearly", 0.2),
    entry("/terms", "yearly", 0.2),
    entry("/tools/rug-size-calculator", "monthly", 0.5),
    entry("/trade-program", "monthly", 0.5),
    entry("/room-preview", "monthly", 0.4),
    entry("/inspiration", "weekly", 0.5),
    entry("/reviews", "monthly", 0.4),
    entry("/help", "monthly", 0.4),
    entry("/help/shipping", "yearly", 0.3),
    entry("/help/returns", "yearly", 0.3),
    entry("/help/faq", "monthly", 0.4),
    entry("/accessibility", "yearly", 0.2),
  ];
}

async function landings(): Promise<MetadataRoute.Sitemap> {
  const [size, style, color, room] = await Promise.all([
    listingParamSlugs("size"),
    listingParamSlugs("style"),
    listingParamSlugs("color"),
    listingParamSlugs("room"),
  ]);
  return [
    ...size.map((slug) => entry(`/rugs/size/${slug}`, "weekly", 0.7)),
    ...style.map((slug) => entry(`/rugs/style/${slug}`, "weekly", 0.7)),
    ...color.map((slug) => entry(`/rugs/color/${slug}`, "weekly", 0.7)),
    ...room.map((slug) => entry(`/rugs/room/${slug}`, "weekly", 0.7)),
  ];
}

async function serviceUrls(): Promise<MetadataRoute.Sitemap> {
  const services = await getServices();
  return [
    entry("/services", "monthly", 0.7),
    ...services
      .filter((service) => (SERVICE_SLUGS as readonly string[]).includes(service.slug))
      .map((service) => entry(`/services/${service.slug}`, "monthly", 0.7)),
  ];
}

async function localUrls(): Promise<MetadataRoute.Sitemap> {
  const services = await getServices();
  const cities = listServedCities();
  return services
    .filter((service) => (SERVICE_SLUGS as readonly string[]).includes(service.slug))
    .flatMap((service) =>
      cities.map((city) =>
        entry(localServicePath(service.slug, city.stateSlug, city.slug), "monthly", 0.6),
      ),
    );
}

async function blogUrls(): Promise<MetadataRoute.Sitemap> {
  const catalog = await getBlogPosts();
  const slugs = new Set([
    ...getPosts().map((post) => post.slug),
    ...catalog.map((post) => post.slug),
  ]);
  return [
    entry("/blog", "weekly", 0.6),
    ...[...slugs].map((slug) => entry(`/blog/${slug}`, "monthly", 0.6)),
  ];
}

function guideUrls(): MetadataRoute.Sitemap {
  return [
    entry("/guides", "monthly", 0.6),
    ...getGuides().map((guide) => entry(`/guides/${guide.slug}`, "monthly", 0.6)),
  ];
}

const builders: Record<SectionId, () => Promise<MetadataRoute.Sitemap>> = {
  products,
  categories,
  landings,
  services: serviceUrls,
  local: localUrls,
  blog: blogUrls,
  guides: async () => guideUrls(),
};

export default async function sitemap(props: {
  id: Promise<string>;
}): Promise<MetadataRoute.Sitemap> {
  const id = (await props.id) as SectionId;
  const build = builders[id];
  return build ? build() : [];
}
