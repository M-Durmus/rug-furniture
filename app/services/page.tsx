import { ServiceCard } from "@/components/service/ServiceCard";
import { ServiceHero } from "@/components/service/ServiceHero";
import { ProcessSteps } from "@/components/service/ProcessSteps";
import { WhereWeServe } from "@/components/service/WhereWeServe";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { getReviews, getServices } from "@/lib/data/catalog";
import { catalogServiceJsonLd, faqJsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Rug care",
  description:
    "Rug cleaning, repair, custom sizing, and pickup from Wool & Loom. Every service is priced by quote after the size, the fiber, and the city.",
  path: "/services",
});

const steps = [
  {
    title: "Request a quote",
    text: "Tell us the service, the city, and the size in feet and inches.",
  },
  {
    title: "Free pickup",
    text: "A warehouse route collects the rug. You do not bring it to a shop counter.",
  },
  {
    title: "Expert service",
    text: "Cleaning, repair, or binding happens at the warehouse that serves your city.",
  },
  {
    title: "Quality check",
    text: "We look at the piece before it leaves. A damp rug does not go on the truck.",
  },
  {
    title: "Delivery back",
    text: "We return it on a scheduled weekday window.",
  },
];

const faq = [
  {
    question: "How is a service priced?",
    answer:
      "Every service is a quote. We do not publish a flat rate. The quote uses the size in feet and inches, the fiber, the condition, and the city.",
  },
  {
    question: "Which cities do you serve?",
    answer:
      "The selector on this page lists the states and cities on the warehouse routes. A ZIP check tells you whether a code sits inside one of those cities.",
  },
  {
    question: "Can you take a rug I bought somewhere else?",
    answer:
      "Yes. The rug does not have to come from Wool & Loom. The quote still starts with the size, the fiber, the condition, and the city.",
  },
  {
    question: "Where do I see the turnaround?",
    answer:
      "Each city page states the pickup window and how long the work usually takes. Turnaround is not the same in every city.",
  },
];

export default async function ServicesPage() {
  const [services, reviews] = await Promise.all([
    getServices(),
    getReviews({ targetType: "service" }),
  ]);

  return (
    <Container className="py-10">
      <JsonLd
        data={[
          catalogServiceJsonLd({
            name: "Rug care",
            serviceType: "Rug cleaning, repair, custom sizing, and pickup",
            description: "Warehouse rug care priced by quote for cities on the Wool & Loom routes.",
            path: "/services",
          }),
          faqJsonLd(faq),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Rug care", path: "/services" },
        ]}
      />
      <ServiceHero
        title="Rug care, priced by quote"
        lede="Cleaning, repair, custom sizing, and pickup are quoted after we know the size in feet and inches, the fiber, and the city. There is no flat rate on this page."
        href="/book-service"
      />
      <ul className="mt-12 grid gap-4 md:grid-cols-2">
        {services.map((service) => (
          <li key={service.id}>
            <ServiceCard service={service} />
          </li>
        ))}
      </ul>
      <ProcessSteps title="How a quote becomes a finished rug" steps={steps} />
      <WhereWeServe services={services} />
      <section className="mt-14" aria-labelledby="service-reviews">
        <h2 id="service-reviews" className="font-serif text-h2">
          What customers wrote
        </h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {reviews.map((review) => (
            <li key={review.id} className="border border-line bg-card p-5">
              <blockquote>
                <p className="leading-7">{review.body}</p>
                <footer className="mt-3 text-sm text-mute">
                  {review.author}, {review.city}
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-14" aria-labelledby="service-faq">
        <h2 id="service-faq" className="font-serif text-h2">
          Questions
        </h2>
        <div className="mt-4">
          <Accordion items={faq.map((item) => ({ title: item.question, content: item.answer }))} />
        </div>
      </section>
    </Container>
  );
}
