"use client";
import Image from "next/image";
import Link from "next/link";

interface ArticleCardProps {
  id: number;
  img: string;
  title: string;
  date: string;
}

const ArticleCard = ({ id, img, title, date }: ArticleCardProps) => {
  return (
    <Link href={`/category/${id}`} className="block">
      <div className="flex gap-3 mb-4 hover:bg-gray-50 p-2  transition-colors">
        <div className="flex-shrink-0">
          <Image
            src={img}
            alt={title}
            width={80}
            height={60}
            className="w-20 h-15 object-cover "
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 hover:text-[#ba933e] transition-colors">
            {title}
          </h3>
          <p className="text-xs text-gray-500 mt-1">{date}</p>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
