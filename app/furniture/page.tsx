import { ListingRoute, listingMetadata } from "@/components/listing/ListingRoute";
import type { RawSearchParams } from "@/lib/seo/listing";

type Props = { searchParams: Promise<RawSearchParams> };

export function generateMetadata({ searchParams }: Props) {
  return listingMetadata({ kind: "furniture", basePath: "/furniture", searchParams });
}

export default function FurniturePage({ searchParams }: Props) {
  return <ListingRoute kind="furniture" basePath="/furniture" searchParams={searchParams} />;
}
