import React from "react";

const FilterButton = ({
  label,
  count,
  onClick,
  active = false,
}: {
  label: string;
  count: number;
  onClick: () => void;
  active?: boolean;
}) => (
  <li
    role="button"
    tabIndex={0}
    onClick={onClick}
    onKeyDown={(e) => e.key === "Enter" && onClick()}
    className={`flex justify-between items-center px-3 py-2 border text-sm cursor-pointer transition
      ${active ? "bg-[#ba933e] text-white border-[#ba933e]" : "hover:bg-[#f8f5f1]"}`}
  >
    <span>{label}</span>
    <span className="text-gray-500">({count})</span>
  </li>
);

export default FilterButton;
