"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendTradeApplication } from "@/app/trade-program/actions";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { PROJECT_TYPES, ROLES, tradeSchema, type TradeInput } from "@/lib/trade/schema";

export function TradeForm() {
  const [reference, setReference] = useState("");
  const form = useForm<TradeInput>({
    resolver: zodResolver(tradeSchema),
    defaultValues: {
      businessName: "",
      website: "",
      role: undefined,
      projectTypes: [],
      email: "",
      phone: "",
      resaleCertificate: "",
    },
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
      async (values) => {
        const result = await sendTradeApplication(values);
        if ("errors" in result) {
          for (const [key, message] of Object.entries(result.errors)) {
            if (key === "form") form.setError("root", { message });
            else form.setError(key as keyof TradeInput, { message });
          }
          formEl.dataset.placing = "";
          return;
        }
        setReference(result.id);
      },
      () => {
        formEl.dataset.placing = "";
      },
    )(event);
  }

  if (reference) {
    return (
      <div role="status" className="border border-line bg-card p-5">
        <h2 className="font-serif text-h3">Application received</h2>
        <p className="mt-3">
          Reference <span className="font-medium">{reference}</span>. The trade desk will reply to
          the email on the form. Nothing is charged.
        </p>
      </div>
    );
  }

  return (
    <form className="max-w-xl space-y-4" noValidate onSubmit={onFormSubmit}>
      <Field
        label="Business name"
        id="trade-business"
        error={form.formState.errors.businessName?.message}
      >
        <Input
          id="trade-business"
          autoComplete="organization"
          aria-invalid={!!form.formState.errors.businessName}
          aria-describedby={form.formState.errors.businessName ? "trade-business-error" : undefined}
          {...form.register("businessName")}
        />
      </Field>
      <Field
        label="Website"
        id="trade-website"
        error={form.formState.errors.website?.message}
        hint="Optional."
      >
        <Input
          id="trade-website"
          type="url"
          placeholder="https://"
          aria-invalid={!!form.formState.errors.website}
          aria-describedby={
            form.formState.errors.website ? "trade-website-error" : "trade-website-hint"
          }
          {...form.register("website")}
        />
      </Field>
      <Field label="Role" id="trade-role" error={form.formState.errors.role?.message}>
        <Select
          id="trade-role"
          aria-invalid={!!form.formState.errors.role}
          aria-describedby={form.formState.errors.role ? "trade-role-error" : undefined}
          {...form.register("role")}
        >
          <option value="">Choose a role</option>
          {ROLES.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </Select>
      </Field>
      <fieldset>
        <legend className="text-sm">Project types</legend>
        <div className="mt-2 space-y-2">
          {PROJECT_TYPES.map((type) => (
            <label key={type} className="flex min-h-10 items-center gap-2">
              <input type="checkbox" value={type} {...form.register("projectTypes")} />
              {type}
            </label>
          ))}
        </div>
        {form.formState.errors.projectTypes ? (
          <p role="alert" className="mt-1 text-sm text-accent">
            {form.formState.errors.projectTypes.message}
          </p>
        ) : null}
      </fieldset>
      <Field label="Email" id="trade-email" error={form.formState.errors.email?.message}>
        <Input
          id="trade-email"
          type="email"
          autoComplete="email"
          aria-invalid={!!form.formState.errors.email}
          aria-describedby={form.formState.errors.email ? "trade-email-error" : undefined}
          {...form.register("email")}
        />
      </Field>
      <Field label="Phone" id="trade-phone" error={form.formState.errors.phone?.message}>
        <Input
          id="trade-phone"
          type="tel"
          autoComplete="tel"
          aria-invalid={!!form.formState.errors.phone}
          aria-describedby={form.formState.errors.phone ? "trade-phone-error" : undefined}
          {...form.register("phone")}
        />
      </Field>
      <Field
        label="Resale certificate"
        id="trade-resale"
        hint="Optional. A certificate number is enough. Do not attach a file."
      >
        <Input
          id="trade-resale"
          aria-describedby="trade-resale-hint"
          {...form.register("resaleCertificate")}
        />
      </Field>
      {form.formState.errors.root ? (
        <p role="alert" className="text-accent">
          {form.formState.errors.root.message}
        </p>
      ) : null}
      <Button type="submit" disabled={busy}>
        {busy ? "Sending the application" : "Apply"}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm" htmlFor={id}>
        {label}
      </label>
      <div className="mt-1">{children}</div>
      {hint ? (
        <p id={`${id}-hint`} className="mt-1 text-sm text-mute">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1 text-sm text-accent">
          {error}
        </p>
      ) : null}
    </div>
  );
}
