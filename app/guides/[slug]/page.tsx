import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { getGuide, getGuides } from "@/lib/data/content";
import { getProductsBySlugs } from "@/lib/data/products";
import { howToJsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getGuides().map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  return buildMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
  });
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  return (
    <Container className="py-10">
      <JsonLd data={howToJsonLd(guide)} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
          { name: guide.title, path: `/guides/${guide.slug}` },
        ]}
      />
      <h1 className="max-w-3xl font-serif text-5xl leading-tight">{guide.title}</h1>
      {guide.intro.map((paragraph) => (
        <p key={paragraph} className="mt-4 max-w-3xl leading-7">
          {paragraph}
        </p>
      ))}
      <p className="mt-4 text-sm">Tools: {guide.tools.join(", ")}.</p>
      <nav aria-label="Table of contents" className="mt-6 max-w-3xl border border-line p-4">
        <h2 className="text-sm font-medium">On this page</h2>
        <ol className="mt-2 list-decimal space-y-1 pl-5">
          {guide.steps.map((step, index) => (
            <li key={step.name}>
              <a href={`#step-${index + 1}`} className="underline underline-offset-4">
                {step.name}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <ol className="mt-8 max-w-3xl space-y-6">
        {guide.steps.map((step, index) => (
          <li key={step.name} id={`step-${index + 1}`}>
            <h2 className="font-serif text-3xl">
              {index + 1}. {step.name}
            </h2>
            <p className="mt-2 leading-7">{step.text}</p>
          </li>
        ))}
      </ol>
      <RelatedProducts
        products={getProductsBySlugs(guide.productSlugs)}
        title="Rugs that fit this guide"
      />
    </Container>
  );
}
