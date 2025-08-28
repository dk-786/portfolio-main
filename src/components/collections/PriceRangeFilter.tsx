"use client";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface PriceRangeFilterProps {
  range: [number, number];
  setRange: (range: [number, number]) => void;
}

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({ range, setRange }) => {
  return (
    <div className="py-4">
      <h3 className="font-medium mb-4">Price Range</h3>

      <Slider
        range
        min={0}
        max={200}   
        step={10}
        value={range}
        onChange={(val) => setRange(val as [number, number])}
      />

      <div className="flex justify-between mt-2 text-sm">
        <span>${range[0]}</span>
        <span>${range[1]}</span>
      </div>
    </div>
  );
};

export default PriceRangeFilter;
