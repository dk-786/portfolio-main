"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { SwiperProps } from "swiper/react";

const Swiper = dynamic(() => import("swiper/react").then(m => m.Swiper), {
  ssr: false,
});
const SwiperSlide = dynamic(() => import("swiper/react").then(m => m.SwiperSlide), {
  ssr: false,
});

type ClientSwiperProps = SwiperProps & {
  children?: React.ReactNode;
  className?: string;
};

export default function ClientSwiper({
  children,
  className,
  modules = [],
  ...swiperProps
}: ClientSwiperProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const childrenArray = React.Children.toArray(children).filter(Boolean);
  const shouldLoop = !!swiperProps.loop && childrenArray.length > 1;

  return (
    <Swiper
      className={className}
      modules={modules as SwiperProps["modules"]}
      {...swiperProps}
      loop={shouldLoop}
    >
      {childrenArray.map((child, i) =>
        (child as any).type?.displayName === "SwiperSlide" ? (
          child
        ) : (
          <SwiperSlide key={i}>{child}</SwiperSlide>
        )
      )}
    </Swiper>
  );
}
