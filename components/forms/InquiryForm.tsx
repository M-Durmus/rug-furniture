"use client";

import { useState } from "react";

type Props = {
  intent: string;
  city?: string;
  showDimensions?: boolean;
};

export function InquiryForm({ intent, city, showDimensions = false }: Props) {
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p role="status" className="min-h-12">
        Request received. A Wool & Loom specialist will reply by email with a quote. Nothing has been charged.
      </p>
    );
  }

  return (
    <form
      className="grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const name = String(data.get("name") || "").trim();
        const email = String(data.get("email") || "").trim();
        if (!name || !email.includes("@")) {
          setError("Enter your name and a valid email so we can send the quote.");
          return;
        }
        setError("");
        setDone(true);
      }}
    >
      <input type="hidden" name="intent" value={intent} />
      <div>
        <label htmlFor={`${intent}-name`} className="block text-sm">
          Name
        </label>
        <input id={`${intent}-name`} name="name" required autoComplete="name" className="mt-1 h-12 w-full rounded-[2px] border border-line bg-background px-3" />
      </div>
      <div>
        <label htmlFor={`${intent}-email`} className="block text-sm">
          Email
        </label>
        <input id={`${intent}-email`} name="email" type="email" required autoComplete="email" className="mt-1 h-12 w-full rounded-[2px] border border-line bg-background px-3" />
      </div>
      <div>
        <label htmlFor={`${intent}-phone`} className="block text-sm">
          Phone
        </label>
        <input id={`${intent}-phone`} name="phone" type="tel" autoComplete="tel" className="mt-1 h-12 w-full rounded-[2px] border border-line bg-background px-3" />
      </div>
      <div>
        <label htmlFor={`${intent}-city`} className="block text-sm">
          City
        </label>
        <input id={`${intent}-city`} name="city" defaultValue={city} autoComplete="address-level2" className="mt-1 h-12 w-full rounded-[2px] border border-line bg-background px-3" />
      </div>
      {showDimensions ? (
        <fieldset className="grid gap-3 sm:grid-cols-4">
          <legend className="text-sm">Finished size</legend>
          <div>
            <label htmlFor={`${intent}-feet-w`} className="block text-sm">
              Width feet
            </label>
            <input id={`${intent}-feet-w`} name="widthFeet" inputMode="numeric" min={0} max={30} className="mt-1 h-12 w-full rounded-[2px] border border-line bg-background px-3" />
          </div>
          <div>
            <label htmlFor={`${intent}-in-w`} className="block text-sm">
              Width inches
            </label>
            <input id={`${intent}-in-w`} name="widthInches" inputMode="numeric" min={0} max={11} className="mt-1 h-12 w-full rounded-[2px] border border-line bg-background px-3" />
          </div>
          <div>
            <label htmlFor={`${intent}-feet-l`} className="block text-sm">
              Length feet
            </label>
            <input id={`${intent}-feet-l`} name="lengthFeet" inputMode="numeric" min={0} max={40} className="mt-1 h-12 w-full rounded-[2px] border border-line bg-background px-3" />
          </div>
          <div>
            <label htmlFor={`${intent}-in-l`} className="block text-sm">
              Length inches
            </label>
            <input id={`${intent}-in-l`} name="lengthInches" inputMode="numeric" min={0} max={11} className="mt-1 h-12 w-full rounded-[2px] border border-line bg-background px-3" />
          </div>
        </fieldset>
      ) : null}
      <div>
        <label htmlFor={`${intent}-message`} className="block text-sm">
          Notes
        </label>
        <textarea id={`${intent}-message`} name="message" rows={4} className="mt-1 w-full rounded-[2px] border border-line bg-background px-3 py-2" />
      </div>
      <p role="alert" className="min-h-6 text-sm">
        {error}
      </p>
      <button type="submit" className="inline-flex min-h-12 items-center justify-center rounded-[2px] bg-inverse px-5 text-inverse-foreground">
        Request a quote
      </button>
    </form>
  );
}
