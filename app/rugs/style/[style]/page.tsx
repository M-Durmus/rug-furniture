import { ListingRoute, listingMetadata } from "@/components/listing/ListingRoute";
import { styles } from "@/lib/data/facets";
import type { RawSearchParams } from "@/lib/seo/listing";

type Props = { params: Promise<{ style: string }>; searchParams: Promise<RawSearchParams> };

export function generateStaticParams() {
  return styles.map((style) => ({ style: style.slug }));
}

export async function generateMetadata({ params, searchParams }: Props) {
  const { style } = await params;
  return listingMetadata({ kind: "style", basePath: `/rugs/style/${style}`, locked: { key: "style", value: style }, searchParams });
}

export default async function StylePage({ params, searchParams }: Props) {
  const { style } = await params;
  return <ListingRoute kind="style" basePath={`/rugs/style/${style}`} locked={{ key: "style", value: style }} searchParams={searchParams} />;
}
