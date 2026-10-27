import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { popularLinks } from "@/lib/data/content";
import { buildMetadata } from "@/lib/seo/metadata";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "Page not found",
  description: "That Wool & Loom page is not on the site. Search the catalog or use a popular link.",
  path: "/404",
  index: false,
});

export default function NotFound() {
  return (
    <Container className="py-12">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Page not found", path: "/404" }]} />
      <h1 className="font-serif text-5xl">Page not found</h1>
      <p className="mt-4 max-w-xl">The address may have changed, or the rug may have left the catalog. Search by name, size, or city.</p>
      <form action="/search" method="get" role="search" className="mt-6 flex max-w-xl flex-col gap-3 sm:flex-row">
        <label htmlFor="not-found-search" className="sr-only">
          Search the catalog
        </label>
        <input id="not-found-search" name="q" type="search" className="h-12 flex-1 rounded-[2px] border border-line bg-surface px-3" />
        <button type="submit" className="inline-flex min-h-12 items-center justify-center rounded-[2px] bg-inverse px-5 text-inverse-foreground">
          Search
        </button>
      </form>
      <h2 className="mt-10 font-serif text-3xl">Popular pages</h2>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {popularLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="inline-flex min-h-12 items-center underline underline-offset-4">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
