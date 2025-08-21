"use client";
import React from "react";
import { cartPricing } from "@/utils/constants/constant";
import { MdDelete } from "react-icons/md";
import { useRouter }from "next/navigation";


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

interface CartModalProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onIncQty: (cartId: string) => void;
  onDecQty: (cartId: string) => void;
  onRemove: (cartId: string) => void;
}

const CartModal: React.FC<CartModalProps> = ({
  open,
  onClose,
  items,
  onIncQty,
  onDecQty,
  onRemove,
}) => {
  if (!open) return null;

  const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const shipping = cartPricing.shippingFlat;
  const taxes = Math.round(subtotal * cartPricing.taxRate * 100) / 100;
  const total = subtotal + shipping + taxes;
   const router = useRouter();

  const format = (n: number) => `${cartPricing.currencySymbol}${n.toFixed(2)}`;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Drawer */}
      <div
        className="relative bg-white w-full sm:w-[400px] h-full shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-2 border-b">
          <h2 className="text-xl font-bold">Added to your cart</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-black cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="p-6 space-y-4">
          {items.map((it) => (
            <div
              key={it.cartId}
              className="flex items-center gap-4 border border-gray-200 p-3 rounded-lg relative"
            >
              <img
                src={it.img}
                alt={it.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <div className="font-semibold text-gray-800">{it.name}</div>
                {it.size || it.color ? (
                  <div className="text-xs flex flex-col text-gray-500">
                    {it.size && <span>Size: {it.size} </span>}
                    {it.color && <span>Color: {it.color}</span>}
                  </div>
                ) : null}
                <div className="text-sm text-gray-600">{format(it.price)}</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onDecQty(it.cartId)}
                  className="w-8 h-8 border rounded flex items-center justify-center text-lg cursor-pointer"
                >
                  -
                </button>
                <span className="min-w-[24px] text-center font-semibold">
                  {it.qty}
                </span>
                <button
                  onClick={() => onIncQty(it.cartId)}
                  className="w-8 h-8 border rounded flex items-center justify-center text-lg cursor-pointer"
                >
                  +
                </button>
                <MdDelete
                  className="text-gray-400 hover:text-red-500 text-lg cursor-pointer"
                  onClick={() => onRemove(it.cartId)}
                  aria-label="Remove"
                />
              </div>
            </div>
          ))}

          {/* Totals */}
          <div className="border-t pt-4 space-y-1 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{format(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{format(shipping)}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span>{format(taxes)}</span>
            </div>
            <div className="flex justify-between font-semibold text-black pt-2 text-base">
              <span>Total</span>
              <span>{format(total)}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 flex items-center justify-center gap-4 border-t pt-4 ">
          <button className="bg-black text-white px-8 py-2 rounded hover:bg-black/80 cursor-pointer"   onClick={() =>{ onClose(); router.push(`/cart/${items[0]?.cartId}`)}}>
            View cart
          </button>
          <button className="bg-black text-white px-8 py-2 rounded hover:bg-black/80 cursor-pointer" onClick={() =>{onClose(); router.push(`/checkout/${items[0]?.cartId}`)}}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
