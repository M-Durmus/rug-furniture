import { ListingRoute, listingMetadata } from "@/components/listing/ListingRoute";
import { colors } from "@/lib/data/facets";
import type { RawSearchParams } from "@/lib/seo/listing";

type Props = { params: Promise<{ color: string }>; searchParams: Promise<RawSearchParams> };

export function generateStaticParams() {
  return colors.map((color) => ({ color: color.slug }));
}

export async function generateMetadata({ params, searchParams }: Props) {
  const { color } = await params;
  return listingMetadata({ kind: "color", basePath: `/rugs/color/${color}`, locked: { key: "color", value: color }, searchParams });
}

export default async function ColorPage({ params, searchParams }: Props) {
  const { color } = await params;
  return <ListingRoute kind="color" basePath={`/rugs/color/${color}`} locked={{ key: "color", value: color }} searchParams={searchParams} />;
}
