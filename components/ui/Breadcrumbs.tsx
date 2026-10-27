import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo/jsonld";

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = breadcrumbJsonLd(items);

  return (
    <>
      <JsonLd data={jsonLd} />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-mute">
          {items.map((item, index) => {
            const last = index === items.length - 1;
            return (
              <li key={`${item.path}-${item.name}`} className="flex items-center gap-2">
                {index > 0 ? <span aria-hidden="true">/</span> : null}
                {last ? (
                  <span aria-current="page" className="text-ink">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.path} className="underline underline-offset-4 hover:text-ink">
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
