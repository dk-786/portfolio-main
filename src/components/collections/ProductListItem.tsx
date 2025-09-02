import Image from "next/image";
import { Product } from "@/types/product";
import { useRouter } from "next/navigation";

export default function ProductListItem({ p }: { p: Product }) {
  const router = useRouter();
  return (
    <div key={p.id} className="flex gap-6 items-start border-b pb-6">
      <div className="w-64 h-74 bg-gray-100 flex-shrink-0">
        <Image
          src={String(p.img ?? "")}
          alt={String(p.name ?? "")}
          width={400}
          height={400}
          className="object-cover w-full h-full"
          unoptimized
        />
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold mb-2">{p.name}</h3>
        <p className="text-gray-600 mb-4">{p.dicription}</p>
        <div className="flex items-center gap-4">
          <div className="text-gray-400 line-through">{p.oldPrice}</div>
          <div className="text-[#a67c00] font-bold text-lg">{p.newPrice}</div>
        </div>
        <div className="mt-4">
          <button
            className="px-4 py-2 bg-black text-white rounded cursor-pointer hover:bg-[#a67c00] transition"
            onClick={() => router.push(`/card/${p.id}`)}
          >
            View product
          </button>
        </div>
      </div>
    </div>
  );
}
