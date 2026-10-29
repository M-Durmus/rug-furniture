import assert from "node:assert/strict";
import test from "node:test";
import areasJson from "@/data/service-areas.json";
import { findZip, listServedCities } from "@/lib/catalog/service-area";
import type { ServiceArea } from "@/types";

const areas = areasJson as ServiceArea[];

test("every served city has its own copy", () => {
  const cities = listServedCities();
  const expected = areas.flatMap((area) => area.cities).length;
  assert.equal(cities.length, expected);
  const intros = new Set(cities.map((city) => city.intro));
  const pickups = new Set(cities.map((city) => city.pickupNote));
  const turns = new Set(cities.map((city) => city.turnaround));
  const questions = new Set(cities.map((city) => city.faq.question));
  assert.equal(intros.size, cities.length);
  assert.equal(pickups.size, cities.length);
  assert.equal(turns.size, cities.length);
  assert.equal(questions.size, cities.length);
});

test("ZIP check knows Brooklyn and rejects an unknown code", () => {
  assert.equal(findZip("11201")?.slug, "brooklyn");
  assert.equal(findZip("07102")?.name, "Newark");
  assert.equal(findZip("00000"), undefined);
});
