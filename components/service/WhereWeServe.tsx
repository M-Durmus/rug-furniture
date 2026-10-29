"use client";

import { useState } from "react";
import Link from "next/link";
import { ZipChecker } from "@/components/service/ZipChecker";
import { Select } from "@/components/ui/Select";
import { localServicePath, serviceAreas } from "@/lib/catalog/service-area";
import type { Service } from "@/types";

export function WhereWeServe({ services }: { services: Service[] }) {
  const areas = serviceAreas();
  const [stateSlug, setStateSlug] = useState(areas[0]?.stateSlug ?? "");
  const state = areas.find((area) => area.stateSlug === stateSlug) ?? areas[0];
  const [citySlug, setCitySlug] = useState(state?.cities[0]?.slug ?? "");
  const cityList = state?.cities ?? [];
  const city = cityList.find((item) => item.slug === citySlug) ?? cityList[0];

  return (
    <section className="mt-14" aria-labelledby="where-heading">
      <h2 id="where-heading" className="font-serif text-h2">
        Where we serve
      </h2>
      <p className="mt-3 max-w-2xl">
        Choose a state, then a city. Each city page names the warehouse route and the turnaround.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          State
          <Select
            className="mt-1"
            value={state?.stateSlug ?? ""}
            onChange={(event) => {
              const next = areas.find((area) => area.stateSlug === event.target.value);
              setStateSlug(event.target.value);
              setCitySlug(next?.cities[0]?.slug ?? "");
            }}
          >
            {areas.map((area) => (
              <option key={area.stateSlug} value={area.stateSlug}>
                {area.state}
              </option>
            ))}
          </Select>
        </label>
        <label className="block text-sm">
          City
          <Select
            className="mt-1"
            value={city?.slug ?? ""}
            onChange={(event) => setCitySlug(event.target.value)}
          >
            {cityList.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </Select>
        </label>
      </div>
      {city && state ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                href={localServicePath(service.slug, state.stateSlug, city.slug)}
                className="inline-flex min-h-10 items-center rounded-[2px] border border-line px-3 text-sm"
              >
                {service.name} in {city.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
      <ZipChecker />
    </section>
  );
}
