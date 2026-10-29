import { Suspense } from "react";
import { QuoteForm } from "@/components/service/QuoteForm";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { getServices } from "@/lib/data/catalog";
import { findServedCity, resolveServiceSlug } from "@/lib/catalog/service-area";
import type { QuoteDraft } from "@/lib/catalog/quote";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Request a quote",
  description:
    "Ask Wool & Loom for a rug care quote. Cleaning, repair, custom sizing, and pickup are priced after we see the size and the city.",
  path: "/book-service",
  index: false,
});

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

function one(value: string | string[] | undefined): string | undefined {
  return typeof value === "string" ? value : undefined;
}

async function BookService({ searchParams }: Props) {
  const params = await searchParams;
  const services = await getServices();
  const serviceSlug = resolveServiceSlug(one(params.service) ?? "");
  const stateSlug = one(params.state);
  const citySlug = one(params.city);
  const known = stateSlug && citySlug ? findServedCity(stateSlug, citySlug) : undefined;
  const defaults: Partial<Pick<QuoteDraft, "serviceSlug" | "stateSlug" | "citySlug">> = {
    ...(serviceSlug ? { serviceSlug } : {}),
    ...(known ? { stateSlug: known.stateSlug, citySlug: known.slug } : {}),
  };

  return (
    <Container className="py-10 pb-16">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Rug care", path: "/services" },
          { name: "Request a quote", path: "/book-service" },
        ]}
      />
      <header className="mt-6 max-w-3xl">
        <h1 className="text-h1">Request a quote</h1>
        <p className="mt-4 text-lg leading-8">
          Five short steps. The quote is free. We do not show a flat price for cleaning, repair,
          sizing, or pickup.
        </p>
      </header>
      <QuoteForm services={services} defaults={defaults} initialReference={one(params.ref)} />
    </Container>
  );
}

export default function BookServicePage(props: Props) {
  return (
    <Suspense fallback={<Container className="py-10">Loading the quote form.</Container>}>
      <BookService {...props} />
    </Suspense>
  );
}
