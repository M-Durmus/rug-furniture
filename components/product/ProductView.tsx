import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FramedImage } from "@/components/media/FramedImage";
import { ProductActions } from "@/components/product/ProductActions";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { RelatedServices } from "@/components/product/RelatedServices";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { getWarehouse } from "@/lib/data/facets";
import { getRelatedProducts } from "@/lib/data/products";
import { getServicesBySlugs } from "@/lib/data/services";
import type { Product } from "@/lib/data/types";
import { formatRating, formatUsd } from "@/lib/format";
import { productJsonLd } from "@/lib/seo/jsonld";
import { imageSizes } from "@/lib/site";

export function ProductView({ product }: { product: Product }) {
  const warehouse = getWarehouse(product.warehouseId);
  const related = getRelatedProducts(product);
  const services = getServicesBySlugs(product.serviceSlugs);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: product.kind === "rug" ? "Rugs" : "Furniture", path: product.kind === "rug" ? "/rugs" : "/furniture" },
    { name: product.name, path: product.href },
  ];

  return (
    <Container className="py-10">
      <JsonLd data={productJsonLd(product)} />
      <Breadcrumbs items={crumbs} />
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <FramedImage
          src={product.image}
          alt={product.imageAlt}
          width={product.width}
          height={product.height}
          sizes={imageSizes.gallery}
          priority
        />
        <div>
          <h1 className="font-serif text-5xl leading-tight">{product.name}</h1>
          <p className="mt-3 text-lg">{formatUsd(product.price)}</p>
          <p className="mt-2 text-sm text-muted">
            {formatRating(product.rating)} out of 5 from {product.reviewCount} reviews
          </p>
          <p className="mt-4 max-w-xl leading-7">{product.description}</p>
          <dl className="mt-6 grid gap-3 text-sm">
            <div className="grid grid-cols-[8rem_1fr] gap-3">
              <dt>Size</dt>
              <dd>
                {product.sizeSlug ? (
                  <Link href={`/rugs/size/${product.sizeSlug}`} className="underline underline-offset-4">
                    {product.sizeLabel}
                  </Link>
                ) : (
                  product.dimensions
                )}
              </dd>
            </div>
            <div className="grid grid-cols-[8rem_1fr] gap-3">
              <dt>Style</dt>
              <dd>
                {product.styleSlug ? (
                  <Link href={`/rugs/style/${product.styleSlug}`} className="underline underline-offset-4">
                    {product.style}
                  </Link>
                ) : (
                  product.style
                )}
              </dd>
            </div>
            <div className="grid grid-cols-[8rem_1fr] gap-3">
              <dt>Color</dt>
              <dd>
                {product.colorSlug ? (
                  <Link href={`/rugs/color/${product.colorSlug}`} className="underline underline-offset-4">
                    {product.color}
                  </Link>
                ) : (
                  product.color
                )}
              </dd>
            </div>
            <div className="grid grid-cols-[8rem_1fr] gap-3">
              <dt>Material</dt>
              <dd>{product.material}</dd>
            </div>
            <div className="grid grid-cols-[8rem_1fr] gap-3">
              <dt>Origin</dt>
              <dd>{product.origin}</dd>
            </div>
            <div className="grid grid-cols-[8rem_1fr] gap-3">
              <dt>Warehouse</dt>
              <dd>
                {warehouse.name}, {warehouse.city}, {warehouse.region}
              </dd>
            </div>
            <div className="grid grid-cols-[8rem_1fr] gap-3">
              <dt>SKU</dt>
              <dd>{product.sku}</dd>
            </div>
          </dl>
          <ProductActions
            slug={product.slug}
            name={product.name}
            price={product.price}
            image={product.image}
            imageAlt={product.imageAlt}
            href={product.href}
            inStock={product.inStock}
          />
          <p className="max-w-xl text-sm leading-6">
            {product.inStock
              ? `In stock at our ${warehouse.city} warehouse.`
              : "Sold out in our current stock. Ask us about a similar piece."}
          </p>
        </div>
      </div>
      <section className="mt-12 max-w-3xl" aria-labelledby="details-heading">
        <h2 id="details-heading" className="font-serif text-3xl">
          Details
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          {product.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      </section>
      <section className="mt-12" aria-labelledby="reviews-heading">
        <h2 id="reviews-heading" className="font-serif text-3xl">
          Reviews
        </h2>
        <p className="mt-2 text-sm">Showing {product.reviews.length} of {product.reviewCount} reviews.</p>
        <ul className="mt-4 grid gap-4 md:grid-cols-2">
          {product.reviews.map((review) => (
            <li key={`${review.author}-${review.date}`} className="border border-line p-4">
              <h3 className="font-medium">{review.title}</h3>
              <p className="text-sm text-muted">
                {review.author} · {review.rating} out of 5 · {review.date}
              </p>
              <p className="mt-2">{review.body}</p>
            </li>
          ))}
        </ul>
      </section>
      <RelatedServices services={services} />
      <RelatedProducts products={related} title={product.kind === "rug" ? "Related rugs" : "Related furniture"} />
    </Container>
  );
}
