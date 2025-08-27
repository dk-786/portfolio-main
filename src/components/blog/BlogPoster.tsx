"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BlogPoster = () => {
  const pathname = usePathname(); // e.g. "/blog/chairs/123"
  const segments = pathname.split("/").filter(Boolean); // ["blog", "chairs", "123"]

  return (
    <div className="w-full h-[350px] relative">
      {/* Background image */}
      <Image
        src="/images/1.jpg"
        alt="Blog header image"
        fill
        className="object-cover hidden md:block"
      />

      {/* Overlay content */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-black p-4">
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
