"use client";
import React, { useState, useEffect } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { FiX } from "react-icons/fi";
import {
  navigationItems,
  shopCategories,
  collections,
} from "@/utils/constants/constant";

interface MobiledrawerProps {
  onSignIn: () => void;
  onRegister: () => void;
}

const Mobiledrawer = ({ onSignIn, onRegister }: MobiledrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  // 🔒 Prevent background scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={toggleDrawer}
        className="flex flex-col items-center justify-center w-8 h-8 space-y-1"
      >
        <span className="block w-6 h-0.5 bg-gray-800"></span>
        <span className="block w-6 h-0.5 bg-gray-800"></span>
        <span className="block w-6 h-0.5 bg-gray-800"></span>
      </button>

      {/* Mobile Drawer */}
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        size={300}
        className="z-50"
      >
        <div className="h-full bg-white flex flex-col">
          {/* Header (Fixed) */}
          <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
            <div></div>
            <button
              onClick={toggleDrawer}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Navigation Links (Scrollable Section inside drawer only) */}
          <div className="flex-1 overflow-y-auto w-full ">
            <ul className="space-y-2">
              {navigationItems.map((item, index) => (
                <li key={index}>
                  <div className="space-y-1  border-b p-2">
                    {item.hasDropdown ? (
                      <>
                        <button
                          onClick={() => toggleDropdown(item.title)}
                          className="flex items-center justify-between w-full py-2 p-1 text-gray-800 hover:text-[#ba933e] transition-colors"
                        >
                          <span className="text-md font-bold">
                            {item.title}
                          </span>
                          <IoIosArrowDown
                            className={`transition-transform ${
                              openDropdown === item.title ? "rotate-180" : ""
                            }`}
                            size={16}
                          />
                        </button>

                        {/* Dropdown Handling */}
                        {openDropdown === item.title && (
                          <div className="pl-4 space-y-1">
                            {/* Case 1: normal dropdownItems */}
                            {item.dropdownItems &&
                              item.dropdownItems.map((subItem, subIndex) => (
                                <Link
                                  key={subIndex}
                                  href={subItem.href}
                                  className="block py-1 text-md text-gray-600 hover:text-[#ba933e] transition-colors"
                                  onClick={toggleDrawer}
                                >
                                  {subItem.title}
                                </Link>
                              ))}

                            {/* Case 2: Shop mega menu */}
                            {item.title === "Shop" &&
                              shopCategories.map((cat, catIndex) => (
                                <div key={catIndex} className="mt-2">
                                  <span className="font-semibold text-md text-gray-800">
                                    {cat.title}
                                  </span>
                                  <div className="pl-4  space-y-2  my-2">
                                    {cat.items.map((shopItem, shopIndex) => (
                                      <Link
                                        key={shopIndex}
                                        href={shopItem.href}
                                        className="block py-1 text-md text-gray-600 hover:text-[#ba933e] transition-colors"
                                        onClick={toggleDrawer}
                                      >
                                        {shopItem.title}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}

                            {/* Case 3: Collections */}
                            {item.title === "Collections" &&
                              collections.map((col) => (
                                <Link
                                  key={col.id}
                                  href={`/collection/${col.id}`}
                                  className="block  ml-1 py-1 text-sm text-gray-600 hover:text-[#ba933e] transition-colors mt-4"
                                  onClick={toggleDrawer}
                                >
                                  <img
                                    src={col.img}
                                    alt={col.title}
                                    className="w-60 h-60 object-cover rounded"
                                  />
                                </Link>
                              ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href || "#"}
                        className="block py-2 text-xl font-bold text-gray-800 hover:text-[#ba933e] transition-colors"
                        onClick={toggleDrawer}
                      >
                        {item.title}
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Mobiledrawer;
