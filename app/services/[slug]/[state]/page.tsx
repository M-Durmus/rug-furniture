import { Suspense } from "react";
import { notFound, permanentRedirect } from "next/navigation";
import {
  findCityBySlug,
  localServicePath,
  locationSegmentParams,
  resolveServiceSlug,
} from "@/lib/catalog/service-area";

type Props = { params: Promise<{ slug: string; state: string }> };

export function generateStaticParams() {
  return locationSegmentParams();
}

export async function generateMetadata({ params }: Props) {
  const { slug, state } = await params;
  const service = resolveServiceSlug(slug);
  const city = findCityBySlug(state);
  if (!service || !city) notFound();
  permanentRedirect(localServicePath(service, city.stateSlug, city.slug));
}

async function LegacyCityRedirect({ params }: Props) {
  const { slug, state } = await params;
  const service = resolveServiceSlug(slug);
  const city = findCityBySlug(state);
  if (!service || !city) notFound();
  permanentRedirect(localServicePath(service, city.stateSlug, city.slug));
  return null;
}

export default function LegacyCityPage(props: Props) {
  return (
    <Suspense>
      <LegacyCityRedirect {...props} />
    </Suspense>
  );
}
