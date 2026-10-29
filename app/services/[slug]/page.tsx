import { Suspense } from "react";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { BeforeAfterSlider } from "@/components/service/BeforeAfterSlider";
import { CrossSell } from "@/components/service/CrossSell";
import { ProcessSteps } from "@/components/service/ProcessSteps";
import { ServiceHero } from "@/components/service/ServiceHero";
import { ZipChecker } from "@/components/service/ZipChecker";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { getServiceBySlug, getServices } from "@/lib/data/catalog";
import {
  localServicePath,
  resolveServiceSlug,
  serviceAreas,
  serviceParamSlugs,
} from "@/lib/catalog/service-area";
import { catalogServiceJsonLd, faqJsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return serviceParamSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const canonical = resolveServiceSlug(slug);
  if (!canonical) notFound();
  if (canonical !== slug) permanentRedirect(`/services/${canonical}`);
  const service = await getServiceBySlug(canonical);
  if (!service) notFound();
  return buildMetadata({
    title: service.name,
    description: `${service.shortDescription} Priced by quote.`,
    path: `/services/${service.slug}`,
  });
}

async function ServiceDetail({ params }: Props) {
  const { slug } = await params;
  const canonical = resolveServiceSlug(slug);
  if (!canonical) notFound();
  if (canonical !== slug) permanentRedirect(`/services/${canonical}`);
  const service = await getServiceBySlug(canonical);
  if (!service) notFound();
  const others = (await getServices()).filter((item) => item.slug !== service.slug);

  return (
    <Container className="py-10">
      <JsonLd
        data={[
          catalogServiceJsonLd({
            name: service.name,
            serviceType: service.name,
            description: service.shortDescription,
            path: `/services/${service.slug}`,
          }),
          faqJsonLd(service.faq),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Rug care", path: "/services" },
          { name: service.name, path: `/services/${service.slug}` },
        ]}
      />
      <ServiceHero
        eyebrow="Priced by quote"
        title={service.name}
        lede={service.shortDescription}
        href={`/book-service?service=${service.slug}`}
        image={service.image || undefined}
      />
      <section className="mt-14" aria-labelledby="included-heading">
        <h2 id="included-heading" className="font-serif text-h2">
          What is included
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          {service.includes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <ProcessSteps title="How this service runs" steps={service.process} />
      <BeforeAfterSlider service={service.slug} />
      <section className="mt-14" aria-labelledby="cities-heading">
        <h2 id="cities-heading" className="font-serif text-h2">
          Where we serve
        </h2>
        <p className="mt-3 max-w-2xl">
          Each city has its own page, with the pickup note and the turnaround for that route.
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {serviceAreas().map((area) => (
            <div key={area.stateSlug}>
              <h3 className="font-serif text-h3">{area.state}</h3>
              <ul className="mt-2 space-y-1">
                {area.cities.map((city) => (
                  <li key={city.slug}>
                    <Link
                      href={localServicePath(service.slug, area.stateSlug, city.slug)}
                      className="inline-flex min-h-10 items-center underline underline-offset-4"
                    >
                      {city.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <ZipChecker serviceSlug={service.slug} />
      </section>
      <section className="mt-14" aria-labelledby="service-faq">
        <h2 id="service-faq" className="font-serif text-h2">
          Questions
        </h2>
        <div className="mt-4">
          <Accordion
            items={service.faq.map((item) => ({ title: item.question, content: item.answer }))}
          />
        </div>
      </section>
      <section className="mt-14" aria-labelledby="other-services">
        <h2 id="other-services" className="font-serif text-h2">
          Other services
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {others.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/services/${item.slug}`}
                className="inline-flex min-h-10 items-center border border-line px-3"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <CrossSell />
    </Container>
  );
}

export default function ServicePage(props: Props) {
  return (
    <Suspense fallback={<Container className="py-10">Loading this service.</Container>}>
      <ServiceDetail {...props} />
    </Suspense>
  );
}
