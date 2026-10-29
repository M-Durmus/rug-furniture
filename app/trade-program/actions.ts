"use server";

import { submitTradeApplication } from "@/lib/data/catalog";
import { tradeSchema, type TradeInput } from "@/lib/trade/schema";

export async function sendTradeApplication(
  input: TradeInput,
): Promise<{ id: string } | { errors: Record<string, string> }> {
  const parsed = tradeSchema.safeParse(input);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!errors[key]) errors[key] = issue.message;
    }
    return { errors };
  }
  const application = await submitTradeApplication({
    businessName: parsed.data.businessName,
    email: parsed.data.email,
    phone: parsed.data.phone,
    website: parsed.data.website || undefined,
    role: parsed.data.role,
    projectTypes: parsed.data.projectTypes.join(", "),
    resaleCertificate: parsed.data.resaleCertificate || undefined,
    notes: `Role: ${parsed.data.role}. Project types: ${parsed.data.projectTypes.join(", ")}.`,
  });
  return { id: application.id };
}
