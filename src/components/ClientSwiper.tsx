"use client";

import React from "react";
import { Swiper } from "swiper/react";
import "../app/globals.css"; 
import { Navigation } from "swiper/modules";
import { SwiperModule ,SwiperOptions} from "swiper/types";

// Define props type with specific types for Swiper configuration
type ClientSwiperProps = {
  children: React.ReactNode;
  className?: string;
  modules?: SwiperModule[];
  navigation?: boolean;
  loop?: boolean;
  grid?: { rows: number; fill: "row" | "column" };
  spaceBetween?: number;
  slidesPerView?: number | "auto";
  autoplay?: boolean | { delay?: number; disableOnInteraction?: boolean };
  breakpoints?: Record<string, SwiperOptions>;
  slidesPerGroup?: number;
  style?: React.CSSProperties;
};

const ClientSwiper: React.FC<ClientSwiperProps> = ({
  children,
  className = "",
  navigation = false,
  loop = false,
  spaceBetween = 0,
  slidesPerView = 1,
  breakpoints,
  slidesPerGroup,
  style,
}) => {
  return (
    <Swiper
      // Modules are passed here
      modules={[Navigation]}
      navigation={navigation}
      loop={loop}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      breakpoints={breakpoints}
      slidesPerGroup={slidesPerGroup}
      className={className}
      style={style}
    >
      {children}
    </Swiper>
  );
};

export default ClientSwiper;
