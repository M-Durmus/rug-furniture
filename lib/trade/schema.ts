import { z } from "zod";

export const PROJECT_TYPES = ["Residential", "Hospitality", "Retail floor", "Staging"] as const;

export const ROLES = ["Designer", "Retailer", "Architect", "Stager"] as const;

export const tradeSchema = z.object({
  businessName: z.string().trim().min(2, "Enter the business name."),
  website: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || /^https?:\/\/\S+\.\S+/.test(value),
      "Enter a full website address, including https.",
    ),
  role: z.enum(ROLES, { error: "Choose a role." }),
  projectTypes: z.array(z.enum(PROJECT_TYPES)).min(1, "Choose at least one project type."),
  email: z.string().trim().email("Enter a valid email."),
  phone: z
    .string()
    .trim()
    .refine(
      (value) => value.replace(/\D/g, "").length >= 10,
      "Enter a phone number with an area code.",
    ),
  resaleCertificate: z.string().trim(),
});

export type TradeInput = z.infer<typeof tradeSchema>;

export const waitlistSchema = z.object({
  email: z.string().trim().email("Enter a valid email."),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name."),
  email: z.string().trim().email("Enter a valid email."),
  phone: z.string().trim(),
  message: z.string().trim().min(12, "Tell us what you need, in a sentence or two."),
});

export type ContactInput = z.infer<typeof contactSchema>;
