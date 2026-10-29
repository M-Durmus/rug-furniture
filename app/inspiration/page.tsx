import { StyleGallery, type GalleryRug } from "@/components/inspiration/StyleGallery";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { productPath } from "@/lib/catalog/product-path";
import { getProducts } from "@/lib/data/catalog";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Inspiration",
  description:
    "A gallery of Wool & Loom Turkish rugs, filtered by style, from stock in four U.S. warehouses.",
  path: "/inspiration",
});

export default async function InspirationPage() {
  const page = await getProducts({ type: "rug" }, "title", { pageSize: 200 });
  const rugs: GalleryRug[] = page.items.map((product) => ({
    id: product.id,
    title: product.title,
    href: productPath(product),
    category: product.category,
    colors: product.colors.map((color) => color.hex),
    style: product.style,
  }));

  return (
    <Container className="py-10 pb-16">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Inspiration", path: "/inspiration" },
        ]}
      />
      <h1 className="text-h1">Inspiration</h1>
      <p className="mt-4 max-w-2xl">
        Styles we keep in stock. Filter the gallery, then open a rug for sizes in feet and the
        warehouse that holds it.
      </p>
      <StyleGallery rugs={rugs} />
    </Container>
  );
}
