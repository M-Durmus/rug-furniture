import { Suspense } from "react";
import { CatalogListing, listingMetadata } from "@/components/listing/CatalogListing";
import { ListingSkeleton } from "@/components/listing/ListingSkeleton";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import type { RawSearchParams } from "@/lib/catalog/listing";
import { getCategoryBySlug } from "@/lib/data/catalog";

type Props = { searchParams: Promise<RawSearchParams> };

export async function generateMetadata({ searchParams }: Props) {
  return listingMetadata({ section: "rugs", kind: "index", searchParams: await searchParams });
}

export default async function RugsPage({ searchParams }: Props) {
  const category = await getCategoryBySlug("rugs");

  return (
    <>
      <Container className="pt-8 lg:pt-12">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Rugs", path: "/rugs" },
          ]}
        />
        <h1 className="mt-4 text-h1">Turkish Rugs</h1>
        <p className="mt-4 max-w-2xl text-mute">
          {category?.intro ??
            "Turkish rugs in stock at Wool & Loom warehouses in New Jersey, Georgia, Texas, and California."}
        </p>
      </Container>
      <Suspense fallback={<ListingSkeleton />}>
        <CatalogListing
          section="rugs"
          kind="index"
          searchParams={searchParams}
          showHeading={false}
        />
      </Suspense>
    </>
  );
}
