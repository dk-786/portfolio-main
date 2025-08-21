"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { cartStore, CartItem } from "@/utils/cartStore";
import { cartPricing } from "@/utils/constants/constant";
import { MdDelete } from "react-icons/md";
import Image from "next/image";

const Page = () => {
  const { cartId } = useParams();
  const [items, setItems] = useState<CartItem[]>(cartStore.getItems());
  const router = useRouter();

  useEffect(() => {
    const unsub = cartStore.subscribe(() => {
      setItems([...cartStore.getItems()]);
    });
    return unsub;
  }, []);

  if (items.length === 0) {
    return (
      <div className="flex flex-col gap-6  items-center justify-center p-6 h-dvh text-lg">
        Your cart is empty
        <button
          className="bg-gray-300 text-black px-8 py-2 rounded hover:bg-gray-200 cursor-pointer"
          onClick={() => router.push("/")}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  // totals
  const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const shipping = cartPricing.shippingFlat;
  const taxes = Math.round(subtotal * cartPricing.taxRate * 100) / 100;
  const total = subtotal + shipping + taxes;

  const format = (n: number) => `${cartPricing.currencySymbol}${n.toFixed(2)}`;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <p className="text-gray-500 mb-6">
        Cart ID : <span className="font-mono">{cartId}</span>
      </p>

      {/* Left + Right Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {/* LEFT - Items */}
        <div className="md:col-span-2 space-y-4">
          {items.map((it) => (
            <div
              key={it.cartId}
              className="flex items-center gap-6 border p-4 rounded-lg"
            >
              {/* Bigger Image */}
              <Image
                src={it.img}
                alt={it.name}
                width={112}
                height={152}
                className="w-28 h-38 object-cover rounded"
              />

              {/* Product details + counter */}
              <div className="flex-1 flex  justify-between">
                <div>
                  <div className="text-xl text-gray-800">{it.name}</div>
                  {it.size || it.color ? (
                    <div className="text-xs flex flex-col text-gray-500">
                      {it.size && (
                        <span className="text-sm">Size: {it.size}</span>
                      )}
                      {it.color && <span>Color: {it.color}</span>}
                    </div>
                  ) : null}
                  <div className="text-sm text-gray-600">
                    {format(it.price)}
                  </div>
                </div>

                {/* Qty Controls */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => cartStore.dec(it.cartId)}
                    className="w-8 h-8 border rounded flex items-center justify-center text-lg cursor-pointer"
                  >
                    -
                  </button>
                  <span className="min-w-[24px] text-center font-semibold">
                    {it.qty}
                  </span>
                  <button
                    onClick={() => cartStore.inc(it.cartId)}
                    className="w-8 h-8 border rounded flex items-center justify-center text-lg cursor-pointer"
                  >
                    +
                  </button>
                  <MdDelete
                    className="text-gray-400 hover:text-red-500 text-xl cursor-pointer"
                    onClick={() => cartStore.remove(it.cartId)}
                    aria-label="Remove"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT - Totals */}
        <div className="border rounded-lg p-6 h-fit space-y-4">
          <div className="space-y-2 text-sm text-gray-700">
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

          {/* Buttons */}
          <div className="flex justify-center gap-3 pt-4 border-t">
            <button className="bg-black w-full  text-white px-8 py-2 rounded hover:bg-black/80 cursor-pointer" onClick={() => router.push(`/checkout/${items[0]?.cartId}`)}>
             Proceed to Checkout
            </button>
          </div>
          <button
            className="w-full bg-gray-200 text-black px-8 py-2 rounded hover:bg-gray-200 cursor-pointer"
            onClick={() => router.push("/")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
