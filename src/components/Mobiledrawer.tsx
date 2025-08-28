"use client";
import React, { useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { FiX } from "react-icons/fi";
import { navigationItems } from "@/utils/constants/constant";

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
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div></div>
            <button
              onClick={toggleDrawer}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 p-4 space-y-4">
            <div className="space-y-2">
              <ul className="space-y-2">
                {navigationItems.map((item, index) => (
                  <li key={index}>
                    <div className="space-y-1">
                      {item.hasDropdown ? (
                        <>
                          <button
                            onClick={() => toggleDropdown(item.title)}
                            className="flex items-center justify-between w-full py-2 p-1 text-gray-800 hover:text-[#ba933e] transition-colors"
                          >
                            <span className="text-xl font-bold">
                              {item.title}
                            </span>
                            <IoIosArrowDown
                              className={`transition-transform ${
                                openDropdown === item.title ? "rotate-180" : ""
                              }`}
                              size={16}
                            />
                          </button>
                          {openDropdown === item.title &&
                            item.dropdownItems && (
                              <div className="pl-4 space-y-1">
                                {item.dropdownItems.map((subItem, subIndex) => (
                                  <Link
                                    key={subIndex}
                                    href={subItem.href}
                                    className="block py-1 text-sm text-gray-600 hover:text-[#ba933e] transition-colors"
                                    onClick={toggleDrawer}
                                  >
                                    {subItem.title}
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
        </div>
      </Drawer>
    </div>
  );
};

export default Mobiledrawer;
