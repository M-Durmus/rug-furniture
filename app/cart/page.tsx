import { CatalogCart } from "@/components/cart/CatalogCart";
import type { CartCatalogProduct, CartSuggestion } from "@/components/cart/types";
import { Container } from "@/components/ui/Container";
import { productPath } from "@/lib/catalog/product-path";
import { getProducts } from "@/lib/data/catalog";
import { buildMetadata } from "@/lib/seo/metadata";
import type { Product } from "@/types";

export const metadata = buildMetadata({
  title: "Cart",
  description: "Review rugs and furniture in your Wool & Loom cart. This page is not indexed.",
  path: "/cart",
  index: false,
});

function furnitureKind(category: string): "sofa" | "table" | "chair" | "side" {
  if (category === "coffee-tables") return "table";
  if (category === "accent-chairs") return "chair";
  if (category === "side-tables") return "side";
  return "sofa";
}

function toCatalog(product: Product): CartCatalogProduct {
  return {
    id: product.id,
    title: product.title,
    href: productPath(product),
    colors: product.colors.map((color) => color.hex),
    subject: product.type,
    furniture: product.type === "furniture" ? furnitureKind(product.category) : undefined,
    style: product.style,
    image: product.images[0],
    stock: product.stock,
  };
}

export default async function CartPage() {
  const page = await getProducts({}, "title", { pageSize: 200 });
  const swatch = page.items.find((product) => product.type === "rug");
  const suggestions: CartSuggestion[] = [
    {
      title: "Free swatch",
      text: "Wool swatches ship free. Open a rug and choose Order a free swatch. The swatch is not a charge.",
      href: swatch ? productPath(swatch) : "/rugs",
      action: "Order a free swatch",
    },
    {
      title: "Rug pad",
      text: "A pad is cut to the rug size. Ask for one with the order. It is quoted, and it is not a flat price on this page.",
      href: "/contact",
      action: "Ask about a pad",
    },
  ];

  return (
    <Container className="py-10 pb-16">
      <h1 className="text-h1">Cart</h1>
      <CatalogCart products={page.items.map(toCatalog)} suggestions={suggestions} />
    </Container>
  );
}
