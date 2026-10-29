import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import { FilterDrawer } from "@/components/listing/FilterDrawer";
import { FilterPanel } from "@/components/listing/FilterPanel";
import { ProductCard } from "@/components/home/ProductCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import {
  resolveListing,
  type ListingKind,
  type ListingModel,
  type ListingRequest,
  type ListingSection,
  type RawSearchParams,
} from "@/lib/catalog/listing";
import { faqJsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";
import { absoluteUrl } from "@/lib/site";

function chipClass(current: boolean): string {
  return current
    ? "inline-flex min-h-10 items-center rounded-[2px] border border-ink bg-ink px-3 text-sm text-bg"
    : "inline-flex min-h-10 items-center rounded-[2px] border border-line bg-card px-3 text-sm";
}

function ListingBody({ model, showHeading }: { model: ListingModel; showHeading: boolean }) {
  return (
    <Container className={showHeading ? "py-8 lg:py-12" : "pb-8 lg:pb-12"}>
      {showHeading ? (
        <>
          <Breadcrumbs items={model.crumbs} />
          <h1 className="mt-4 text-h1">{model.title}</h1>
          <p className="mt-4 max-w-2xl text-mute">{model.intro}</p>
        </>
      ) : null}
      {model.chips.length > 0 ? (
        <nav aria-label="Subcategories" className="mt-6">
          <ul className="flex flex-wrap gap-2">
            {model.chips.map((chip) => (
              <li key={chip.href}>
                <Link
                  href={chip.href}
                  aria-current={chip.current ? "page" : undefined}
                  className={chipClass(chip.current)}
                >
                  {chip.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
      <div className="mt-8 lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:items-start lg:gap-10">
        <aside className="hidden lg:block">
          <h2 className="sr-only">Filters</h2>
          <FilterPanel model={model} idPrefix="desktop" />
        </aside>
        <div>
          <div className="mb-4 lg:hidden">
            <FilterDrawer count={model.filterCount}>
              <FilterPanel model={model} idPrefix="mobile" />
            </FilterDrawer>
          </div>
          {model.active.length > 0 ? (
            <ul className="mb-4 flex flex-wrap items-center gap-2">
              {model.active.map((chip) => (
                <li key={chip.label}>
                  <Link
                    href={chip.href}
                    className="inline-flex min-h-10 items-center gap-2 rounded-[2px] border border-line bg-card px-3 text-sm"
                  >
                    {chip.label}
                    <span aria-hidden="true">×</span>
                    <span className="sr-only">Remove {chip.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={model.clearHref}
                  className="inline-flex min-h-10 items-center text-sm underline underline-offset-4"
                >
                  Clear all
                </Link>
              </li>
            </ul>
          ) : null}
          <div className="flex flex-col gap-3 border-b border-line pb-4 sm:flex-row sm:items-center sm:justify-between">
            <p>
              {model.total} {model.noun}
            </p>
            <nav aria-label="Sort" className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {model.sorts.map((sort) => (
                <Link
                  key={sort.label}
                  href={sort.href}
                  aria-current={sort.current ? "true" : undefined}
                  className={
                    sort.current
                      ? "text-ink underline underline-offset-4"
                      : "text-mute hover:text-ink"
                  }
                >
                  {sort.label}
                </Link>
              ))}
            </nav>
          </div>
          {model.products.length > 0 ? (
            <>
              <h2 className="sr-only">In stock</h2>
              <ul className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
                {model.products.map((item) => (
                  <li key={item.product.id}>
                    <ProductCard
                      product={item.product}
                      size={item.size}
                      href={item.href}
                      unitPrice={item.unitPrice}
                    />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="mt-8 border border-line bg-card p-6">
              <h2 className="font-serif text-h3">No pieces match these filters</h2>
              <p className="mt-3 max-w-xl text-mute">
                Try another size or color, or start from one of these collections.
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {model.suggestions.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={chipClass(false)}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {model.active.length > 0 ? (
                <Link
                  href={model.clearHref}
                  className="mt-4 inline-flex min-h-10 items-center text-sm underline underline-offset-4"
                >
                  Clear all
                </Link>
              ) : null}
            </div>
          )}
          {model.pageCount > 1 ? (
            <nav aria-label="Pagination" className="mt-8 flex flex-wrap items-center gap-2">
              {model.prevHref ? (
                <Link href={model.prevHref} rel="prev" className={chipClass(false)}>
                  Previous
                </Link>
              ) : (
                <span className="inline-flex min-h-10 items-center px-3 text-sm text-mute">
                  Previous
                </span>
              )}
              {model.pages.map((page) =>
                page.current ? (
                  <span key={page.label} aria-current="page" className={chipClass(true)}>
                    {page.label}
                  </span>
                ) : (
                  <Link key={page.label} href={page.href} className={chipClass(false)}>
                    {page.label}
                  </Link>
                ),
              )}
              {model.nextHref ? (
                <Link href={model.nextHref} rel="next" className={chipClass(false)}>
                  Next
                </Link>
              ) : (
                <span className="inline-flex min-h-10 items-center px-3 text-sm text-mute">
                  Next
                </span>
              )}
            </nav>
          ) : null}
          <aside aria-label="Rug care" className="mt-12 border border-line bg-sand p-6 sm:p-8">
            <h2 className="font-serif text-h2">Rug care</h2>
            <p className="mt-3 max-w-xl text-mute">
              Cleaning, repair, custom sizing, and pickup are priced by quote. The rug stays in our
              care from the warehouse to your room.
            </p>
            <Button href="/services" variant="outline" className="mt-5">
              See services
            </Button>
          </aside>
          <section className="mt-12" aria-labelledby="about-listing">
            <h2 id="about-listing" className="font-serif text-h2">
              About {model.title}
            </h2>
            <details className="mt-4 border-t border-line">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 font-medium">
                Read the full description
                <span aria-hidden="true" className="text-mute">
                  +
                </span>
              </summary>
              <p className="pb-4 leading-6 text-mute">{model.seoText}</p>
            </details>
          </section>
          {model.faq.length > 0 ? (
            <section className="mt-12" aria-labelledby="listing-faq">
              <h2 id="listing-faq" className="font-serif text-h2">
                Questions
              </h2>
              <div className="mt-4">
                <Accordion
                  items={model.faq.map((item) => ({ title: item.question, content: item.answer }))}
                />
              </div>
              <JsonLd data={faqJsonLd(model.faq)} />
            </section>
          ) : null}
        </div>
      </div>
    </Container>
  );
}

export async function listingMetadata(request: ListingRequest): Promise<Metadata> {
  const result = await resolveListing(request);
  if (result.type === "redirect") permanentRedirect(result.path);
  if (result.type === "notFound") notFound();
  const pagination =
    result.prevHref || result.nextHref
      ? {
          ...(result.prevHref ? { previous: absoluteUrl(result.prevHref) } : {}),
          ...(result.nextHref ? { next: absoluteUrl(result.nextHref) } : {}),
        }
      : undefined;
  return buildMetadata({
    title: result.title,
    description: result.description,
    path: result.canonicalPath,
    index: result.index,
    pagination,
  });
}

export async function CatalogListing({
  section,
  kind,
  slug,
  searchParams,
  showHeading = true,
}: {
  section: ListingSection;
  kind: ListingKind;
  slug?: string;
  searchParams: Promise<RawSearchParams>;
  showHeading?: boolean;
}) {
  const result = await resolveListing({ section, kind, slug, searchParams: await searchParams });
  if (result.type === "redirect") permanentRedirect(result.path);
  if (result.type === "notFound") notFound();
  return <ListingBody model={result} showHeading={showHeading} />;
}
