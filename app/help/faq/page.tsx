import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { getFaqs } from "@/lib/data/content";
import { faqJsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Questions",
  description:
    "Answers about Wool & Loom warehouses, freight, 100-day returns, and quote-based rug care.",
  path: "/help/faq",
});

export default function HelpFaqPage() {
  const faqs = getFaqs();
  return (
    <Container className="py-10 pb-16">
      <JsonLd data={faqJsonLd(faqs)} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Help", path: "/help" },
          { name: "Questions", path: "/help/faq" },
        ]}
      />
      <h1 className="text-h1">Questions</h1>
      <div className="mt-8 max-w-3xl">
        <Accordion items={faqs.map((faq) => ({ title: faq.question, content: faq.answer }))} />
      </div>
    </Container>
  );
}
