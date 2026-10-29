"use client";

import { useState, type FormEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { waitlistSchema, type WaitlistInput } from "@/lib/trade/schema";

export function RoomPreviewWaitlist() {
  const [joined, setJoined] = useState(false);
  const form = useForm<WaitlistInput>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: { email: "" },
  });
  const busy = form.formState.isSubmitting;

  function onFormSubmit(event: FormEvent<HTMLFormElement>) {
    const formEl = event.currentTarget;
    if (formEl.dataset.placing === "1") {
      event.preventDefault();
      return;
    }
    formEl.dataset.placing = "1";
    void form.handleSubmit(
      () => {
        setJoined(true);
      },
      () => {
        formEl.dataset.placing = "";
      },
    )(event);
  }

  if (joined) {
    return (
      <p role="status" className="border border-line bg-card p-5">
        You are on the list. We will write when room preview can place a rug in a photo. Nothing was
        sent to a payment service.
      </p>
    );
  }

  return (
    <form className="max-w-md space-y-3" noValidate onSubmit={onFormSubmit}>
      <label className="block text-sm" htmlFor="waitlist-email">
        Email
        <Input
          id="waitlist-email"
          type="email"
          autoComplete="email"
          className="mt-1"
          aria-invalid={!!form.formState.errors.email}
          aria-describedby={form.formState.errors.email ? "waitlist-email-error" : undefined}
          {...form.register("email")}
        />
      </label>
      {form.formState.errors.email ? (
        <p id="waitlist-email-error" role="alert" className="text-sm text-accent">
          {form.formState.errors.email.message}
        </p>
      ) : null}
      <Button type="submit" disabled={busy}>
        {busy ? "Joining" : "Join the waitlist"}
      </Button>
    </form>
  );
}
