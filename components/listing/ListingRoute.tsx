import { notFound, permanentRedirect } from "next/navigation";
import { Suspense } from "react";
import { ListingView } from "@/components/listing/ListingView";
import { getFurniture, getRugs } from "@/lib/data/products";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildListing, defaultListing, type FacetKey, type ListingKind, type RawSearchParams } from "@/lib/seo/listing";

type Input = {
  kind: ListingKind;
  basePath: string;
  locked?: { key: FacetKey; value: string };
  searchParams: Promise<RawSearchParams>;
};

function catalog(kind: ListingKind) {
  return kind === "furniture" ? getFurniture() : getRugs();
}

export async function listingMetadata({ kind, basePath, locked, searchParams }: Input) {
  const result = buildListing({ kind, basePath, locked, raw: await searchParams, products: catalog(kind) });
  if (result.type === "redirect") permanentRedirect(result.to);
  if (result.type === "notFound") notFound();
  return buildMetadata({
    title: result.title,
    description: result.description,
    path: result.canonicalPath,
    index: result.index,
  });
}

async function Resolved(input: Input) {
  const result = buildListing({
    kind: input.kind,
    basePath: input.basePath,
    locked: input.locked,
    raw: await input.searchParams,
    products: catalog(input.kind),
  });
  if (result.type === "redirect") permanentRedirect(result.to);
  if (result.type === "notFound") notFound();
  return <ListingView model={result} />;
}

export function ListingRoute(input: Input) {
  const fallback = defaultListing({
    kind: input.kind,
    basePath: input.basePath,
    locked: input.locked,
    products: catalog(input.kind),
  });
  return (
    <Suspense fallback={<ListingView model={fallback} />}>
      <Resolved {...input} />
    </Suspense>
  );
}
