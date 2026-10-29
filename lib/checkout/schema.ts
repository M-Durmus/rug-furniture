import { z } from "zod";
import { US_STATES } from "@/lib/checkout/states";

export const checkoutSchema = z.object({
  email: z.string().trim().email("Enter a valid email."),
  name: z.string().trim().min(2, "Enter the name for delivery."),
  address: z.string().trim().min(5, "Enter a street address."),
  city: z.string().trim().min(2, "Enter a city."),
  state: z
    .string()
    .refine((code) => US_STATES.some((state) => state.code === code), "Choose a state."),
  zip: z.string().regex(/^\d{5}$/, "Enter a 5-digit ZIP code."),
  delivery: z.literal("standard", { error: "Choose the delivery method." }),
  coupon: z.string(),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;

export const signInSchema = z.object({
  email: z.string().trim().email("Enter a valid email."),
  password: z.string().min(4, "Use at least 4 characters. This sign-in stays in this browser."),
});

export type SignInInput = z.infer<typeof signInSchema>;
