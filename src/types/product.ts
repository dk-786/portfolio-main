// src/types/product.ts
export type Product = {
  id: number | string;
  img?: string;
  hoverImg?: string;
  discount?: string;
  name?: string;
  oldPrice?: string;
  newPrice?: string | number;
  newimg?: string;
  stock?: number | string;
  available?: boolean;
  category?: string;
  composition?: string;
  properties?: string[];
  brand?: string;
  paperType?: string;
  dicription?: string;
  // allow extra fields:
  [key: string]: unknown;
};
