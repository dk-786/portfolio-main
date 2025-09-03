// utils/cartStore.ts
export const parsePriceToNumber = (price: string): number => {
  if (!price) return 0;
  // Remove everything except digits and decimal point
  return Number(price.replace(/[^0-9.]/g, "")) || 0;
};
