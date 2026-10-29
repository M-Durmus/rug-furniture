import { Suspense } from "react";
import { CatalogListing, listingMetadata } from "@/components/listing/CatalogListing";
import { ListingSkeleton } from "@/components/listing/ListingSkeleton";
import { listingParamSlugs, type RawSearchParams } from "@/lib/catalog/listing";

type Props = { params: Promise<{ style: string }>; searchParams: Promise<RawSearchParams> };

export async function generateStaticParams() {
  const slugs = await listingParamSlugs("style");
  return slugs.map((style) => ({ style }));
}

export async function generateMetadata({ params, searchParams }: Props) {
  const { style } = await params;
  return listingMetadata({
    section: "rugs",
    kind: "style",
    slug: style,
    searchParams: await searchParams,
  });
}

async function StyleContent({ params, searchParams }: Props) {
  const { style } = await params;
  return <CatalogListing section="rugs" kind="style" slug={style} searchParams={searchParams} />;
}

export default function StylePage(props: Props) {
  return (
    <Suspense fallback={<ListingSkeleton />}>
      <StyleContent {...props} />
    </Suspense>
  );
}
