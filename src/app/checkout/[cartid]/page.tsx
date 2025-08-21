"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { cartStore } from "@/utils/cartStore";
import { cartPricing } from "@/utils/constants/constant";

const Page: React.FC = () => {
  const router = useRouter();
  const items = cartStore.getItems();

  // Shipping form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // totals
  const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const shipping = cartPricing.shippingFlat;
  const taxes = Math.round(subtotal * cartPricing.taxRate * 100) / 100;
  const total = subtotal + shipping + taxes;
  const format = (n: number) => `${cartPricing.currencySymbol}${n.toFixed(2)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Order placed successfully 🚀");
    cartStore.clear();
    router.push("/");
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col gap-6 items-center justify-center p-6 h-dvh text-lg">
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

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* LEFT - Form */}
      <form
        onSubmit={handleSubmit}
        className="lg:col-span-2 space-y-6 border rounded-xl p-6 shadow-sm"
      >
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>

        {/* Shipping Info */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Shipping Information</h2>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring focus:ring-black/30"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring focus:ring-black/30"
            required
          />
          <textarea
            name="address"
            placeholder="Street Address"
            value={form.address}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring focus:ring-black/30"
            rows={2}
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:ring focus:ring-black/30"
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={form.state}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:ring focus:ring-black/30"
              required
            />
            <input
              type="text"
              name="zip"
              placeholder="ZIP Code"
              value={form.zip}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:ring focus:ring-black/30"
              required
            />
          </div>
        </div>

        {/* Payment Info */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Payment Details</h2>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={form.cardNumber}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring focus:ring-black/30"
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              name="expiry"
              placeholder="MM/YY"
              value={form.expiry}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:ring focus:ring-black/30"
              required
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={form.cvv}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:ring focus:ring-black/30"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-black/80 transition"
        >
          Place Order
        </button>
      </form>

      {/* RIGHT - Order Summary */}
      <div className="border rounded-xl p-6 shadow-sm h-fit space-y-4">
        <h2 className="text-lg font-semibold">Order Summary</h2>
        <div className="space-y-3 text-sm text-gray-700">
          {items.map((it) => (
            <div
              key={it.cartId}
              className="flex items-center justify-between border-b pb-2"
            >
              <div>
                <p className="font-medium">{it.name}</p>
                <p className="text-xs text-gray-500">
                  Qty: {it.qty} × {format(it.price)}
                </p>
              </div>
              <span className="font-semibold">
                {format(it.qty * it.price)}
              </span>
            </div>
          ))}

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
    </div>
  );
};

export default Page;
