"use server";

import { submitQuoteRequest } from "@/lib/data/catalog";
import { quoteSchema, type QuoteDraft } from "@/lib/catalog/quote";
import { findServedCity, findZip } from "@/lib/catalog/service-area";

export async function sendQuote(
  draft: QuoteDraft,
): Promise<{ id: string } | { errors: Record<string, string> }> {
  const parsed = quoteSchema.safeParse(draft);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!errors[key]) errors[key] = issue.message;
    }
    return { errors };
  }
  const city = findServedCity(parsed.data.stateSlug, parsed.data.citySlug);
  const zipCity = findZip(parsed.data.zip);
  if (!city || !zipCity || zipCity.slug !== city.slug) {
    return { errors: { zip: "That ZIP is outside the city you chose." } };
  }
  const width = parsed.data.widthFt + parsed.data.widthIn / 12;
  const length = parsed.data.lengthFt + parsed.data.lengthIn / 12;
  const notes = [
    `ZIP ${parsed.data.zip}`,
    `Material: ${parsed.data.material}`,
    `Condition: ${parsed.data.condition}`,
    `Size: ${parsed.data.widthFt}' ${parsed.data.widthIn}" × ${parsed.data.lengthFt}' ${parsed.data.lengthIn}"`,
    parsed.data.notes,
  ]
    .filter(Boolean)
    .join("\n");
  const quote = await submitQuoteRequest({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone || undefined,
    city: `${city.name}, ${city.state}`,
    serviceSlug: parsed.data.serviceSlug,
    widthFt: Math.round(width * 100) / 100,
    lengthFt: Math.round(length * 100) / 100,
    notes,
  });
  return { id: quote.id };
}
