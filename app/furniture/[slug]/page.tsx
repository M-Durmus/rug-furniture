import { notFound } from "next/navigation";
import { ProductView } from "@/components/product/ProductView";
import { getFurniture, getProduct } from "@/lib/data/products";
import { buildMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getFurniture().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product || product.kind !== "furniture") notFound();
  return buildMetadata({ title: product.name, description: product.description, path: product.href });
}

export default async function FurnitureProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product || product.kind !== "furniture") notFound();
  return <ProductView product={product} />;
}
