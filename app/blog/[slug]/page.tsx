import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { getPost, getPosts } from "@/lib/data/content";
import { getProductsBySlugs } from "@/lib/data/products";
import { articleJsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.updated,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  return (
    <Container className="py-10">
      <JsonLd data={articleJsonLd(post)} />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Journal", path: "/blog" }, { name: post.title, path: `/blog/${post.slug}` }]} />
      <article>
        <p className="text-sm text-muted">{post.date}</p>
        <h1 className="mt-2 max-w-3xl font-serif text-5xl leading-tight">{post.title}</h1>
        {post.sections.map((section) => (
          <section key={section.heading} className="mt-8 max-w-3xl">
            <h2 className="font-serif text-3xl">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-3 leading-7">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </article>
      <RelatedProducts products={getProductsBySlugs(post.productSlugs)} title="Pieces mentioned here" />
    </Container>
  );
}
