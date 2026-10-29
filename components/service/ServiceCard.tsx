import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/types";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group flex h-full flex-col bg-card">
      <Link href={`/services/${service.slug}`} className="block">
        {service.image ? (
          <span className="relative block aspect-[4/3] overflow-hidden bg-sand">
            <Image
              src={service.image}
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          </span>
        ) : null}
        <h2 className="mt-4 font-serif text-h3">{service.name}</h2>
        <p className="mt-3 leading-7">{service.shortDescription}</p>
        <p className="mt-4 text-sm text-mute">Priced by quote</p>
      </Link>
    </article>
  );
}
