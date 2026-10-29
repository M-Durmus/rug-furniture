"use client";

import { useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { sendQuote } from "@/app/book-service/actions";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { findServedCity, findZip, serviceAreas } from "@/lib/catalog/service-area";
import { emptyDraft, issuesFor, quoteSteps, type QuoteDraft } from "@/lib/catalog/quote";
import type { Service } from "@/types";

const KEY = "wool-loom-quote-draft";
const EVENT = "wool-loom-quote";

function subscribe(onStoreChange: () => void) {
  window.addEventListener(EVENT, onStoreChange);
  return () => window.removeEventListener(EVENT, onStoreChange);
}

function read(key: string) {
  return window.sessionStorage.getItem(key) ?? "";
}

function parse(raw: string): Partial<QuoteDraft> & { step?: number } {
  if (!raw) return {};
  try {
    const value = JSON.parse(raw) as Partial<QuoteDraft> & { step?: number };
    return value && typeof value === "object" ? value : {};
  } catch {
    return {};
  }
}

function save(key: string, draft: QuoteDraft, step: number) {
  window.sessionStorage.setItem(key, JSON.stringify({ ...draft, step }));
  window.dispatchEvent(new Event(EVENT));
}

export function QuoteForm({
  services,
  defaults,
  initialReference,
}: {
  services: Service[];
  defaults?: Partial<Pick<QuoteDraft, "serviceSlug" | "stateSlug" | "citySlug">>;
  initialReference?: string;
}) {
  const router = useRouter();
  const storageKey =
    defaults?.stateSlug && defaults.citySlug
      ? `${KEY}:${defaults.serviceSlug ?? ""}:${defaults.stateSlug}:${defaults.citySlug}`
      : KEY;
  const raw = useSyncExternalStore(
    subscribe,
    () => read(storageKey),
    () => "",
  );
  const stored = parse(raw);
  const draft = emptyDraft({
    ...defaults,
    ...stored,
    serviceSlug: stored.serviceSlug ?? defaults?.serviceSlug,
    stateSlug: stored.stateSlug || defaults?.stateSlug || "",
    citySlug: stored.citySlug || defaults?.citySlug || "",
  });
  const step = Math.min(stored.step ?? 0, quoteSteps.length - 1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);
  const [reference, setReference] = useState<string | null>(initialReference ?? null);
  const areas = serviceAreas();
  const chosen = findServedCity(draft.stateSlug, draft.citySlug);
  const state = areas.find((area) => area.stateSlug === draft.stateSlug) ?? areas[0];
  const cities = state?.cities ?? [];

  function update(partial: Partial<QuoteDraft>, nextStep = step) {
    save(storageKey, emptyDraft({ ...draft, ...partial }), nextStep);
  }

  function next() {
    const found = issuesFor(draft, step);
    if (step === 1 && /^\d{5}$/.test(draft.zip)) {
      const zipCity = findZip(draft.zip);
      if (!zipCity) found.zip = "That ZIP is outside the cities we serve.";
      else if (zipCity.slug !== draft.citySlug || zipCity.stateSlug !== draft.stateSlug) {
        found.zip = `That ZIP is in ${zipCity.name}, ${zipCity.state}.`;
      }
    }
    setErrors(found);
    if (Object.keys(found).length === 0) update({}, Math.min(step + 1, quoteSteps.length - 1));
  }

  async function submit() {
    const found = issuesFor(draft, 3);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    setPending(true);
    const result = await sendQuote(draft);
    setPending(false);
    if ("errors" in result) {
      setErrors(result.errors);
      return;
    }
    window.sessionStorage.removeItem(storageKey);
    window.dispatchEvent(new Event(EVENT));
    setReference(result.id);
    router.replace(`/book-service?ref=${result.id}`);
  }

  if (reference) {
    return (
      <div className="mt-8 border border-line bg-card p-6">
        <h2 className="font-serif text-h2">Quote request received</h2>
        <p className="mt-3">
          Your reference number is <span className="font-medium">{reference}</span>. We reply with a
          quote after we read the size and the city. There is no charge for the quote.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <ol className="flex flex-wrap gap-2" aria-label="Quote progress">
        {quoteSteps.map((label, index) => (
          <li key={label}>
            <span
              className={
                index === step
                  ? "inline-flex min-h-10 items-center border border-ink px-3 text-sm"
                  : "inline-flex min-h-10 items-center border border-line px-3 text-sm text-mute"
              }
              aria-current={index === step ? "step" : undefined}
            >
              {index + 1}. {label}
            </span>
          </li>
        ))}
      </ol>

      {step === 0 ? (
        <fieldset className="mt-6 space-y-2">
          <legend className="text-sm font-medium">Service</legend>
          {services.map((service) => (
            <label key={service.slug} className="flex min-h-10 items-center gap-2">
              <input
                type="radio"
                name="service"
                value={service.slug}
                checked={draft.serviceSlug === service.slug}
                onChange={() => update({ serviceSlug: service.slug as QuoteDraft["serviceSlug"] })}
              />
              {service.name}
              <span className="text-sm text-mute">Priced by quote</span>
            </label>
          ))}
          <FieldError message={errors.serviceSlug} />
        </fieldset>
      ) : null}

      {step === 1 ? (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <label className="block text-sm">
            State
            <Select
              className="mt-1"
              value={draft.stateSlug}
              onChange={(event) => {
                const next = areas.find((area) => area.stateSlug === event.target.value);
                update({ stateSlug: event.target.value, citySlug: next?.cities[0]?.slug ?? "" });
              }}
            >
              <option value="">Choose a state</option>
              {areas.map((area) => (
                <option key={area.stateSlug} value={area.stateSlug}>
                  {area.state}
                </option>
              ))}
            </Select>
            <FieldError message={errors.stateSlug} />
          </label>
          <label className="block text-sm">
            City
            <Select
              className="mt-1"
              value={draft.citySlug}
              onChange={(event) => update({ citySlug: event.target.value })}
            >
              <option value="">Choose a city</option>
              {cities.map((city) => (
                <option key={city.slug} value={city.slug}>
                  {city.name}
                </option>
              ))}
            </Select>
            <FieldError message={errors.citySlug} />
          </label>
          <label className="block text-sm sm:col-span-2">
            ZIP code
            <Input
              className="mt-1 max-w-40"
              inputMode="numeric"
              maxLength={5}
              value={draft.zip}
              onChange={(event) => update({ zip: event.target.value })}
            />
            <FieldError message={errors.zip} />
          </label>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <NumberField
            label="Width, feet"
            value={draft.widthFt}
            error={errors.widthFt}
            onChange={(value) => update({ widthFt: value })}
          />
          <NumberField
            label="Width, inches"
            value={draft.widthIn}
            error={errors.widthIn}
            onChange={(value) => update({ widthIn: value })}
          />
          <NumberField
            label="Length, feet"
            value={draft.lengthFt}
            error={errors.lengthFt}
            onChange={(value) => update({ lengthFt: value })}
          />
          <NumberField
            label="Length, inches"
            value={draft.lengthIn}
            error={errors.lengthIn}
            onChange={(value) => update({ lengthIn: value })}
          />
          <label className="block text-sm">
            Material
            <Select
              className="mt-1"
              value={draft.material}
              onChange={(event) =>
                update({ material: event.target.value as QuoteDraft["material"] })
              }
            >
              {["Wool", "Flatweave wool", "Silk blend", "Not sure"].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </Select>
            <FieldError message={errors.material} />
          </label>
          <label className="block text-sm">
            Condition
            <Select
              className="mt-1"
              value={draft.condition}
              onChange={(event) =>
                update({ condition: event.target.value as QuoteDraft["condition"] })
              }
            >
              {[
                "Light soil",
                "Heavy soil",
                "Fringe or edge damage",
                "A hole",
                "Needs a new size",
              ].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </Select>
            <FieldError message={errors.condition} />
          </label>
          <label className="block text-sm sm:col-span-2">
            Notes
            <textarea
              className="mt-1 min-h-24 w-full rounded-[2px] border border-line bg-card px-3 py-2 text-[15px]"
              value={draft.notes}
              onChange={(event) => update({ notes: event.target.value })}
            />
            <FieldError message={errors.notes} />
          </label>
          <div className="sm:col-span-2">
            <label className="block text-sm" htmlFor="quote-photo">
              Photo
            </label>
            <input
              id="quote-photo"
              className="mt-1 block w-full text-sm text-mute"
              type="file"
              accept="image/*"
              disabled
              aria-describedby="quote-photo-note"
            />
            <p id="quote-photo-note" className="mt-1 text-sm text-mute">
              Photo upload is coming soon. Describe the rug in the notes for now.
            </p>
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="mt-6 grid gap-3">
          <TextField
            label="Name"
            value={draft.name}
            error={errors.name}
            autoComplete="name"
            onChange={(value) => update({ name: value })}
          />
          <TextField
            label="Email"
            value={draft.email}
            error={errors.email}
            type="email"
            autoComplete="email"
            onChange={(value) => update({ email: value })}
          />
          <TextField
            label="Phone"
            value={draft.phone}
            error={errors.phone}
            type="tel"
            autoComplete="tel"
            onChange={(value) => update({ phone: value })}
          />
        </div>
      ) : null}

      {step === 4 ? (
        <dl className="mt-6 max-w-xl space-y-2 text-sm">
          <Row
            label="Service"
            value={
              services.find((service) => service.slug === draft.serviceSlug)?.name ??
              draft.serviceSlug
            }
          />
          <Row
            label="City"
            value={
              chosen ? `${chosen.name}, ${chosen.state}` : `${draft.citySlug}, ${draft.stateSlug}`
            }
          />
          <Row label="ZIP" value={draft.zip} />
          <Row
            label="Size"
            value={`${draft.widthFt}' ${draft.widthIn}" × ${draft.lengthFt}' ${draft.lengthIn}"`}
          />
          <Row label="Material" value={draft.material} />
          <Row label="Condition" value={draft.condition} />
          <Row label="Notes" value={draft.notes || "None"} />
          <Row label="Name" value={draft.name} />
          <Row label="Email" value={draft.email} />
          <Row label="Phone" value={draft.phone || "None"} />
          <p>The quote is free. We do not publish a flat rate for this work.</p>
        </dl>
      ) : null}

      <div className="mt-6 flex gap-2">
        {step > 0 ? (
          <Button variant="outline" onClick={() => update({}, step - 1)}>
            Back
          </Button>
        ) : null}
        {step < quoteSteps.length - 1 ? <Button onClick={next}>Continue</Button> : null}
        {step === quoteSteps.length - 1 ? (
          <Button onClick={submit} disabled={pending}>
            {pending ? "Sending" : "Submit the quote"}
          </Button>
        ) : null}
      </div>
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <span role="alert" className="mt-1 block text-accent">
      {message}
    </span>
  );
}

function NumberField({
  label,
  value,
  error,
  onChange,
}: {
  label: string;
  value: number;
  error?: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block text-sm">
      {label}
      <Input
        className="mt-1"
        type="number"
        min={0}
        value={Number.isFinite(value) ? value : 0}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <FieldError message={error} />
    </label>
  );
}

function TextField({
  label,
  value,
  error,
  onChange,
  type = "text",
  autoComplete,
}: {
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block text-sm">
      {label}
      <Input
        className="mt-1"
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <FieldError message={error} />
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[8rem_1fr] gap-2 border-b border-line py-2">
      <dt className="text-mute">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
