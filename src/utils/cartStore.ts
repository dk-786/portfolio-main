"use client";
export type CartItem = {
  cartId: string; 
  id: number;       
  name: string;
  img: string;
  price: number;
  qty: number;
  size?: string;
  color?: string;
};


type Subscriber = () => void;

class CartStore {
  private items: CartItem[] = [];
  private subscribers: Subscriber[] = [];

  getItems(): CartItem[] {
    return this.items;
  }

  getTotalQty(): number {
    return this.items.reduce((sum, it) => sum + it.qty, 0);
  }

  subscribe(cb: Subscriber): () => void {
    this.subscribers.push(cb);
    return () => {
      this.subscribers = this.subscribers.filter((s) => s !== cb);
    };
  }

  private notify() {
    for (const s of this.subscribers) s();
  }

  add(item: Omit<CartItem, "qty" | "cartId">, qty: number = 1) {
    const newItem: CartItem = {
      ...item,
      qty: Math.max(1, qty),
      cartId: crypto.randomUUID(), // 👈 always new id
    };
    this.items.push(newItem);
    this.notify();
  }

  inc(cartId: string) {
    const it = this.items.find((i) => i.cartId === cartId);
    if (it) {
      it.qty += 1;
      this.notify();
    }
  }

  dec(cartId: string) {
    const it = this.items.find((i) => i.cartId === cartId);
    if (it) {
      it.qty = Math.max(1, it.qty - 1);
      this.notify();
    }
  }

  remove(cartId: string) {
    this.items = this.items.filter((it) => it.cartId !== cartId);
    this.notify();
  }
   clear() {
    this.items = [];
    this.notify();
  }
  
}

export const cartStore = new CartStore();

export function parsePriceToNumber(price: string): number {
  const n = Number((price || "").replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}
