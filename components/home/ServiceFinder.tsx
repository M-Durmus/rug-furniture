"use client";

import { useState } from "react";
import { QuoteButton } from "@/components/ui/QuoteButton";
import { Select } from "@/components/ui/Select";
import type { ServiceArea } from "@/types";

export function ServiceFinder({ areas }: { areas: ServiceArea[] }) {
  const [stateSlug, setStateSlug] = useState(areas[0]?.stateSlug ?? "");
  const state = areas.find((area) => area.stateSlug === stateSlug) ?? areas[0];
  const [citySlug, setCitySlug] = useState(state?.cities[0]?.slug ?? "");
  const cities = state?.cities ?? [];
  const city = cities.find((item) => item.slug === citySlug) ?? cities[0];

  return (
    <div className="mt-8 border border-line bg-card p-5">
      <h3 className="font-serif text-h3">Where we serve</h3>
      <p className="mt-2 text-sm text-mute">Pickup and delivery follow the warehouse closest to the city.</p>
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
          <Select className="mt-1" value={city?.slug ?? ""} onChange={(event) => setCitySlug(event.target.value)}>
            {cities.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </Select>
        </label>
      </div>
      {city && state ? (
        <p className="mt-4 text-sm">
          We serve {city.name}, {state.state}.
        </p>
      ) : null}
      <div className="mt-4">
        <QuoteButton intent="Rug care quote" city={city ? `${city.name}, ${state?.state ?? ""}` : undefined} showDimensions />
      </div>
    </div>
  );
}
