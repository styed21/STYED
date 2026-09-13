export type GiftFrequency = "once" | "monthly";
export const giftAmounts = [25, 50, 100, 250] as const;
export const giftAreas = [
  "Where it is needed most",
  "Education & mentorship",
  "Community safety & housing stability",
  "Immigrant youth & family support",
] as const;

/** Demo amounts use integer cents; never create a payment or store donor details. */
export function parseGiftAmount(value: string): number | null {
  if (!/^\d+(?:\.\d{1,2})?$/.test(value.trim())) return null;
  const cents = Math.round(Number(value) * 100);
  return Number.isSafeInteger(cents) && cents >= 100 && cents <= 1_000_000
    ? cents
    : null;
}

export function formatGift(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}
