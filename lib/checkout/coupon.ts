export const COUPON_CODE = "WELCOME10";

export function couponRate(code: string): number {
  return code.trim().toUpperCase() === COUPON_CODE ? 0.1 : 0;
}

export function couponError(code: string): string | null {
  const trimmed = code.trim();
  if (!trimmed) return null;
  if (couponRate(trimmed) === 0.1) return null;
  return "That code is not active. WELCOME10 takes 10% off.";
}
