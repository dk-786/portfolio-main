"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  navigationItems,
  shopCategories,
  productss,
  follow,
  collections,
} from "@/utils/constants/constant";
import { Star } from "lucide-react";
import { FaAngleDown } from "react-icons/fa6";

const NavbarDropdown = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <nav className="bg-white relative ">
      <div className="container mx-auto flex justify-between items-center h-8">
        {/* Menu */}
        <ul className="hidden md:flex items-center gap-8 ">
          {navigationItems.map((item) => (
            <li
              key={item.title}
              className="relative"
              onMouseEnter={() => setOpenMenu(item.title)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-primary transition "
                >
                  {item.title}
                </Link>
              ) : (
                <span className="flex py-6 items-center gap-1 cursor-pointer  transition hover:text-[#ba933e]">
                  {item.title}
                  <FaAngleDown className="w-3 h-3" />
                </span>
              )}

              {/* Shop Mega Menu */}
              {item.title === "Shop" && openMenu === "Shop" && (
                <div className="absolute top-full max-w-screen-xl  w-screen  -translate-x-96 bg-popover shadow p-6 z-50">
                  <div className="container mx-auto  grid grid-cols-5 gap-6">
                    {shopCategories.map((category) => (
                      <div key={category.title}>
                        <h4 className="mb-2 font-semibold text-lg">
                          {category.title}
                        </h4>
                        <ul className="space-y-1">
                          {category.items.map((catItem) => (
                            <li key={catItem.title}>
                              <Link
                                href={catItem.href}
                                className="block text-sm py-1 text-muted-foreground hover:text-[#ba933e] transition"
                              >
                                {catItem.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    {/* Popular Products */}
                    <div className="col-span-1">
                      <h4 className="mb-3 font-semibold text-sm">
                        Popular products
                      </h4>
                      <div className="space-y-4">
                        {productss
                          .filter((p) => [12, 13, 14].includes(p.id))
                          .map((p) => (
                            <div
                              key={p.id}
                              className="flex gap-3 border-b pb-3 last:border-0"
                            >
                              <div className="w-16 h-20 relative shrink-0">
                                <Image
                                  src={p.img}
                                  alt={p.name}
                                  fill
                                  className="object-cover rounded-md"
                                />
                              </div>
                              <div className="flex-1">
                                <h5 className="text-1xl font-medium">
                                  {p.name}
                                </h5>
                                <div className="flex text-yellow-500 mt-1 text-xs">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      size={14}
                                      fill="currentColor"
                                    />
                                  ))}
                                </div>
                                <div className="text-sm font-semibold mt-3">
                                  {p.newPrice}
                                  {p.oldPrice && (
                                    <span className="ml-2 line-through text-xs text-muted-foreground">
                                      {p.oldPrice}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Collections Mega Menu */}
              {item.title === "Collections" && openMenu === "Collections" && (
                <div className="absolute top-full max-w-screen-xl w-screen  bg-popover left-1/2 -translate-x-1/2 shadow p-6 z-50 !overflow-x-hidden">
                  <div className="container mx-auto  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {follow.map((c) => (
                      <div
                        key={c.id}
                        className="relative w-40 h-40 rounded-md overflow-hidden"
                      >
                        <Image
                          src={c.img}
                          alt={`Collection ${c.id}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Simple Dropdown */}
              {item.dropdownItems &&
                item.title !== "Shop" &&
                item.title !== "Collections" &&
                openMenu === item.title && (
                  <div className="absolute top-full left-0   bg-popover shadow p-6 w-48 z-50">
                    <ul className="space-y-1">
                      {item.dropdownItems.map((drop) => (
                        <li key={drop.title}>
                          <Link
                            href={drop.href}
                            className="block text-1xl text-muted-foreground hover:text-[#ba933e] transition"
                          >
                            {drop.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavbarDropdown;
