import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { productPath } from "@/lib/catalog/product-path";
import {
  getBlogPostBySlug,
  getBlogPosts,
  getProductBySlug,
  getServiceBySlug,
} from "@/lib/data/catalog";
import { getPost, getPosts } from "@/lib/data/content";
import { articleJsonLd, catalogArticleJsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";
import type { BlogPost } from "@/types";
import type { Post } from "@/lib/data/types";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const catalog = await getBlogPosts();
  const slugs = new Set([
    ...catalog.map((post) => post.slug),
    ...getPosts().map((post) => post.slug),
  ]);
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const catalog = await getBlogPostBySlug(slug);
  const legacy = getPost(slug);
  const title = catalog?.title ?? legacy?.title;
  const description = catalog?.excerpt ?? legacy?.description;
  if (!title || !description) notFound();
  return buildMetadata({
    title,
    description,
    path: `/blog/${slug}`,
    type: "article",
    publishedTime: catalog?.publishedAt ?? legacy?.date,
    modifiedTime: catalog?.publishedAt ?? legacy?.updated,
  });
}

function headingId(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const catalog = await getBlogPostBySlug(slug);
  if (catalog) return <CatalogArticle post={catalog} />;
  const legacy = getPost(slug);
  if (!legacy) notFound();
  return <LegacyArticle post={legacy} />;
}

async function CatalogArticle({ post }: { post: BlogPost }) {
  const products = (
    await Promise.all(post.relatedProductSlugs.map((slug) => getProductBySlug(slug)))
  ).filter((product) => product !== undefined);
  const service = await getServiceBySlug(post.relatedServiceSlug);
  return (
    <Container className="py-10 pb-16">
      <JsonLd data={catalogArticleJsonLd(post)} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Journal", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />
      <article>
        <p className="text-sm text-mute">
          {post.author} · {post.readMinutes} min read · {post.publishedAt}
        </p>
        <h1 className="mt-2 max-w-3xl text-h1">{post.title}</h1>
        <Contents headings={post.sections.map((section) => section.heading)} />
        {post.sections.map((section) => (
          <section key={section.heading} id={headingId(section.heading)} className="mt-8 max-w-3xl">
            <h2 className="font-serif text-h2">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-3 leading-7">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </article>
      {products.length > 0 ? (
        <section className="mt-12" aria-labelledby="related-pieces">
          <h2 id="related-pieces" className="font-serif text-h2">
            Pieces in this note
          </h2>
          <ul className="mt-4 space-y-2">
            {products.map((product) => (
              <li key={product.id}>
                <Link href={productPath(product)} className="underline underline-offset-4">
                  {product.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {service ? (
        <aside className="mt-10 max-w-xl border border-line bg-card p-5">
          <h2 className="font-serif text-h3">{service.name}</h2>
          <p className="mt-2">{service.shortDescription} The price is a quote.</p>
          <Link
            href={`/services/${service.slug}`}
            className="mt-4 inline-block underline underline-offset-4"
          >
            See {service.name.toLowerCase()}
          </Link>
        </aside>
      ) : null}
    </Container>
  );
}

function LegacyArticle({ post }: { post: Post }) {
  const words = post.sections.reduce(
    (sum, section) => sum + section.paragraphs.join(" ").split(/\s+/).length,
    0,
  );
  const minutes = Math.max(1, Math.round(words / 200));
  return (
    <Container className="py-10 pb-16">
      <JsonLd data={articleJsonLd(post)} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Journal", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />
      <article>
        <p className="text-sm text-mute">
          Wool & Loom Studio · {minutes} min read · {post.date}
        </p>
        <h1 className="mt-2 max-w-3xl text-h1">{post.title}</h1>
        <Contents headings={post.sections.map((section) => section.heading)} />
        {post.sections.map((section) => (
          <section key={section.heading} id={headingId(section.heading)} className="mt-8 max-w-3xl">
            <h2 className="font-serif text-h2">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-3 leading-7">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </article>
    </Container>
  );
}

function Contents({ headings }: { headings: string[] }) {
  return (
    <nav aria-label="Table of contents" className="mt-6 max-w-3xl border border-line p-4">
      <h2 className="text-sm font-medium">On this page</h2>
      <ol className="mt-2 list-decimal space-y-1 pl-5">
        {headings.map((heading) => (
          <li key={heading}>
            <a href={`#${headingId(heading)}`} className="underline underline-offset-4">
              {heading}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
