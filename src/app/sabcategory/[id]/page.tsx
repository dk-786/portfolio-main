"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Blogmain1, posters } from "@/utils/constants/constant";
import { IoIosArrowDown } from "react-icons/io";
import { useAppContext } from "@/components/context/AppContext";
import { parsePriceToNumber } from "@/utils/parsePrice";
import { useRouter } from "next/navigation";
import { sameCategory, relatedTags } from "@/utils/constants/constant";
import {
  MdPerson,
  MdList,
  MdDateRange,
  MdComment,
  MdFavorite,
} from "react-icons/md";

const categories = [
  { title: "Furniture", sub: ["Lighting Lamp", "Decor Art"] },
  { title: "Chairs", sub: ["Artisan Appeal", "Boho Bliss"] },
  { title: "Sofas" },
  { title: "Construction" },
];

const categoriess = [
  { title: "Category 1", sub: ["Sub Category 1", "Sub Category 2"] },
];

const Page = () => {
  const { getConvertedPrice, language } = useAppContext();
  const [comments, setComments] = useState<string[]>([]);
  const { id } = useParams();
  const router = useRouter();

  const handleOpenBlog = (id: number) => {
    router.push(`/sabcategory/${id}`);
  };
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    comment: "",
    captcha: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.comment.trim()) return;

    setComments((prev) => [...prev, formData.comment]);
    setFormData({ fullName: "", email: "", comment: "", captcha: "" }); // reset form
  };
  type TranslationKeys = {
  turningTable: string;
  woodChair: string;
  desc: string;
  extraOff: string;
};

  const translations: Record<string, TranslationKeys> = {
    en: {
      turningTable: "Turning Table",
      woodChair: "Wood Chair",
      desc: "Class aptent taciti sociosqu ad litora",
      extraOff: "Extra 40% off",
    },
    es: {
      turningTable: "Mesa giratoria",
      woodChair: "Silla de madera",
      desc: "Clase aptent taciti sociosqu ad litora",
      extraOff: "40% extra de descuento",
    },
    ar: {
      turningTable: "طاولة دوارة",
      woodChair: "كرسي خشبي",
      desc: "كلاس أبتنت تاكتي سوسيوسكو أد ليتورا",
      extraOff: "خصم إضافي 40%",
    },
    pt: {
      turningTable: "Mesa giratória",
      woodChair: "Cadeira de madeira",
      desc: "Classe aptent taciti sociosqu ad litora",
      extraOff: "40% de desconto extra",
    },
    ru: {
      turningTable: "Вращающийся стол",
      woodChair: "Деревянный стул",
      desc: "Класс аптент такити социоску ад литора",
      extraOff: "Дополнительная скидка 40%",
    },
  };

  const blog = Blogmain1.find((b) => b.id === Number(id));
  const t = translations[language] || translations.en;

  const [openCategoryIndexes, setOpenCategoryIndexes] = useState<number[]>([]);
  const [openBlogCategoryIndexes, setOpenBlogCategoryIndexes] = useState<
    number[]
  >([]);

  if (!blog) return <div className="p-6 text-center">Blog not found</div>;

  const toggleCategory = (index: number) =>
    setOpenCategoryIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );

  const toggleBlogCategory = (index: number) =>
    setOpenBlogCategoryIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );

  return (
    <div className="w-full  max-w-8xl mx-auto flex  gap-8 p-10">
      {/* LEFT SIDEBAR */}
      <aside className="w-90 pr-6    md:block">
        <h1 className="text-lg font-bold mb-4">Home</h1>
        <ul className="space-y-4 pt-6 pb-6 border-b">
          {categories.map((cat, i) => (
            <li key={i}>
              <button
                onClick={() => toggleCategory(i)}
                className="flex items-center justify-between w-full text-sm font-medium text-gray-500 hover:text-[#ba933e]"
              >
                {cat.title}
                {cat.sub && (
                  <IoIosArrowDown
                    className={`transition-transform duration-300 ${
                      openCategoryIndexes.includes(i) ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>
              {cat.sub && openCategoryIndexes.includes(i) && (
                <ul className="ml-2 mt-4 space-y-2">
                  {cat.sub.map((s, j) => (
                    <li
                      key={j}
                      className="text-gray-500 hover:text-[#ba933e] cursor-pointer text-sm"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* BLOG CATEGORIES */}
        <h1 className="text-lg font-bold mt-10">Blog Categories</h1>
        <ul className="space-y-4 pt-6 pb-6 border-b">
          {categoriess.map((cat, i) => (
            <li key={i}>
              <button
                onClick={() => toggleBlogCategory(i)}
                className="flex items-center justify-between w-full text-sm font-medium text-gray-500 hover:text-[#ba933e]"
              >
                {cat.title}
                {cat.sub && (
                  <IoIosArrowDown
                    className={`transition-transform duration-300 ${
                      openBlogCategoryIndexes.includes(i) ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>
              {cat.sub && openBlogCategoryIndexes.includes(i) && (
                <ul className="ml-2 mt-4 mb-6 space-y-2">
                  {cat.sub.map((s, j) => (
                    <li
                      key={j}
                      className="text-gray-500 hover:text-[#ba933e] cursor-pointer text-sm"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* POPULAR ARTICLES */}
        <h1 className="text-lg font-bold mt-10">Popular Articles</h1>
        <div className="space-y-4 pt-6 pb-6 border-b">
          {Blogmain1.slice(0, 3).map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenBlog(item.id)}
              className="flex items-center gap-4 cursor-pointer hover:text-[#ba933e]"
            >
              <Image
                src={item.img}
                alt={item.title}
                width={70}
                height={70}
                className="w-[70px] h-[70px] object-cover rounded"
              />
              <div className="flex-1">
                <p className="text-sm font-medium line-clamp-2">{item.title}</p>
                <span className="text-xs text-gray-500">{item.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* RECENT ARTICLES */}
        <h1 className="text-lg font-bold mt-10">Recent Articles</h1>
        <div className="space-y-4 pt-6 pb-6 border-b">
          {Blogmain1.slice(-3).map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenBlog(item.id)}
              className="flex items-center gap-4 cursor-pointer hover:text-[#ba933e]"
            >
              <Image
                src={item.img}
                alt={item.title}
                width={70}
                height={70}
                className="w-[70px] h-[70px] object-cover rounded"
              />
              <div className="flex-1">
                <p className="text-sm font-medium line-clamp-2">{item.title}</p>
                <span className="text-xs text-gray-500">{item.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* POSTERS SECTION */}
        <div className="mt-16">
          <div className="grid grid-cols-1 gap-4 flex-1">
            {posters
              .filter((poster) => [3, 4].includes(poster.id))
              .map((poster, index) => (
                <div
                  key={poster.id}
                  className="relative w-full overflow-hidden group"
                >
                  <Image
                    src={poster.src}
                    alt={poster.alt}
                    width={600}
                    height={800}
                    className="block w-full h-auto object-cover transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6 text-black">
                    {index === 0 && (
                      <>
                        <h2 className="text-lg sm:text-2xl font-bold">
                          {t.turningTable}
                        </h2>
                        <p className="text-xs sm:text-sm mt-1">{t.desc}</p>
                        <span className="text-yellow-600 font-semibold mt-2 block hover:text-black transition-colors duration-200 text-sm sm:text-base">
                          {getConvertedPrice(parsePriceToNumber(poster.price))}
                        </span>
                      </>
                    )}
                    {index === 1 && (
                      <>
                        <h2 className="text-lg sm:text-2xl font-bold">
                          {t.woodChair}
                        </h2>
                        <p className="text-xs sm:text-sm mt-1">{t.desc}</p>
                        <span className="text-yellow-600 font-semibold mt-2 block hover:text-black transition-colors duration-200 text-sm sm:text-base">
                          {t.extraOff}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </aside>

      {/* RIGHT CONTENT */}
      <div className="flex-1">
        <h1 className="md:text-3xl font-bold text-gray-800 mb-4">
          {blog.title}
        </h1>
        <div className="w-full mb-6">
          <Image
            src={blog.img}
            alt={blog.title}
            width={1200}
            height={600}
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 py-2">
          {/* Posted By */}
          <div className="flex items-center gap-1">
            <MdPerson />
            <span className="hover:text-[#ba933e] cursor-pointer">
              Posted by: Demo Demo
            </span>
          </div>

          {/* Category */}
          <div className="flex items-center gap-1">
            <MdList />
            <span className="hover:text-[#ba933e] cursor-pointer">
              In: Sub Category 1
            </span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-1">
            <MdDateRange />
            <span>On: Tuesday September 17 2024</span>
          </div>

          {/* Comment */}
          <div className="flex items-center gap-1">
            <MdComment />
            <span>Comments: 0</span>
          </div>

          {/* Hits */}
          <div className="flex items-center gap-1">
            <MdFavorite />
            <span>Hit: 544</span>
          </div>
        </div>
        <div className="prose prose-lg text-gray-700 max-w-none leading-7">
          {blog.description}
        </div>

        <div className="flex mt-12 gap-20">
          {/* In Same Category */}
          <div className="flex flex-col w-1/2">
            <h1 className="md:text-xl font-bold text-black mb-4">
              In Same Category
            </h1>
            {sameCategory.map((item) => (
              <h1
                key={item.id}
                className="md:text-md text-gray-500 mb-2 border-b pb-2 cursor-pointer hover:text-[#ba933e]"
              >
                {item.title}
              </h1>
            ))}
          </div>

          {/* Related by Tags */}
          <div className="flex flex-col w-1/2">
            <h1 className="md:text-xl font-bold text-black mb-4">
              Related by Tags
            </h1>
            {relatedTags.map((item) => (
              <h1
                key={item.id}
                className="md:text-md text-gray-500 mb-2 border-b pb-2 cursor-pointer hover:text-[#ba933e]"
              >
                {item.title}
              </h1>
            ))}
          </div>
        </div>
        <div className="flex flex-col mt-6">
          <h1 className="md:text-xl font-bold text-black mb-4">Comments</h1>

          {comments.length === 0 ? (
            <div className="w-full bg-[#dff0d8] border-[#d0e9c6] text-[#3c763d] rounded p-3">
              No comment at this time!
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((c, idx) => (
                <div
                  key={idx}
                  className="w-full bg-gray-100 border border-gray-200  p-3"
                >
                  <p className="text-gray-800">{c}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col mt-6 ">
          <h1 className="md:text-xl font-bold text-black mb-4">
            Leave your comment
          </h1>
          <form
            onSubmit={handleSubmit}
            className="w-full  bg-white  p-6  space-y-6"
          >
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border  px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#ba933e]"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border  px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#ba933e]"
                required
              />
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Comment
              </label>
              <textarea
                name="comment"
                placeholder="Enter your comment"
                rows={4}
                value={formData.comment}
                onChange={handleChange}
                className="w-full border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#ba933e]"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white font-medium py-2 px-4  hover:bg-[#a68233] transition"
            >
              Submit Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
