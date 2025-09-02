"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BlogPoster = () => {
  const pathname = usePathname(); // e.g. "/blog/chairs/123"
  const segments = pathname.split("/").filter(Boolean); // ["blog", "chairs", "123"]

  return (
    <div className="w-full md:h-[350px] h-[250px] relative">
      {/* Background image */}
      <>
        {/* Desktop image */}
        <Image
          src="/images/1.jpg"
          alt="Blog header image"
          fill
          className="object-cover hidden md:block"
        />

        {/* Mobile image */}
        <Image
          src="/images/1.jpg"
          alt="Blog header image mobile"
          fill
          className="object-cover !h-60 block md:hidden"
        />
      </>

      {/* Overlay content */}
      <div className="absolute md:left-6 md:top-1/2 md:-translate-y-1/2   top-1/3 text-black p-4">
        {/* Dynamic Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm md:text-base font-medium">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          {segments.map((segment, index) => {
            const href = "/" + segments.slice(0, index + 1).join("/");
            const isLast = index === segments.length - 1;

            return (
              <React.Fragment key={index}>
                <span>/</span>
                {isLast ? (
                  <span className="text-black capitalize">{segment}</span>
                ) : (
                  <Link href={href} className="hover:underline capitalize">
                    {segment}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default BlogPoster;
