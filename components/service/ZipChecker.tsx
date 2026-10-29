"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { findZip, localServicePath, type ServedCity } from "@/lib/catalog/service-area";

export function ZipChecker({ serviceSlug }: { serviceSlug?: string }) {
  const [zip, setZip] = useState("");
  const [match, setMatch] = useState<ServedCity | null | undefined>(undefined);
  const [error, setError] = useState("");

  return (
    <form
      className="mt-4"
      onSubmit={(event) => {
        event.preventDefault();
        if (!/^\d{5}$/.test(zip.trim())) {
          setMatch(undefined);
          setError("Enter a 5-digit ZIP code.");
          return;
        }
        setError("");
        const found = findZip(zip.trim());
        setMatch(found ?? null);
      }}
    >
      <label className="block text-sm" htmlFor="zip-check">
        ZIP code
      </label>
      <div className="mt-1 flex gap-2">
        <Input
          id="zip-check"
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={5}
          value={zip}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "zip-check-error" : undefined}
          onChange={(event) => setZip(event.target.value)}
          className="max-w-40"
        />
        <Button type="submit">Check ZIP</Button>
      </div>
      {error ? (
        <p id="zip-check-error" className="mt-3 text-sm text-accent" role="alert">
          {error}
        </p>
      ) : null}
      {match === null ? (
        <p className="mt-3 text-sm" role="status">
          That ZIP is outside the cities we serve.
        </p>
      ) : null}
      {match ? (
        <p className="mt-3 text-sm" role="status">
          We serve {match.name}, {match.state}.
          {serviceSlug ? (
            <>
              {" "}
              <Link
                href={localServicePath(serviceSlug, match.stateSlug, match.slug)}
                className="underline underline-offset-4"
              >
                {match.name} service page
              </Link>
            </>
          ) : null}
        </p>
      ) : null}
    </form>
  );
}
