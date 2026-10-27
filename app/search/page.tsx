import Link from "next/link";
import { Suspense } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { Container } from "@/components/ui/Container";
import { searchCatalog } from "@/lib/data";
import { buildMetadata } from "@/lib/seo/metadata";
import type { RawSearchParams } from "@/lib/seo/listing";

type Props = { searchParams: Promise<RawSearchParams> };

function queryOf(raw: RawSearchParams): string {
  const value = raw.q;
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
}

export async function generateMetadata({ searchParams }: Props) {
  const query = queryOf(await searchParams);
  return buildMetadata({
    title: query ? `Search results for ${query}` : "Search",
    description: "Search Wool & Loom rugs, furniture, journal notes, and guides. These result pages are not indexed.",
    path: query ? `/search?q=${encodeURIComponent(query)}` : "/search",
    index: false,
  });
}

async function Results({ searchParams }: Props) {
  const query = queryOf(await searchParams);
  const results = searchCatalog(query);
  if (!query) return <p>Enter a rug name, a size, a color, or a city.</p>;
  const empty = results.products.length + results.posts.length + results.guides.length === 0;
  return (
    <div>
      <p>
        {empty ? "No matches" : "Matches"} for “{query}”.
      </p>
      {results.products.length > 0 ? (
        <ul className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {results.products.map((product) => (
            <li key={product.slug}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      ) : null}
      <ul className="mt-6 space-y-3">
        {results.posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="underline underline-offset-4">
              {post.title}
            </Link>
          </li>
        ))}
        {results.guides.map((guide) => (
          <li key={guide.slug}>
            <Link href={`/guides/${guide.slug}`} className="underline underline-offset-4">
              {guide.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SearchPage({ searchParams }: Props) {
  return (
    <Container className="py-10">
      <h1 className="font-serif text-5xl">Search</h1>
      <form action="/search" method="get" role="search" className="mt-6 flex max-w-xl flex-col gap-3 sm:flex-row">
        <label htmlFor="catalog-search" className="sr-only">
          Search rugs and furniture
        </label>
        <input id="catalog-search" name="q" type="search" className="h-12 flex-1 rounded-[2px] border border-line bg-surface px-3" />
        <button type="submit" className="inline-flex min-h-12 items-center justify-center rounded-[2px] bg-inverse px-5 text-inverse-foreground">
          Search
        </button>
      </form>
      <div className="mt-8 min-h-24">
        <Suspense fallback={<p>Searching the catalog.</p>}>
          <Results searchParams={searchParams} />
        </Suspense>
      </div>
    </Container>
  );
}
