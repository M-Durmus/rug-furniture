import { Suspense } from "react";
import { CatalogListing, listingMetadata } from "@/components/listing/CatalogListing";
import { ListingSkeleton } from "@/components/listing/ListingSkeleton";
import { listingParamSlugs, type RawSearchParams } from "@/lib/catalog/listing";

type Props = { params: Promise<{ color: string }>; searchParams: Promise<RawSearchParams> };

export async function generateStaticParams() {
  const slugs = await listingParamSlugs("color");
  return slugs.map((color) => ({ color }));
}

export async function generateMetadata({ params, searchParams }: Props) {
  const { color } = await params;
  return listingMetadata({
    section: "rugs",
    kind: "color",
    slug: color,
    searchParams: await searchParams,
  });
}

async function ColorContent({ params, searchParams }: Props) {
  const { color } = await params;
  return <CatalogListing section="rugs" kind="color" slug={color} searchParams={searchParams} />;
}

export default function ColorPage(props: Props) {
  return (
    <Suspense fallback={<ListingSkeleton />}>
      <ColorContent {...props} />
    </Suspense>
  );
}
