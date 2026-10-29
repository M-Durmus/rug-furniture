"use client";

import { useState, type FormEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { contactSchema, type ContactInput } from "@/lib/trade/schema";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
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
      () => setSent(true),
      () => {
        formEl.dataset.placing = "";
      },
    )(event);
  }

  if (sent) {
    return (
      <p role="status" className="border border-line bg-card p-5">
        Message noted in this browser. The desk replies by email. Nothing was charged and no outside
        service was called.
      </p>
    );
  }

  return (
    <form className="space-y-3" noValidate onSubmit={onFormSubmit}>
      <label className="block text-sm" htmlFor="contact-name">
        Name
        <Input
          id="contact-name"
          autoComplete="name"
          className="mt-1"
          aria-invalid={!!form.formState.errors.name}
          aria-describedby={form.formState.errors.name ? "contact-name-error" : undefined}
          {...form.register("name")}
        />
      </label>
      {form.formState.errors.name ? (
        <p id="contact-name-error" role="alert" className="text-sm text-accent">
          {form.formState.errors.name.message}
        </p>
      ) : null}
      <label className="block text-sm" htmlFor="contact-email">
        Email
        <Input
          id="contact-email"
          type="email"
          autoComplete="email"
          className="mt-1"
          aria-invalid={!!form.formState.errors.email}
          aria-describedby={form.formState.errors.email ? "contact-email-error" : undefined}
          {...form.register("email")}
        />
      </label>
      {form.formState.errors.email ? (
        <p id="contact-email-error" role="alert" className="text-sm text-accent">
          {form.formState.errors.email.message}
        </p>
      ) : null}
      <label className="block text-sm" htmlFor="contact-phone">
        Phone
        <Input
          id="contact-phone"
          type="tel"
          autoComplete="tel"
          className="mt-1"
          {...form.register("phone")}
        />
      </label>
      <label className="block text-sm" htmlFor="contact-message">
        Message
        <textarea
          id="contact-message"
          rows={5}
          className="mt-1 w-full rounded-[2px] border border-line bg-background px-3 py-2"
          aria-invalid={!!form.formState.errors.message}
          aria-describedby={form.formState.errors.message ? "contact-message-error" : undefined}
          {...form.register("message")}
        />
      </label>
      {form.formState.errors.message ? (
        <p id="contact-message-error" role="alert" className="text-sm text-accent">
          {form.formState.errors.message.message}
        </p>
      ) : null}
      <Button type="submit" disabled={busy}>
        {busy ? "Sending" : "Send"}
      </Button>
    </form>
  );
}
