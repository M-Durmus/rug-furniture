import { Suspense } from "react";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { QuoteForm } from "@/components/service/QuoteForm";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { getServiceBySlug, getServices } from "@/lib/data/catalog";
import {
  findServedCity,
  localServiceParams,
  localServicePath,
  nearbyCities,
  resolveServiceSlug,
  warehouseIdForState,
} from "@/lib/catalog/service-area";
import { catalogLocalServiceJsonLd, faqJsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ slug: string; state: string; city: string }> };

export function generateStaticParams() {
  return localServiceParams();
}

export async function generateMetadata({ params }: Props) {
  const { slug, state, city: citySlug } = await params;
  const serviceSlug = resolveServiceSlug(slug);
  const city = findServedCity(state, citySlug);
  if (!serviceSlug || !city) notFound();
  if (serviceSlug !== slug)
    permanentRedirect(localServicePath(serviceSlug, city.stateSlug, city.slug));
  const service = await getServiceBySlug(serviceSlug);
  if (!service) notFound();
  const title = `${service.name} in ${city.name}, ${city.state}`;
  return buildMetadata({
    title,
    description: `${service.name} in ${city.name}: ${city.intro}`,
    path: localServicePath(service.slug, city.stateSlug, city.slug),
  });
}

async function LocalServicePage({ params }: Props) {
  const { slug, state, city: citySlug } = await params;
  const serviceSlug = resolveServiceSlug(slug);
  const city = findServedCity(state, citySlug);
  if (!serviceSlug || !city) notFound();
  if (serviceSlug !== slug)
    permanentRedirect(localServicePath(serviceSlug, city.stateSlug, city.slug));
  const service = await getServiceBySlug(serviceSlug);
  if (!service) notFound();
  const services = await getServices();
  const title = `${service.name} in ${city.name}, ${city.state}`;
  const path = localServicePath(service.slug, city.stateSlug, city.slug);
  const nearby = nearbyCities(city);
  const questions = [city.faq, ...service.faq];

  return (
    <Container className="py-10 pb-16">
      <JsonLd
        data={[
          catalogLocalServiceJsonLd({
            name: title,
            serviceType: service.name,
            description: city.intro,
            path,
            cityName: city.name,
            stateName: city.state,
            warehouseId: warehouseIdForState(city.stateSlug),
          }),
          faqJsonLd(questions),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Rug care", path: "/services" },
          { name: service.name, path: `/services/${service.slug}` },
          { name: `${city.name}, ${city.state}`, path },
        ]}
      />
      <header className="mt-6 max-w-3xl">
        <p className="text-sm text-mute">Priced by quote</p>
        <h1 className="text-h1">{title}</h1>
        <p className="mt-4 text-lg leading-8">{city.intro}</p>
      </header>
      <section className="mt-10 max-w-3xl" aria-labelledby="pickup-heading">
        <h2 id="pickup-heading" className="font-serif text-h2">
          Pickup in {city.name}
        </h2>
        <p className="mt-3 leading-7">{city.pickupNote}</p>
      </section>
      <section className="mt-10 max-w-3xl" aria-labelledby="turnaround-heading">
        <h2 id="turnaround-heading" className="font-serif text-h2">
          Turnaround
        </h2>
        <p className="mt-3 leading-7">{city.turnaround}</p>
      </section>
      <section className="mt-10" aria-labelledby="nearby-heading">
        <h2 id="nearby-heading" className="font-serif text-h2">
          Nearby cities
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {nearby.map((item) => (
            <li key={item.slug}>
              <Link
                href={localServicePath(service.slug, item.stateSlug, item.slug)}
                className="inline-flex min-h-10 items-center border border-line px-3"
              >
                {service.name} in {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-10" aria-labelledby="local-faq">
        <h2 id="local-faq" className="font-serif text-h2">
          Questions for {city.name}
        </h2>
        <div className="mt-4">
          <Accordion
            items={questions.map((item) => ({ title: item.question, content: item.answer }))}
          />
        </div>
      </section>
      <section className="mt-10 max-w-3xl" aria-labelledby="quote-heading">
        <h2 id="quote-heading" className="font-serif text-h2">
          Request a quote
        </h2>
        <p className="mt-3">
          {city.name}, {city.state} is already selected. The quote is free, and the price is not a
          flat rate.
        </p>
        <QuoteForm
          services={services}
          defaults={{ serviceSlug, stateSlug: city.stateSlug, citySlug: city.slug }}
        />
      </section>
      <section className="mt-10" aria-labelledby="same-city">
        <h2 id="same-city" className="font-serif text-h2">
          Other services in {city.name}
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {services
            .filter((item) => item.slug !== service.slug)
            .map((item) => (
              <li key={item.slug}>
                <Link
                  href={localServicePath(item.slug, city.stateSlug, city.slug)}
                  className="inline-flex min-h-10 items-center border border-line px-3"
                >
                  {item.name}
                </Link>
              </li>
            ))}
        </ul>
      </section>
    </Container>
  );
}

export default function Page(props: Props) {
  return (
    <Suspense fallback={<Container className="py-10">Loading this city.</Container>}>
      <LocalServicePage {...props} />
    </Suspense>
  );
}
