export type {
  City,
  Faq,
  Guide,
  NavLink,
  Post,
  Product,
  Review,
  Service,
  Warehouse,
} from "@/lib/data/types";

export {
  colors,
  getColor,
  getSize,
  getStyle,
  getWarehouse,
  sizes,
  styles,
  warehouses,
} from "@/lib/data/facets";
export {
  furniture,
  getFurniture,
  getProduct,
  getProducts,
  getProductsBySlugs,
  getRelatedProducts,
  getRugs,
  products,
  rugs,
} from "@/lib/data/products";
export {
  cities,
  getCities,
  getCity,
  getNearbyCities,
  getService,
  getServices,
  getServicesBySlugs,
  getWarehouseForCity,
  services,
} from "@/lib/data/services";
export {
  faqs,
  footerGroups,
  getFaqs,
  getGuide,
  getGuides,
  getPost,
  getPosts,
  guides,
  popularLinks,
  posts,
} from "@/lib/data/content";

export * as catalog from "@/lib/data/catalog";

import { getGuides, getPosts } from "@/lib/data/content";
import { getProducts } from "@/lib/data/products";

export function searchCatalog(query: string) {
  const needle = query.trim().toLowerCase();
  if (!needle) return { products: [], posts: [], guides: [] };
  const matches = (parts: Array<string | undefined>) =>
    parts.filter(Boolean).join(" ").toLowerCase().includes(needle);
  return {
    products: getProducts().filter((item) =>
      matches([
        item.name,
        item.description,
        item.style,
        item.color,
        item.material,
        item.origin,
        item.sizeLabel,
      ]),
    ),
    posts: getPosts().filter((item) =>
      matches([
        item.title,
        item.excerpt,
        ...item.sections.flatMap((section) => section.paragraphs),
      ]),
    ),
    guides: getGuides().filter((item) => matches([item.title, item.excerpt, item.intro.join(" ")])),
  };
}
