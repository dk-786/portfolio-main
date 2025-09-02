import React from "react";
import FilterButton from "./FilterButton";

type Option = {
  key: string;
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
};

const FilterSection = ({ title, options }: { title: string; options: Option[] }) => (
  <div>
    <h3 className="font-medium mb-3">{title}</h3>
    <ul className="grid grid-cols-2 gap-2">
      {options.map((opt) => (
        <FilterButton
          key={opt.key}
          label={opt.label}
          count={opt.count}
          active={opt.active}
          onClick={opt.onClick}
        />
      ))}
    </ul>
  </div>
);

export default FilterSection;
