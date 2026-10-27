import Link from "next/link";
import type { Service } from "@/lib/data/types";

export function RelatedServices({ services }: { services: Service[] }) {
  if (services.length === 0) return null;
  return (
    <section className="mt-16" aria-labelledby="related-services">
      <h2 id="related-services" className="font-serif text-4xl">
        Care for this piece
      </h2>
      <ul className="mt-6 grid gap-4 md:grid-cols-2">
        {services.map((service) => (
          <li key={service.slug} className="border border-line bg-surface p-5">
            <h3 className="font-serif text-2xl">
              <Link href={`/services/${service.slug}`} className="underline underline-offset-4">
                {service.name}
              </Link>
            </h3>
            <p className="mt-2 text-sm">{service.summary}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
