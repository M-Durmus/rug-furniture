import { ListingRoute, listingMetadata } from "@/components/listing/ListingRoute";
import type { RawSearchParams } from "@/lib/seo/listing";

type Props = { searchParams: Promise<RawSearchParams> };

export function generateMetadata({ searchParams }: Props) {
  return listingMetadata({ kind: "rugs", basePath: "/rugs", searchParams });
}

export default function RugsPage({ searchParams }: Props) {
  return <ListingRoute kind="rugs" basePath="/rugs" searchParams={searchParams} />;
}
