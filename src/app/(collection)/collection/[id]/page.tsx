import Navbar from "@/components/collections/Navbar";
import { collections } from "@/utils/constants/constant";
import Image from "next/image";

interface PageProps {
  params: Promise<{ id: string }>; 
}

export default async function CollectionPage({ params }: PageProps) {
  const { id } = await params; // await the params promise

  const collection = collections.find((c) => c.id.toString() === id);

  if (!collection) {
    return <div className="p-10">Collection not found</div>;
  }

  return (
    <div className="w-full flex">
      <Navbar id={id} />
      <div className="container w-full mx-auto py-16">
        <h1 className="text-base md:text-xl font-bold mb-4">
          {collection.title}
        </h1>
        <div className="w-full max-w-lg">
          <Image
            src={collection.img}
            alt={collection.title}
            width={250}
            height={250}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
