import Link from "next/link";
import { feetLabel } from "@/components/home/ProductCard";
import type { FurnitureKind } from "@/components/media/FurnitureArt";
import { ProductShelf, type ShelfItem } from "@/components/product/ProductShelf";
import { ProductStage, type SizeQuote } from "@/components/product/ProductStage";
import { RecentlyViewed } from "@/components/product/RecentlyViewed";
import { ReviewsSection } from "@/components/product/ReviewsSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Tabs } from "@/components/ui/Tabs";
import { productPath } from "@/lib/catalog/product-path";
import {
  getCategoryBySlug,
  getProducts,
  getRelatedProducts,
  getReviews,
  getServices,
  getSizePrices,
} from "@/lib/data/catalog";
import { catalogProductJsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";
import type { Product, ProductSize } from "@/types";

function furnitureKind(category: string): FurnitureKind {
  if (category === "coffee-tables") return "table";
  if (category === "accent-chairs") return "chair";
  if (category === "side-tables") return "side";
  return "sofa";
}

function careFor(product: Product): string {
  if (product.washable) return "Wash cold in a home machine and dry flat. Skip the dryer.";
  if (product.type === "furniture") {
    return "Dust with a dry cloth. Keep wood finishes away from standing water. Repair is priced by quote.";
  }
  return "Vacuum with the pile, never against it. Rotate the rug once a season. Professional cleaning and repair are priced by quote.";
}

async function pricedSize(
  product: Product,
): Promise<{ size: ProductSize; list: number; pay: number }> {
  const target = product.salePrice ?? product.price;
  for (const size of product.sizes) {
    const prices = await getSizePrices(product.id, size.label);
    if (prices && prices.pay === target) return { size, ...prices };
  }
  const size = product.sizes[0];
  if (!size) throw new Error(`${product.slug} has no sizes`);
  const prices = await getSizePrices(product.id, size.label);
  return { size, list: prices?.list ?? product.price, pay: prices?.pay ?? target };
}

function toShelf(product: Product, size: ProductSize, list: number, pay: number): ShelfItem {
  const onSale = product.salePrice !== undefined && pay === product.salePrice;
  return {
    slug: product.slug,
    productId: product.id,
    title: product.title,
    href: productPath(product),
    price: pay,
    compareAt: onSale ? list : undefined,
    colors: product.colors.map((color) => color.hex),
    subject: product.type,
    furniture: product.type === "furniture" ? furnitureKind(product.category) : undefined,
    style: product.style,
    sizeLabel: feetLabel(size),
  };
}

export function productMetadata(product: Product) {
  return buildMetadata({
    title: product.seoTitle,
    description: product.seoDescription,
    path: productPath(product),
  });
}

export async function ProductDetail({ product }: { product: Product }) {
  const [category, reviews, related, catalog, services] = await Promise.all([
    getCategoryBySlug(product.category),
    getReviews({ targetType: "product", targetId: product.id }),
    getRelatedProducts(product.slug, 4),
    getProducts({}, "title", { pageSize: 200 }),
    getServices(),
  ]);
  const careSlugs =
    product.type === "rug"
      ? ["rug-cleaning", "rug-repair", "custom-sizing"]
      : ["pickup-and-delivery"];
  const care = services.filter((service) => careSlugs.includes(service.slug));
  const quotes: SizeQuote[] = [];
  for (const size of product.sizes) {
    const prices = await getSizePrices(product.id, size.label);
    if (!prices) continue;
    quotes.push({ label: size.label, widthFt: size.widthFt, lengthFt: size.lengthFt, ...prices });
  }
  const current = await pricedSize(product);
  const relatedCards = await Promise.all(
    related.map(async (item) => {
      const priced = await pricedSize(item);
      return toShelf(item, priced.size, priced.list, priced.pay);
    }),
  );
  const catalogCards = await Promise.all(
    catalog.items.map(async (item) => {
      const priced = await pricedSize(item);
      return toShelf(item, priced.size, priced.list, priced.pay);
    }),
  );
  const path = productPath(product);
  const section = product.type === "rug" ? "Rugs" : "Furniture";
  const sectionPath = product.type === "rug" ? "/rugs" : "/furniture";
  const crumbs = [
    { name: "Home", path: "/" },
    { name: section, path: sectionPath },
    ...(category && category.parentSlug
      ? [{ name: category.name, path: `${sectionPath}/${category.slug}` }]
      : []),
    { name: product.title, path },
  ];

  return (
    <Container className="py-8 pb-28 lg:py-12 lg:pb-16">
      <JsonLd
        data={catalogProductJsonLd({
          name: product.title,
          description: product.seoDescription,
          sku: product.id,
          path,
          image: product.images[0],
          price: product.salePrice ?? product.price,
          inStock: product.stock > 0,
          category: category?.name ?? section,
          rating: product.rating,
          reviewCount: product.reviewCount,
          reviews,
        })}
      />
      <Breadcrumbs items={crumbs} />
      <ProductStage product={product} quotes={quotes} initialSize={current.size.label} />
      <div className="mt-12">
        <Tabs
          label="Product details"
          tabs={[
            {
              id: "description",
              label: "Description",
              content: <p className="max-w-3xl">{product.description}</p>,
            },
            {
              id: "specifications",
              label: "Specifications",
              content: (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[20rem] max-w-xl text-left">
                  <caption className="sr-only">Specifications for {product.title}</caption>
                  <tbody>
                    {(
                      [
                        ["Material", product.material],
                        ["Origin", product.origin],
                        ["Pile", product.pile],
                        ["Style", product.style],
                        ["Care", careFor(product)],
                      ] as const
                    ).map(([label, value]) => (
                      <tr key={label} className="border-b border-line">
                        <th scope="row" className="w-32 py-2 font-medium">
                          {label}
                        </th>
                        <td className="py-2">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              ),
            },
            {
              id: "shipping",
              label: "Shipping and returns",
              content: (
                <div className="max-w-3xl space-y-3">
                  <p>Shipping is free in the continental United States.</p>
                  <p>
                    This piece leaves the {product.warehouse} warehouse in {product.deliveryDays}{" "}
                    business days, then travels by freight.
                  </p>
                  <p>You have 100 days to return an unused piece in the condition it arrived.</p>
                </div>
              ),
            },
          ]}
        />
      </div>
      <ReviewsSection rating={product.rating} reviewCount={product.reviewCount} reviews={reviews} />
      {care.length > 0 ? (
        <section className="mt-12" aria-labelledby="care-links">
          <h2 id="care-links" className="font-serif text-h2">
            Care for this piece
          </h2>
          <ul className="mt-4 grid gap-4 md:grid-cols-2">
            {care.map((service) => (
              <li key={service.slug} className="border border-line bg-card p-5">
                <h3 className="font-serif text-h3">
                  <Link href={`/services/${service.slug}`} className="underline underline-offset-4">
                    {service.name}
                  </Link>
                </h3>
                <p className="mt-2">{service.shortDescription} The price is a quote.</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      <ProductShelf title="You may also like" items={relatedCards} />
      <RecentlyViewed slug={product.slug} items={catalogCards} />
    </Container>
  );
}
