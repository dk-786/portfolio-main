"use client";
import React from "react";
import Poster from "@/components/Poster";
import Products from "@/components/common/Products";
import Card from "@/components/common/Card";
import Slider from "@/components/common/Slider";
import Subscribe from "@/components/Subscribe";
import Featuresection from "@/components/Featuresection";
import Blogmain from "@/components/Blogmain";
import Brandlogo from "@/components/Brandlogo";
import Follow from "@/components/Follow";
import { sliderData } from "@/utils/constants/constant";
import { useAppContext } from "@/components/context/AppContext";

export default function Home() {
  const { getConvertedPrice } = useAppContext();

  const homeSliderData = sliderData.filter((item) =>
    [7, 8, 9].includes(item.id)
  );

  return (
    <div>
      <Slider data={homeSliderData} getConvertedPrice={getConvertedPrice} />
      <Card />
      <Poster />
      <Products />
      <Subscribe />
      <Featuresection />
      <Blogmain />
      <Brandlogo />
      <Follow />
    </div>
  );
}
