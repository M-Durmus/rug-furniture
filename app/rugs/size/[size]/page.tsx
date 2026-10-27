import { ListingRoute, listingMetadata } from "@/components/listing/ListingRoute";
import { sizes } from "@/lib/data/facets";
import type { RawSearchParams } from "@/lib/seo/listing";

type Props = { params: Promise<{ size: string }>; searchParams: Promise<RawSearchParams> };

export function generateStaticParams() {
  return sizes.map((size) => ({ size: size.slug }));
}

export async function generateMetadata({ params, searchParams }: Props) {
  const { size } = await params;
  return listingMetadata({ kind: "size", basePath: `/rugs/size/${size}`, locked: { key: "size", value: size }, searchParams });
}

export default async function SizePage({ params, searchParams }: Props) {
  const { size } = await params;
  return <ListingRoute kind="size" basePath={`/rugs/size/${size}`} locked={{ key: "size", value: size }} searchParams={searchParams} />;
}
