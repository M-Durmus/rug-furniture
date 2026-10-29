import { Suspense } from "react";
import { notFound, permanentRedirect } from "next/navigation";
import { CatalogListing, listingMetadata } from "@/components/listing/CatalogListing";
import { ListingSkeleton } from "@/components/listing/ListingSkeleton";
import { ProductView } from "@/components/product/ProductView";
import { listingParamSlugs, type RawSearchParams } from "@/lib/catalog/listing";
import { productPath } from "@/lib/catalog/product-path";
import { getProductBySlug, getProducts } from "@/lib/data/catalog";
import { getFurniture, getProduct } from "@/lib/data/products";
import { buildMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<RawSearchParams> };

export async function generateStaticParams() {
  const [categories, catalog] = await Promise.all([
    listingParamSlugs("furniture-category"),
    getProducts({ type: "furniture" }, "title", { pageSize: 100 }),
  ]);
  const slugs = new Set<string>([
    ...categories,
    ...catalog.items.map((product) => product.slug),
    ...getFurniture().map((product) => product.slug),
  ]);
  return [...slugs].map((slug) => ({ slug }));
}

async function isCategory(slug: string) {
  const categories = await listingParamSlugs("furniture-category");
  return categories.includes(slug);
}

export async function generateMetadata({ params, searchParams }: Props) {
  const { slug } = await params;
  if (await isCategory(slug)) {
    return listingMetadata({
      section: "furniture",
      kind: "category",
      slug,
      searchParams: await searchParams,
    });
  }
  const previous = getProduct(slug);
  if (previous && previous.kind === "furniture") {
    return buildMetadata({
      title: previous.name,
      description: previous.description,
      path: previous.href,
    });
  }
  const product = await getProductBySlug(slug);
  if (!product || product.type !== "furniture") notFound();
  permanentRedirect(productPath(product));
}

async function FurnitureSlugContent({ params, searchParams }: Props) {
  const { slug } = await params;
  if (await isCategory(slug)) {
    return (
      <CatalogListing section="furniture" kind="category" slug={slug} searchParams={searchParams} />
    );
  }
  const previous = getProduct(slug);
  if (previous && previous.kind === "furniture") return <ProductView product={previous} />;
  const product = await getProductBySlug(slug);
  if (!product || product.type !== "furniture") notFound();
  permanentRedirect(productPath(product));
}

export default function FurnitureSlugPage(props: Props) {
  return (
    <Suspense fallback={<ListingSkeleton />}>
      <FurnitureSlugContent {...props} />
    </Suspense>
  );
}
