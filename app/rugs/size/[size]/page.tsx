import { Suspense } from "react";
import { CatalogListing, listingMetadata } from "@/components/listing/CatalogListing";
import { ListingSkeleton } from "@/components/listing/ListingSkeleton";
import { listingParamSlugs, type RawSearchParams } from "@/lib/catalog/listing";

type Props = { params: Promise<{ size: string }>; searchParams: Promise<RawSearchParams> };

export async function generateStaticParams() {
  const slugs = await listingParamSlugs("size");
  return slugs.map((size) => ({ size }));
}

export async function generateMetadata({ params, searchParams }: Props) {
  const { size } = await params;
  return listingMetadata({
    section: "rugs",
    kind: "size",
    slug: size,
    searchParams: await searchParams,
  });
}

async function SizeContent({ params, searchParams }: Props) {
  const { size } = await params;
  return <CatalogListing section="rugs" kind="size" slug={size} searchParams={searchParams} />;
}

export default function SizePage(props: Props) {
  return (
    <Suspense fallback={<ListingSkeleton />}>
      <SizeContent {...props} />
    </Suspense>
  );
}
