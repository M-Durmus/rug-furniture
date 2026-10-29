import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { getGuides } from "@/lib/data/content";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Guides",
  description:
    "Step-by-step Wool & Loom guides for measuring a rug in feet and inches and caring for wool.",
  path: "/guides",
});

export default function GuidesPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
        ]}
      />
      <h1 className="font-serif text-5xl">Guides</h1>
      <ul className="mt-8 space-y-8">
        {getGuides().map((guide) => (
          <li key={guide.slug}>
            <h2 className="font-serif text-3xl">
              <Link href={`/guides/${guide.slug}`} className="underline underline-offset-4">
                {guide.title}
              </Link>
            </h2>
            <p className="mt-2 max-w-2xl">{guide.excerpt}</p>
          </li>
        ))}
      </ul>
    </Container>
  );
}
