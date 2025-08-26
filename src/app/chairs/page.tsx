"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { follow } from "@/utils/constants/constant";
import { Suspense } from 'react';

// Define the component logic for the page content
const PageContent = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const collection = follow.find((c) => c.id.toString() === id);

    if (!collection) {
        return (
            <div className="p-10 text-center">
                <h2 className="text-xl font-semibold">Collection not found</h2>
            </div>
        );
    }

    return (
        <div className="w-full mx-auto p-4 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* LEFT: Filters */}
                <aside className="md:col-span-3 space-y-8 w-full">
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
                </aside>

                {/* RIGHT: Content */}
                <section className="md:col-span-9">
                    <div className="flex-col container mx-auto py-10 flex ">
                        <span className="text-base md:text-xl font-bold mb-4">{collection.title}</span>
                        <div className="w-full max-w-lg">
                            <Image
                                src={collection.img}
                                alt={`Collection ${collection.id}`}
                                width={300}
                                height={300}
                                className="rounded-lg object-cover"
                            />
                        </div>
                        <span className="text-gray-500 py-3">Items and accessories for your desk, kitchen or living room. Make your house a home with our eye-catching designs.</span>
                    </div>
                    <div>
                    </div>
                </section>
            </div>
        </div>
    );
};

// Main page component wrapped with Suspense
const ChairsPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PageContent />
        </Suspense>
    );
};

export default ChairsPage;

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