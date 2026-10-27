import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { getServices } from "@/lib/data/services";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Rug care",
  description: "Rug cleaning, repair, custom sizing, and pickup from Wool & Loom. Every service is priced by quote.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Rug care", path: "/services" }]} />
      <h1 className="font-serif text-5xl">Rug care</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8">
        Cleaning, repair, custom sizing, and delivery are quoted after we know the size in feet and inches, the fiber, and the city. We do not publish a flat rate.
      </p>
      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {getServices().map((service) => (
          <li key={service.slug} className="border border-line bg-surface p-5">
            <h2 className="font-serif text-3xl">
              <Link href={`/services/${service.slug}`} className="underline underline-offset-4">
                {service.name}
              </Link>
            </h2>
            <p className="mt-3">{service.summary}</p>
          </li>
        ))}
      </ul>
    </Container>
  );
}
