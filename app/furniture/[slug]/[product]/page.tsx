import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ListingSkeleton } from "@/components/listing/ListingSkeleton";
import { ProductDetail, productMetadata } from "@/components/product/ProductDetail";
import { getProductBySlug, getProducts } from "@/lib/data/catalog";

type Props = { params: Promise<{ slug: string; product: string }> };

export async function generateStaticParams() {
  const page = await getProducts({ type: "furniture" }, "title", { pageSize: 100 });
  return page.items.map((product) => ({ slug: product.category, product: product.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug, product: productSlug } = await params;
  const product = await getProductBySlug(productSlug);
  if (!product || product.type !== "furniture" || product.category !== slug) notFound();
  return productMetadata(product);
}

async function FurnitureProduct({ params }: Props) {
  const { slug, product: productSlug } = await params;
  const product = await getProductBySlug(productSlug);
  if (!product || product.type !== "furniture" || product.category !== slug) notFound();
  return <ProductDetail product={product} />;
}

export default function FurnitureProductPage(props: Props) {
  return (
    <Suspense fallback={<ListingSkeleton />}>
      <FurnitureProduct {...props} />
    </Suspense>
  );
}
