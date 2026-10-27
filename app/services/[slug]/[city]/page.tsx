import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { QuoteButton } from "@/components/ui/QuoteButton";
import { getCities, getCity, getNearbyCities, getService, getServices, getWarehouseForCity } from "@/lib/data/services";
import { faqJsonLd, localServiceJsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ slug: string; city: string }> };

export function generateStaticParams() {
  return getServices().flatMap((service) => getCities().map((city) => ({ slug: service.slug, city: city.slug })));
}

export async function generateMetadata({ params }: Props) {
  const { slug, city: citySlug } = await params;
  const service = getService(slug);
  const city = getCity(citySlug);
  if (!service || !city) notFound();
  return buildMetadata({
    title: `${service.name} in ${city.name}`,
    description: `${service.name} in ${city.name}, ${city.state}, served from the Wool & Loom ${getWarehouseForCity(city).name}. Priced by quote.`,
    path: `/services/${service.slug}/${city.slug}`,
  });
}

export default async function LocalServicePage({ params }: Props) {
  const { slug, city: citySlug } = await params;
  const service = getService(slug);
  const city = getCity(citySlug);
  if (!service || !city) notFound();
  const warehouse = getWarehouseForCity(city);
  const nearby = getNearbyCities(city);
  const path = `/services/${service.slug}/${city.slug}`;

  return (
    <Container className="py-10">
      <JsonLd data={[localServiceJsonLd(service, city), faqJsonLd(service.faqs)]} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Rug care", path: "/services" },
          { name: service.name, path: `/services/${service.slug}` },
          { name: city.name, path },
        ]}
      />
      <h1 className="max-w-3xl font-serif text-5xl leading-tight">
        {service.name} in {city.name}
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-8">
        {service.description} This route is served from our {warehouse.name} at {warehouse.street}, {warehouse.city}, {warehouse.region} {warehouse.postalCode}. {city.note}
      </p>
      <div className="mt-6">
        <QuoteButton intent={`${service.slug}-${city.slug}`} city={city.name} showDimensions={service.slug === "custom-sizing"} />
      </div>
      <section className="mt-12" aria-labelledby="nearby-heading">
        <h2 id="nearby-heading" className="font-serif text-3xl">
          Nearby cities
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {nearby.map((item) => (
            <li key={item.slug}>
              <Link href={`/services/${service.slug}/${item.slug}`} className="inline-flex min-h-12 items-center rounded-[2px] border border-line px-3">
                {service.name} in {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-12" aria-labelledby="same-city">
        <h2 id="same-city" className="font-serif text-3xl">
          Other services in {city.name}
        </h2>
        <ul className="mt-4 space-y-2">
          {getServices()
            .filter((item) => item.slug !== service.slug)
            .map((item) => (
              <li key={item.slug}>
                <Link href={`/services/${item.slug}/${city.slug}`} className="inline-flex min-h-12 items-center underline underline-offset-4">
                  {item.name} in {city.name}
                </Link>
              </li>
            ))}
        </ul>
      </section>
    </Container>
  );
}
