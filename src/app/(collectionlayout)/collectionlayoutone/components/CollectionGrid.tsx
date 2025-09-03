"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { collections } from "@/utils/constants/constant";
export type Collection = {
  id: number;
  title: string;
  img: string;
};

type Props = {
  collectionsArray?: Collection[]; // optional prop, default to imported collections
  router: ReturnType<typeof useRouter>;
};

const CollectionGrid: React.FC<Props> = ({
  collectionsArray = collections, // default to imported collections
  router,
}) => {
  return (
    <div className="mt-18 ">
      <h1 className="text-base md:text-2xl font-bold mb-4 border-b pb-6">
        Home
      </h1>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 my-10">
        {collectionsArray
          .filter((c) => c.id <= 4)
          .map((c) => (
            <div
              key={c.id}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => router.push(`/collection/${c.id}`)}
            >
              <div className="relative md:w-60 md:h-60 w-80 h-80 overflow-hidden">
                <Image
                  src={c.img}
                  alt={c.title}
                  fill
                  className="object-cover hover:border-[#ba7c00] border-1"
                />
              </div>
              <span className="mt-2 text-center text-sm font-medium">
                {c.title}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CollectionGrid;
