import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { getPosts } from "@/lib/data/content";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Journal",
  description: "Notes from Wool & Loom on rug sizes, wool care, and furniture that sits with a Turkish rug.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Journal", path: "/blog" }]} />
      <h1 className="font-serif text-5xl">Journal</h1>
      <ul className="mt-8 space-y-8">
        {getPosts().map((post) => (
          <li key={post.slug}>
            <p className="text-sm text-muted">{post.date}</p>
            <h2 className="font-serif text-3xl">
              <Link href={`/blog/${post.slug}`} className="underline underline-offset-4">
                {post.title}
              </Link>
            </h2>
            <p className="mt-2 max-w-2xl">{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </Container>
  );
}
