export const parsePriceToNumber = (price: string): number => {
  return parseFloat(price.replace(/[^0-9.]/g, "")) || 0;
};