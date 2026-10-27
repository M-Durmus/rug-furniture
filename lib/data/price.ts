/** Selling price for one size. `basePrice` is the price of the reference size. */
export function priceForSize(
  basePrice: number,
  widthFt: number,
  lengthFt: number,
  referenceWidthFt = 8,
  referenceLengthFt = 10,
): number {
  if (referenceWidthFt <= 0 || referenceLengthFt <= 0) {
    throw new Error("Reference size must be greater than zero");
  }
  const ratio = (widthFt * lengthFt) / (referenceWidthFt * referenceLengthFt);
  return Math.round(basePrice * ratio);
}

export function money(value: number): number {
  return Math.round(value * 100) / 100;
}
