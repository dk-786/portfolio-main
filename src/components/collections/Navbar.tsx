"use client";
import { collections } from "@/utils/constants/constant";

interface NavbarProps {
  id: string;
}

const Navbar = ({ id }: NavbarProps) => {
  const collection = collections.find((c) => c.id.toString() === id);

  return (
    <div className="w-full max-w-[27%] mx-auto p-4 md:p-8">
      <div className="text-base mb-6 md:text-lg font-bold py-8 border-b ">
        {collection?.title ?? "No Title Found"}
      </div>
      <section className="md:col-span-3 space-y-8 w-full ">
        <h2 className="text-xl font-semibold">Filter By</h2>

        {/* Availability */}
        <div>
          <h3 className="font-medium mb-3">Availability</h3>
          <ul className="grid grid-cols-2 gap-2">
            {FILTERS.availability.map((f) => (
              <FilterButton key={f.label} label={f.label} count={f.count} />
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-medium mb-3">Categories</h3>
          <ul className="grid grid-cols-2 gap-2">
            {FILTERS.categories.map((f) => (
              <FilterButton key={f.label} label={f.label} count={f.count} />
            ))}
          </ul>
        </div>

        {/* Composition */}
        <div>
          <h3 className="font-medium mb-3">Composition</h3>
          <ul className="grid grid-cols-2 gap-2">
            {FILTERS.composition.map((f) => (
              <FilterButton key={f.label} label={f.label} count={f.count} />
            ))}
          </ul>
        </div>

        {/* Property */}
        <div>
          <h3 className="font-medium mb-3">Property</h3>
          <ul className="grid grid-cols-2 gap-2">
            {FILTERS.property.map((f) => (
              <FilterButton key={f.label} label={f.label} count={f.count} />
            ))}
          </ul>
        </div>

        {/* Brand */}
        <div>
          <h3 className="font-medium mb-3">Brand</h3>
          <ul className="grid grid-cols-2 gap-2">
            {FILTERS.brand.map((f) => (
              <FilterButton key={f.label} label={f.label} count={f.count} />
            ))}
          </ul>
        </div>

        {/* Paper Type */}
        <div>
          <h3 className="font-medium mb-3">Paper Type</h3>
          <ul className="grid grid-cols-2 gap-2">
            {FILTERS.paperType.map((f) => (
              <FilterButton key={f.label} label={f.label} count={f.count} />
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Navbar;

// Moved data below the component to maintain structure
const FILTERS = {
  availability: [
    { label: "In stock", count: 10 },
    { label: "Not available", count: 1 },
  ],
  price: { min: 10, max: 32, currency: "€" },
  categories: [
    { label: "Artisan Appeal", count: 3 },
    { label: "Boho Bliss", count: 8 },
  ],
  colors: ["Black", "White", "Brown", "Beige"],
  composition: [
    { label: "Ceramic", count: 4 },
    { label: "Polyester", count: 3 },
    { label: "Recycled cardboard", count: 3 },
  ],
  property: [
    { label: "120 pages", count: 3 },
    { label: "Removable cover", count: 3 },
  ],
  brand: [
    { label: "Graphic Corner", count: 3 },
    { label: "Studio Design", count: 7 },
  ],
  paperType: [
    { label: "Ruled", count: 3 },
    { label: "Plain", count: 3 },
    { label: "Squarred", count: 3 },
    { label: "Doted", count: 3 },
  ],
};

const FilterButton = ({ label, count }: { label: string; count: number }) => (
  <li
    className="flex justify-between items-center px-3 py-2 border text-sm cursor-pointer 
                hover:bg-[#ba933e] hover:text-white transition"
  >
    <span>{label}</span>
    <span className="text-gray-500">({count})</span>
  </li>
);
