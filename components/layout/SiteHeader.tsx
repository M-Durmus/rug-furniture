import { HeaderChrome } from "@/components/layout/HeaderChrome";
import type { CartProductInfo, SearchEntry, ServiceLink } from "@/components/layout/chrome";
import { getPost } from "@/lib/data/content";
import { getBlogPosts, getCategories, getProducts, getServices } from "@/lib/data/catalog";
import { getProduct } from "@/lib/data/products";

const categoryHref: Record<string, string> = {
  rugs: "/rugs",
  furniture: "/furniture",
  oushak: "/rugs/style/oushak",
  vintage: "/rugs/style/vintage",
  runner: "/rugs/size/2x8",
  washable: "/search?q=washable",
  turkish: "/rugs",
  "persian-style": "/rugs/style/persian",
  sofas: "/search?q=sofa",
  "coffee-tables": "/search?q=coffee",
  "accent-chairs": "/search?q=chair",
  "side-tables": "/search?q=side+table",
};

function furnitureKind(category: string): CartProductInfo["furniture"] {
  if (category === "sofas") return "sofa";
  if (category === "coffee-tables") return "table";
  if (category === "accent-chairs") return "chair";
  if (category === "side-tables") return "side";
  return undefined;
}

export async function SiteHeader() {
  const [page, categories, services, posts] = await Promise.all([
    getProducts({}, "title", { pageSize: 100 }),
    getCategories(),
    getServices(),
    getBlogPosts(),
  ]);

  const entries: SearchEntry[] = [
    ...page.items.map((product) => ({
      id: product.id,
      kind: "Product" as const,
      title: product.title,
      href: getProduct(product.slug)?.href ?? (product.type === "rug" ? "/rugs" : "/furniture"),
      text: `${product.category} ${product.style} ${product.material}`,
    })),
    ...categories.map((category) => ({
      id: category.id,
      kind: "Category" as const,
      title: category.name,
      href: categoryHref[category.slug] ?? (category.type === "rug" ? "/rugs" : "/furniture"),
      text: category.intro,
    })),
    ...services.map((service) => ({
      id: service.id,
      kind: "Service" as const,
      title: service.name,
      href: `/services/${service.slug}`,
      text: service.shortDescription,
    })),
    ...posts.map((post) => ({
      id: post.id,
      kind: "Journal" as const,
      title: post.title,
      href: getPost(post.slug) ? `/blog/${post.slug}` : "/blog",
      text: post.excerpt,
    })),
  ];

  const products: CartProductInfo[] = page.items.map((product) => ({
    id: product.id,
    title: product.title,
    href: getProduct(product.slug)?.href ?? (product.type === "rug" ? "/rugs" : "/furniture"),
    subject: product.type,
    furniture: product.type === "furniture" ? furnitureKind(product.category) : undefined,
    colors: product.colors.map((color) => color.hex),
    style: product.style,
  }));

  const serviceLinks: ServiceLink[] = services.map((service) => ({
    slug: service.slug,
    name: service.name,
    shortDescription: service.shortDescription,
  }));

  return <HeaderChrome entries={entries} products={products} services={serviceLinks} />;
}
