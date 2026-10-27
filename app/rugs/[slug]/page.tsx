import { notFound } from "next/navigation";
import { ProductView } from "@/components/product/ProductView";
import { getProduct, getRugs } from "@/lib/data/products";
import { buildMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getRugs().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product || product.kind !== "rug") notFound();
  return buildMetadata({ title: product.name, description: product.description, path: product.href });
}

export default async function RugPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product || product.kind !== "rug") notFound();
  return <ProductView product={product} />;
}
