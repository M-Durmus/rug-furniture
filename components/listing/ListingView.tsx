import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProductCard } from "@/components/product/ProductCard";
import { Container } from "@/components/ui/Container";
import { colors, sizes, styles } from "@/lib/data/facets";
import type { Facet } from "@/lib/data/types";
import { absoluteUrl } from "@/lib/site";
import { SORTS, type FacetKey, type ListingModel, type SortKey } from "@/lib/seo/listing";

function facetHref(kind: ListingModel["kind"], key: FacetKey, slug: string): string {
  if (kind === "furniture") return "/furniture";
  return `/rugs/${key}/${slug}`;
}

function ChipList({
  label,
  items,
  active,
  facet,
  kind,
}: {
  label: string;
  items: Facet[];
  active?: string;
  facet: FacetKey;
  kind: ListingModel["kind"];
}) {
  return (
    <nav aria-label={label} className="mt-4">
      <h2 className="text-sm font-medium">{label}</h2>
      <ul className="mt-2 flex flex-wrap gap-2">
        {items.map((item) => {
          const current = active === item.slug;
          return (
            <li key={item.slug}>
              <Link
                href={facetHref(kind, facet, item.slug)}
                aria-current={current ? "page" : undefined}
                className={`inline-flex min-h-12 items-center rounded-[2px] border px-3 ${current ? "border-inverse bg-inverse text-inverse-foreground" : "border-line bg-surface"}`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function sortHref(model: ListingModel, sort: SortKey): string {
  const params = new URLSearchParams();
  if (model.queryFacets.size) params.set("size", model.queryFacets.size);
  if (model.queryFacets.style) params.set("style", model.queryFacets.style);
  if (model.queryFacets.color) params.set("color", model.queryFacets.color);
  if (sort !== "featured") params.set("sort", sort);
  const query = params.toString();
  return query ? `${model.basePath}?${query}` : model.basePath;
}

export function ListingView({ model }: { model: ListingModel }) {
  const crumbs = [{ name: "Home", path: "/" }, { name: model.kind === "furniture" ? "Furniture" : "Rugs", path: model.kind === "furniture" ? "/furniture" : "/rugs" }];
  if (model.kind !== "rugs" && model.kind !== "furniture") crumbs.push({ name: model.title.replace(/, page \d+$/, ""), path: model.basePath });
  const start = model.total === 0 ? 0 : (model.page - 1) * 9 + 1;
  const end = Math.min(model.page * 9, model.total);
  const activeSize = model.appliedFacets.size;
  const activeStyle = model.appliedFacets.style;
  const activeColor = model.appliedFacets.color;

  return (
    <Container className="py-10">
      <Breadcrumbs items={crumbs} />
      {model.relPrev ? <link rel="prev" href={absoluteUrl(model.relPrev)} /> : null}
      {model.relNext ? <link rel="next" href={absoluteUrl(model.relNext)} /> : null}
      <h1 className="max-w-3xl font-serif text-5xl leading-tight md:text-6xl">{model.title}</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8">{model.intro}</p>
      {model.kind !== "furniture" ? (
        <>
          <ChipList label="Size" items={sizes} active={activeSize} facet="size" kind={model.kind} />
          <ChipList label="Style" items={styles} active={activeStyle} facet="style" kind={model.kind} />
          <ChipList label="Color" items={colors} active={activeColor} facet="color" kind={model.kind} />
        </>
      ) : null}
      <div className="mt-8 flex flex-col gap-4 border-t border-line pt-4 md:flex-row md:items-center md:justify-between">
        <p>
          Showing {start}–{end} of {model.total}
        </p>
        <nav aria-label="Sort">
          <ul className="flex flex-wrap gap-2">
            {SORTS.map((sort) => (
              <li key={sort.key}>
                <Link
                  href={sortHref(model, sort.key)}
                  aria-current={model.sort === sort.key ? "page" : undefined}
                  className={`inline-flex min-h-12 items-center rounded-[2px] border px-3 ${model.sort === sort.key ? "border-inverse bg-inverse text-inverse-foreground" : "border-line"}`}
                >
                  {sort.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {model.products.length === 0 ? (
        <p className="mt-10">
          No pieces match these filters.{" "}
          <Link href={model.basePath} className="underline underline-offset-4">
            Clear the extra filters
          </Link>
          .
        </p>
      ) : (
        <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {model.products.map((product, index) => (
            <li key={product.slug}>
              <ProductCard product={product} priority={model.page === 1 && index === 0 && model.index} />
            </li>
          ))}
        </ul>
      )}
      {model.pageCount > 1 ? (
        <nav aria-label="Pagination" className="mt-10">
          <ul className="flex flex-wrap gap-2">
            {model.prevHref ? (
              <li>
                <Link href={model.prevHref} className="inline-flex min-h-12 items-center rounded-[2px] border border-line px-4" rel="prev">
                  Previous
                </Link>
              </li>
            ) : null}
            {Array.from({ length: model.pageCount }, (_, index) => {
              const page = index + 1;
              return (
                <li key={page}>
                  {page === model.page ? (
                    <span aria-current="page" className="inline-flex min-h-12 min-w-12 items-center justify-center border border-inverse bg-inverse text-inverse-foreground">
                      {page}
                    </span>
                  ) : (
                    <Link href={pageHref(model, page)} className="inline-flex min-h-12 min-w-12 items-center justify-center border border-line">
                      {page}
                    </Link>
                  )}
                </li>
              );
            })}
            {model.nextHref ? (
              <li>
                <Link href={model.nextHref} className="inline-flex min-h-12 items-center rounded-[2px] border border-line px-4" rel="next">
                  Next
                </Link>
              </li>
            ) : null}
          </ul>
        </nav>
      ) : null}
    </Container>
  );
}

function pageHref(model: ListingModel, page: number): string {
  const params = new URLSearchParams();
  if (model.queryFacets.size) params.set("size", model.queryFacets.size);
  if (model.queryFacets.style) params.set("style", model.queryFacets.style);
  if (model.queryFacets.color) params.set("color", model.queryFacets.color);
  if (model.sort !== "featured") params.set("sort", model.sort);
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `${model.basePath}?${query}` : model.basePath;
}
