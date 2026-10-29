import { Suspense } from "react";
import { CatalogListing, listingMetadata } from "@/components/listing/CatalogListing";
import { ListingSkeleton } from "@/components/listing/ListingSkeleton";
import { listingParamSlugs, type RawSearchParams } from "@/lib/catalog/listing";

type Props = { params: Promise<{ room: string }>; searchParams: Promise<RawSearchParams> };

export async function generateStaticParams() {
  const slugs = await listingParamSlugs("room");
  return slugs.map((room) => ({ room }));
}

export async function generateMetadata({ params, searchParams }: Props) {
  const { room } = await params;
  return listingMetadata({
    section: "rugs",
    kind: "room",
    slug: room,
    searchParams: await searchParams,
  });
}

async function RoomContent({ params, searchParams }: Props) {
  const { room } = await params;
  return <CatalogListing section="rugs" kind="room" slug={room} searchParams={searchParams} />;
}

export default function RoomPage(props: Props) {
  return (
    <Suspense fallback={<ListingSkeleton />}>
      <RoomContent {...props} />
    </Suspense>
  );
}
