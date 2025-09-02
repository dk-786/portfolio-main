import Image from "next/image";
import { collections } from "@/utils/constants/constant";

type Collection = (typeof collections)[number];

export default function CollectionHeader({
  collection,
  rawParam,
}: {
  collection?: Collection;
  rawParam: string;
}) {
  return (
    <div className="flex flex-col w-full mx-auto md:py-16 py-0 text-center md:text-left">
      <h1 className="text-2xl md:text-xl font-bold mb-4">
        {collection?.title ?? rawParam}
      </h1>
      {collection?.img && (
        <div className="flex justify-center md:justify-start">
          <Image
            src={collection.img}
            alt={collection.title}
            width={250}
            height={250}
            className="object-cover md:h-62 h-full md:w-62 w-full rounded-lg mb-4"
          />
        </div>
      )}
      <span className="text-gray-500 py-4 block">
        Details matter! Liven up your interior with our selection of home
        accessories.
      </span>
    </div>
  );
}
