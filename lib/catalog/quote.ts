import { z } from "zod";
import { SERVICE_SLUGS } from "@/lib/catalog/service-area";

export const quoteSchema = z.object({
  serviceSlug: z.enum(SERVICE_SLUGS, { error: "Choose a service." }),
  stateSlug: z.string().min(1, "Choose a state."),
  citySlug: z.string().min(1, "Choose a city."),
  zip: z.string().regex(/^\d{5}$/, "Enter a 5-digit ZIP code."),
  widthFt: z.number().min(1, "Enter the width in feet.").max(30),
  widthIn: z.number().min(0, "Inches run from 0 to 11.").max(11),
  lengthFt: z.number().min(1, "Enter the length in feet.").max(40),
  lengthIn: z.number().min(0, "Inches run from 0 to 11.").max(11),
  material: z.enum(["Wool", "Flatweave wool", "Silk blend", "Not sure"], {
    error: "Choose a material.",
  }),
  condition: z.enum(
    ["Light soil", "Heavy soil", "Fringe or edge damage", "A hole", "Needs a new size"],
    { error: "Choose the condition." },
  ),
  notes: z.string().max(1000, "Keep the note under 1000 characters."),
  name: z.string().trim().min(2, "Enter your name."),
  email: z.string().trim().email("Enter a valid email."),
  phone: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || /^[0-9()\-\s+]{10,20}$/.test(value),
      "Enter a phone number, or leave it blank.",
    ),
});

export type QuoteDraft = z.infer<typeof quoteSchema>;

export const quoteSteps = ["Service", "Location", "Rug details", "Contact", "Review"] as const;

const stepFields: Array<Array<keyof QuoteDraft>> = [
  ["serviceSlug"],
  ["stateSlug", "citySlug", "zip"],
  ["widthFt", "widthIn", "lengthFt", "lengthIn", "material", "condition", "notes"],
  ["name", "email", "phone"],
  [],
];

export function issuesFor(draft: Partial<QuoteDraft>, step: number): Record<string, string> {
  const parsed = quoteSchema.safeParse({
    notes: "",
    phone: "",
    ...draft,
  });
  if (parsed.success) return {};
  const fields = new Set(stepFields[step] ?? []);
  const errors: Record<string, string> = {};
  for (const issue of parsed.error.issues) {
    const key = String(issue.path[0] ?? "");
    if (fields.has(key as keyof QuoteDraft) && !errors[key]) errors[key] = issue.message;
  }
  return errors;
}

export function emptyDraft(partial?: Partial<QuoteDraft>): QuoteDraft {
  return {
    serviceSlug: partial?.serviceSlug ?? "rug-cleaning",
    stateSlug: partial?.stateSlug ?? "",
    citySlug: partial?.citySlug ?? "",
    zip: partial?.zip ?? "",
    widthFt: partial?.widthFt ?? 0,
    widthIn: partial?.widthIn ?? 0,
    lengthFt: partial?.lengthFt ?? 0,
    lengthIn: partial?.lengthIn ?? 0,
    material: partial?.material ?? "Wool",
    condition: partial?.condition ?? "Light soil",
    notes: partial?.notes ?? "",
    name: partial?.name ?? "",
    email: partial?.email ?? "",
    phone: partial?.phone ?? "",
  };
}
