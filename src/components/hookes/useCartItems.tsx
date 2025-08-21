import { CartItem, cartStore } from "@/utils/cartStore";
import { useEffect, useState } from "react";


export function useCartItems(): CartItem[] {
  const [items, setItems] = useState<CartItem[]>(cartStore.getItems());

  useEffect(() => {
    const unsub = cartStore.subscribe(() => {
      setItems([...cartStore.getItems()]); // 👈 update state on change
    });
    return unsub;
  }, []);

  return items;
}
