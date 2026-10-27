import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FramedImage } from "@/components/media/FramedImage";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { QuoteButton } from "@/components/ui/QuoteButton";
import { getCities, getService, getServices } from "@/lib/data/services";
import { faqJsonLd, serviceJsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";
import { imageSize, imageSizes } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getServices().map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  return buildMetadata({ title: service.name, description: service.description, path: `/services/${service.slug}` });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const others = getServices().filter((item) => item.slug !== service.slug);

  return (
    <Container className="py-10">
      <JsonLd data={[serviceJsonLd(service), faqJsonLd(service.faqs)]} />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Rug care", path: "/services" }, { name: service.name, path: `/services/${service.slug}` }]} />
      <div className="grid items-start gap-10 lg:grid-cols-2">
        <FramedImage src={service.image} alt={service.imageAlt} width={imageSize.product.width} height={imageSize.product.height} sizes={imageSizes.gallery} priority />
        <div>
          <h1 className="font-serif text-5xl leading-tight">{service.name}</h1>
          <p className="mt-4 text-lg leading-8">{service.description}</p>
          <div className="mt-6">
            <QuoteButton intent={service.slug} showDimensions={service.slug === "custom-sizing"} />
          </div>
        </div>
      </div>
      <section className="mt-12" aria-labelledby="steps-heading">
        <h2 id="steps-heading" className="font-serif text-3xl">
          How it works
        </h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5">
          {service.steps.map((step) => (
            <li key={step.name}>
              <span className="font-medium">{step.name}. </span>
              {step.text}
            </li>
          ))}
        </ol>
      </section>
      <section className="mt-12" aria-labelledby="service-faq">
        <h2 id="service-faq" className="font-serif text-3xl">
          Questions
        </h2>
        <div className="mt-4 space-y-4">
          {service.faqs.map((faq) => (
            <details key={faq.question} className="border border-line p-4">
              <summary className="cursor-pointer text-lg">{faq.question}</summary>
              <p className="mt-3">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="mt-12" aria-labelledby="cities-heading">
        <h2 id="cities-heading" className="font-serif text-3xl">
          Cities we serve
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {getCities().map((city) => (
            <li key={city.slug}>
              <Link href={`/services/${service.slug}/${city.slug}`} className="inline-flex min-h-12 items-center rounded-[2px] border border-line px-3">
                {city.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-12" aria-labelledby="other-services">
        <h2 id="other-services" className="font-serif text-3xl">
          Other services
        </h2>
        <ul className="mt-4 space-y-2">
          {others.map((item) => (
            <li key={item.slug}>
              <Link href={`/services/${item.slug}`} className="inline-flex min-h-12 items-center underline underline-offset-4">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
