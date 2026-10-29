"use client";

import { useId, useState } from "react";
import { useToast } from "@/components/ui/Toast";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterForm() {
  const toast = useToast();
  const inputId = useId();
  const errorId = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!emailPattern.test(email.trim())) {
      setError("Enter an email address like name@studio.com.");
      toast("Enter a valid email address.");
      return;
    }
    setError("");
    setDone(true);
    console.info("[wool-loom] newsletter", email.trim());
    toast("You’re on the list for 10% off your first order.");
  }

  if (done) {
    return (
      <p role="status" className="text-sm text-ink">
        You are on the list. Use {email.trim()} at checkout for 10% off your first order.
      </p>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <label htmlFor={inputId} className="text-sm text-ink">
        Email address
      </label>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
        <input
          id={inputId}
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => setEmail(event.target.value)}
          className="h-10 w-full rounded-[2px] border border-line bg-bg px-3 text-ink"
        />
        <button
          type="submit"
          className="inline-flex h-10 shrink-0 items-center justify-center rounded-[2px] bg-accent px-4 text-bg"
        >
          Sign up
        </button>
      </div>
      {error ? (
        <p id={errorId} className="mt-2 text-sm text-accent">
          {error}
        </p>
      ) : null}
    </form>
  );
}
