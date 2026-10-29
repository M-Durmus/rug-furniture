import { Suspense } from "react";
import { CatalogListing, listingMetadata } from "@/components/listing/CatalogListing";
import { ListingSkeleton } from "@/components/listing/ListingSkeleton";
import type { RawSearchParams } from "@/lib/catalog/listing";

type Props = { searchParams: Promise<RawSearchParams> };

export async function generateMetadata({ searchParams }: Props) {
  return listingMetadata({ section: "furniture", kind: "index", searchParams: await searchParams });
}

export default function FurniturePage({ searchParams }: Props) {
  return (
    <Suspense fallback={<ListingSkeleton />}>
      <CatalogListing section="furniture" kind="index" searchParams={searchParams} />
    </Suspense>
  );
}
