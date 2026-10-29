import copyJson from "@/data/service-city-copy.json";
import areasJson from "@/data/service-areas.json";
import type { Faq, ServiceArea, ServiceCity } from "@/types";

export type CityCopy = {
  slug: string;
  intro: string;
  pickupNote: string;
  turnaround: string;
  faq: Faq;
};

export type ServedCity = ServiceCity &
  CityCopy & {
    state: string;
    stateSlug: string;
  };

const areas = areasJson as ServiceArea[];
const copies = copyJson as CityCopy[];

const warehouseByState: Record<string, "nj" | "ga" | "tx" | "ca"> = {
  "new-jersey": "nj",
  "new-york": "nj",
  pennsylvania: "nj",
  massachusetts: "nj",
  georgia: "ga",
  "north-carolina": "ga",
  florida: "ga",
  "south-carolina": "ga",
  texas: "tx",
  oklahoma: "tx",
  california: "ca",
  arizona: "ca",
};

export const SERVICE_SLUGS = [
  "rug-cleaning",
  "rug-repair",
  "custom-sizing",
  "pickup-and-delivery",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

/** Older notes sometimes shorten the delivery slug. The catalog slug is the canonical one. */
export const SERVICE_ALIAS: Record<string, ServiceSlug> = {
  "pickup-delivery": "pickup-and-delivery",
};

export function serviceAreas(): ServiceArea[] {
  return areas;
}

export function listServedCities(): ServedCity[] {
  return areas.flatMap((area) =>
    area.cities.map((city) => {
      const copy = copies.find((item) => item.slug === city.slug);
      if (!copy) throw new Error(`Missing city copy for ${city.slug}`);
      return { ...city, ...copy, state: area.state, stateSlug: area.stateSlug };
    }),
  );
}

export function findServedCity(stateSlug: string, citySlug: string): ServedCity | undefined {
  return listServedCities().find((city) => city.stateSlug === stateSlug && city.slug === citySlug);
}

export function findCityBySlug(citySlug: string): ServedCity | undefined {
  return listServedCities().find((city) => city.slug === citySlug);
}

export function findZip(zip: string): ServedCity | undefined {
  const code = zip.trim();
  return listServedCities().find((city) => city.zipCodes.includes(code));
}

export function warehouseIdForState(stateSlug: string): "nj" | "ga" | "tx" | "ca" {
  const id = warehouseByState[stateSlug];
  if (!id) throw new Error(`No warehouse for ${stateSlug}`);
  return id;
}

export function resolveServiceSlug(slug: string): ServiceSlug | undefined {
  if ((SERVICE_SLUGS as readonly string[]).includes(slug)) return slug as ServiceSlug;
  return SERVICE_ALIAS[slug];
}

export function serviceParamSlugs(): string[] {
  return [...SERVICE_SLUGS, ...Object.keys(SERVICE_ALIAS)];
}

export function locationSegmentParams(): { slug: string; state: string }[] {
  const segments = new Set<string>([
    ...areas.map((area) => area.stateSlug),
    ...listServedCities().map((city) => city.slug),
  ]);
  return serviceParamSlugs().flatMap((slug) => [...segments].map((state) => ({ slug, state })));
}

export function localServiceParams(): { slug: string; state: string; city: string }[] {
  return serviceParamSlugs().flatMap((slug) =>
    listServedCities().map((city) => ({ slug, state: city.stateSlug, city: city.slug })),
  );
}

export function localServicePath(serviceSlug: string, stateSlug: string, citySlug: string): string {
  return `/services/${serviceSlug}/${stateSlug}/${citySlug}`;
}

export function nearbyCities(city: ServedCity): ServedCity[] {
  return listServedCities().filter(
    (item) => item.stateSlug === city.stateSlug && item.slug !== city.slug,
  );
}
