import type { MetadataRoute } from "next";
import { colors, sizes, styles } from "@/lib/data/facets";
import { getFurniture, getRugs } from "@/lib/data/products";
import { getCities, getServices } from "@/lib/data/services";
import { getGuides, getPosts } from "@/lib/data/content";
import { PAGE_SIZE } from "@/lib/seo/listing";
import { absoluteUrl, site } from "@/lib/site";

const sections = ["products", "categories", "landings", "services", "local", "blog", "guides"] as const;
type SectionId = (typeof sections)[number];

export async function generateSitemaps() {
  return sections.map((id) => ({ id }));
}

function entry(path: string, changeFrequency: "weekly" | "monthly" | "yearly", priority: number): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(path),
    lastModified: site.updated,
    changeFrequency,
    priority,
  };
}

function withPages(path: string, count: number, priority: number): MetadataRoute.Sitemap {
  const urls = [entry(path, "weekly", priority)];
  const pages = Math.ceil(count / PAGE_SIZE);
  for (let page = 2; page <= pages; page += 1) urls.push(entry(`${path}?page=${page}`, "weekly", Math.max(0.4, priority - 0.2)));
  return urls;
}

function products(): MetadataRoute.Sitemap {
  return [...getRugs(), ...getFurniture()].map((product) => ({
    ...entry(product.href, "weekly", 0.8),
    images: [absoluteUrl(product.image)],
  }));
}

function categories(): MetadataRoute.Sitemap {
  return [
    entry("/", "weekly", 1),
    ...withPages("/rugs", getRugs().length, 0.9),
    ...withPages("/furniture", getFurniture().length, 0.8),
    entry("/about", "yearly", 0.4),
    entry("/contact", "yearly", 0.4),
    entry("/faq", "monthly", 0.5),
    entry("/shipping", "yearly", 0.4),
    entry("/privacy", "yearly", 0.2),
    entry("/terms", "yearly", 0.2),
    entry("/tools/rug-size-calculator", "monthly", 0.5),
  ];
}

function landings(): MetadataRoute.Sitemap {
  const groups = [
    ...sizes.map((facet) => ({ path: `/rugs/size/${facet.slug}`, count: getRugs().filter((rug) => rug.sizeSlug === facet.slug).length })),
    ...styles.map((facet) => ({ path: `/rugs/style/${facet.slug}`, count: getRugs().filter((rug) => rug.styleSlug === facet.slug).length })),
    ...colors.map((facet) => ({ path: `/rugs/color/${facet.slug}`, count: getRugs().filter((rug) => rug.colorSlug === facet.slug).length })),
  ];
  return groups.flatMap((group) => withPages(group.path, group.count, 0.7));
}

function serviceUrls(): MetadataRoute.Sitemap {
  return [entry("/services", "monthly", 0.7), ...getServices().map((service) => entry(`/services/${service.slug}`, "monthly", 0.7))];
}

function localUrls(): MetadataRoute.Sitemap {
  return getServices().flatMap((service) => getCities().map((city) => entry(`/services/${service.slug}/${city.slug}`, "monthly", 0.6)));
}

function blogUrls(): MetadataRoute.Sitemap {
  return [entry("/blog", "weekly", 0.6), ...getPosts().map((post) => entry(`/blog/${post.slug}`, "monthly", 0.6))];
}

function guideUrls(): MetadataRoute.Sitemap {
  return [entry("/guides", "monthly", 0.6), ...getGuides().map((guide) => entry(`/guides/${guide.slug}`, "monthly", 0.6))];
}

const builders: Record<SectionId, () => MetadataRoute.Sitemap> = {
  products,
  categories,
  landings,
  services: serviceUrls,
  local: localUrls,
  blog: blogUrls,
  guides: guideUrls,
};

export default async function sitemap(props: { id: Promise<string> }): Promise<MetadataRoute.Sitemap> {
  const id = (await props.id) as SectionId;
  const build = builders[id];
  return build ? build() : [];
}
