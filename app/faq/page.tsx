import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { getFaqs } from "@/lib/data/content";
import { faqJsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Questions",
  description: "Answers about Wool & Loom warehouses, freight, returns, and quote-based rug care.",
  path: "/faq",
});

export default function FaqPage() {
  const faqs = getFaqs();
  return (
    <Container className="py-10">
      <JsonLd data={faqJsonLd(faqs)} />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Questions", path: "/faq" }]} />
      <h1 className="font-serif text-5xl">Questions</h1>
      <div className="mt-8 max-w-3xl space-y-3">
        {faqs.map((faq) => (
          <details key={faq.question} className="border border-line p-4">
            <summary className="cursor-pointer text-lg">{faq.question}</summary>
            <p className="mt-3 leading-7">{faq.answer}</p>
          </details>
        ))}
      </div>
    </Container>
  );
}
