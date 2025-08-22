import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useAppContext } from "@/components/context/AppContext";

type Option = {
  code: string;
  name: string;
  flag?: string;
  symbol?: string;
};

interface DropdownProps {
  options: Option[];
  type?: "language" | "currency";
}

const Dropdown: React.FC<DropdownProps> = ({ options, type = "language" }) => {
  const { language, setLanguage, currency, setCurrency } = useAppContext();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Pick correct selected value from context
  const selected =
    type === "language"
      ? options.find((o) => o.code === language) || options[0]
      : options.find((o) => o.code === currency) || options[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: Option) => {
    if (type === "language") setLanguage(option.code);
    else setCurrency(option.code);
    setOpen(false);
  };

  return (
    <div className="relative text-sm" ref={dropdownRef}>
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-gray-600 cursor-pointer hover:text-[#ba933e]"
      >
        {type === "language" ? (
          <>
            <span>{selected.flag}</span>
            <span>{selected.name}</span>
          </>
        ) : (
          <span>{selected.name}</span>
        )}
        <IoIosArrowDown className="mt-1" />
      </div>

      {open && (
        <div className="absolute mt-2 bg-white shadow-md rounded-md border border-gray-200 z-50 w-32">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleSelect(option)}
              className="cursor-pointer flex items-center gap-2 px-3 py-2 hover:text-[#ba933e]"
            >
              {type === "language" && <span>{option.flag}</span>}
              <span>{option.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
