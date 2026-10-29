import Link from "next/link";
import type { Service } from "@/types";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="flex h-full flex-col border border-line bg-card p-5">
      <h2 className="font-serif text-h3">
        <Link href={`/services/${service.slug}`} className="underline underline-offset-4">
          {service.name}
        </Link>
      </h2>
      <p className="mt-3 flex-1 leading-7">{service.shortDescription}</p>
      <p className="mt-4 text-sm text-mute">Priced by quote</p>
    </article>
  );
}
