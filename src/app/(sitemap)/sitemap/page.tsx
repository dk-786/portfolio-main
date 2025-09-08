"use client";
import React from "react";

const Sitemap = () => {
  const sitemapData = [
    {
      title: "OUR OFFERS",
      links: [
        { label: "New products" },
        { label: "Best sellers" },
        { label: "Price drop" },
        { label: "Brands" },
        { label: "Graphic Corner" },
        { label: "Studio Design" },
      ],
    },
    {
      title: "CATEGORIES",
      links: [
        { label: "Home" },
        { label: "Furniture" },
        { label: "Lighting Lamp" },
        { label: "Decor Art" },
        { label: "Chairs" },
        { label: "Sofas" },
        { label: "Boho Bliss" },
        { label: "Construction" },
      ],
    },
    {
      title: "YOUR ACCOUNT",
      links: [
        { label: "Log in" },
        { label: "Create new account" },
        { label: "Order history" },
        { label: "Wishlist" },
      ],
    },
    {
      title: "PAGES",
      links: [
        { label: "Delivery" },
        { label: "Legal Notice" },
        { label: "Terms and Conditions" },
        { label: "About us" },
        { label: "Secure payment" },
        { label: "FAQs" },
        { label: "Our stores" },
        { label: "Contact us" },
        { label: "Sitemap" },
      ],
    },
  ];

  return (
    <div className="p-8 md:p-16 text-gray-800 mx-auto rounded-lg py-10">
      <h1 className="text-3xl font-bold mb-8 border-b pb-4">SITEMAP</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {sitemapData.map((section) => (
          <div key={section.title}>
            <h2 className="text-lg font-semibold mb-4 uppercase">{section.title}</h2>
            <ul className="space-y-2">
              {section.links.map((link, idx) => (
                <li key={idx} className="text-gray-600">
                  {link.label}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sitemap;
