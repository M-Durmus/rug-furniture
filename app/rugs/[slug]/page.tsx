import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CatalogListing, listingMetadata } from "@/components/listing/CatalogListing";
import { ListingSkeleton } from "@/components/listing/ListingSkeleton";
import { ProductDetail, productMetadata } from "@/components/product/ProductDetail";
import { ProductView } from "@/components/product/ProductView";
import { listingParamSlugs, type RawSearchParams } from "@/lib/catalog/listing";
import { getProductBySlug, getProducts } from "@/lib/data/catalog";
import { getProduct, getRugs } from "@/lib/data/products";
import { buildMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<RawSearchParams> };

export async function generateStaticParams() {
  const [categories, catalog] = await Promise.all([
    listingParamSlugs("rug-category"),
    getProducts({ type: "rug" }, "title", { pageSize: 100 }),
  ]);
  const slugs = new Set<string>([
    ...categories,
    ...catalog.items.map((product) => product.slug),
    ...getRugs().map((product) => product.slug),
  ]);
  return [...slugs].map((slug) => ({ slug }));
}

async function isCategory(slug: string) {
  const categories = await listingParamSlugs("rug-category");
  return categories.includes(slug);
}

export async function generateMetadata({ params, searchParams }: Props) {
  const { slug } = await params;
  if (await isCategory(slug)) {
    return listingMetadata({
      section: "rugs",
      kind: "category",
      slug,
      searchParams: await searchParams,
    });
  }
  const previous = getProduct(slug);
  if (previous && previous.kind === "rug") {
    return buildMetadata({
      title: previous.name,
      description: previous.description,
      path: previous.href,
    });
  }
  const product = await getProductBySlug(slug);
  if (!product || product.type !== "rug") notFound();
  return productMetadata(product);
}

async function RugSlugContent({ params, searchParams }: Props) {
  const { slug } = await params;
  if (await isCategory(slug)) {
    return (
      <CatalogListing section="rugs" kind="category" slug={slug} searchParams={searchParams} />
    );
  }
  const previous = getProduct(slug);
  if (previous && previous.kind === "rug") return <ProductView product={previous} />;
  const product = await getProductBySlug(slug);
  if (!product || product.type !== "rug") notFound();
  return <ProductDetail product={product} />;
}

export default function RugSlugPage(props: Props) {
  return (
    <Suspense fallback={<ListingSkeleton />}>
      <RugSlugContent {...props} />
    </Suspense>
  );
}
