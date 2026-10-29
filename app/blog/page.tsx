import Link from "next/link";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { getBlogPosts } from "@/lib/data/catalog";
import { buildMetadata } from "@/lib/seo/metadata";
import type { BlogPost } from "@/types";

const PAGE_SIZE = 4;

type Props = { searchParams: Promise<{ category?: string; page?: string }> };

export async function generateMetadata({ searchParams }: Props) {
  const raw = await searchParams;
  const filtered = Boolean(raw.category && raw.category !== "all") || Number(raw.page ?? "1") > 1;
  return buildMetadata({
    title: "Journal",
    description:
      "Notes from Wool & Loom Studio on rug sizes, wool care, furniture, and warehouse shipping.",
    path: "/blog",
    index: !filtered,
  });
}

export default function BlogPage({ searchParams }: Props) {
  return (
    <Container className="py-10 pb-16">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Journal", path: "/blog" },
        ]}
      />
      <h1 className="text-h1">Journal</h1>
      <p className="mt-4 max-w-2xl">
        Written by Wool & Loom Studio. Sizes are in feet and inches. Care prices stay on a quote.
      </p>
      <Suspense fallback={<p className="mt-8">Loading articles.</p>}>
        <BlogList searchParams={searchParams} />
      </Suspense>
    </Container>
  );
}

async function BlogList({ searchParams }: Props) {
  const raw = await searchParams;
  const posts = await getBlogPosts();
  const categories = ["all", ...new Set(posts.map((post) => post.category))];
  const category = categories.includes(raw.category ?? "") ? raw.category! : "all";
  const filtered = category === "all" ? posts : posts.filter((post) => post.category === category);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(Math.max(Number(raw.page ?? "1") || 1, 1), pageCount);
  const slice = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <nav aria-label="Categories" className="mt-8 flex flex-wrap gap-2">
        {categories.map((item) => {
          const selected = item === category;
          const href = item === "all" ? "/blog" : `/blog?category=${encodeURIComponent(item)}`;
          return (
            <Link
              key={item}
              href={href}
              aria-current={selected ? "page" : undefined}
              className={`inline-flex min-h-10 items-center border px-3 text-sm ${selected ? "border-ink bg-ink text-bg" : "border-line"}`}
            >
              {item === "all" ? "All" : item}
            </Link>
          );
        })}
      </nav>
      <ul className="mt-8 space-y-8">
        {slice.map((post) => (
          <li key={post.id}>
            <ArticleTeaser post={post} />
          </li>
        ))}
      </ul>
      {filtered.length === 0 ? <p className="mt-8">No articles in this category yet.</p> : null}
      {pageCount > 1 ? (
        <nav aria-label="Pagination" className="mt-10 flex gap-4">
          {page > 1 ? (
            <Link href={pageHref(category, page - 1)} className="underline underline-offset-4">
              Previous
            </Link>
          ) : null}
          <p>
            Page {page} of {pageCount}
          </p>
          {page < pageCount ? (
            <Link href={pageHref(category, page + 1)} className="underline underline-offset-4">
              Next
            </Link>
          ) : null}
        </nav>
      ) : null}
    </>
  );
}

function pageHref(category: string, page: number) {
  const params = new URLSearchParams();
  if (category !== "all") params.set("category", category);
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `/blog?${query}` : "/blog";
}

function ArticleTeaser({ post }: { post: BlogPost }) {
  return (
    <article>
      <p className="text-sm text-mute">
        {post.category} · {post.readMinutes} min read · {post.author}
      </p>
      <h2 className="mt-2 font-serif text-h2">
        <Link href={`/blog/${post.slug}`} className="underline underline-offset-4">
          {post.title}
        </Link>
      </h2>
      <p className="mt-2 max-w-2xl">{post.excerpt}</p>
    </article>
  );
}
