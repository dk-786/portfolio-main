"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { products, productss } from "@/utils/constants/constant";
import WriteReviewModal from "@/components/modals/WriteReviewModal";
import SizeGuideModal from "@/components/modals/SizeGuideModal";
import CartModal from "@/components/modals/CartModal";
import { cartStore, parsePriceToNumber } from "@/utils/cartStore";
import { useCartItems } from "@/components/hookes/useCartItems";
import { useAppContext } from "@/components/context/AppContext";
import {
  ProductImage,
  ProductHeader,
  CountdownTimer,
  ProductPricing,
  SizeSelector,
  ColorSelector,
  QuantitySelector,
  ProductActions,
  ProductInfo,
  ProductTabs,
  RelatedProducts,
} from "@/components/product";

const Page = () => {
  const params = useParams();
  const idParam = Array.isArray(params?.id)
    ? params.id[0]
    : (params?.id as string | undefined);
  const [hovered, setHovered] = useState<number | null>(null);
  const productId = Number(idParam);

  const allProducts = [...products, ...productss];
  const product = allProducts.find((p) => p.id === productId);
  const [value, setValue] = useState(0);
  const [count, setCount] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const sizes = ["S", "M", "L", "XL"];
  const { getConvertedPrice } = useAppContext();
  const [activeTab, setActiveTab] = useState<
    "description" | "product" | "details" | "reviews" | "shipping"
  >("description");
  const [showWriteReview, setShowWriteReview] = useState<boolean>(false);
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);
  const [showCart, setShowCart] = useState(false);
  const cartItems = useCartItems();

  const [showPopup, setShowPopup] = useState(false);
  const handleAddToCartPopup = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
     window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    cartStore.add(
      {
        id: product.id,
        name: product.name,
        img: product.img,
        price: parsePriceToNumber(product.newPrice),
        size: selectedSize ?? undefined,
        color: selected ?? undefined,
      },
      Math.max(1, count)
    );
    setShowCart(false);
    handleAddToCartPopup();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!product) {
    return <h1 className="text-center">Product Not Found</h1>;
  }

  return (
    <>
      <section className="flex flex-col md:flex-row md:p-8  md:justify-between w-full">
        <ProductImage img={product.img} name={product.name} />
        
        <div className="w-full md:w-[50%] py-4">
          <ProductHeader
            name={product.name}
            value={value}
            setValue={setValue}
            onWriteReview={() => setShowWriteReview(true)}
          />
          
          <CountdownTimer />
          
          <ProductPricing
            oldPrice={product.oldPrice}
            newPrice={product.newPrice}
            getConvertedPrice={getConvertedPrice}
            parsePriceToNumber={parsePriceToNumber}
          />
          
          <SizeSelector
            sizes={sizes}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />
          
          <ColorSelector
            selected={selected}
            setSelected={setSelected}
          />
          
          <QuantitySelector
            count={count}
            setCount={setCount}
            onAddToCart={handleAddToCart}
            showPopup={showPopup}
          />
          
          <ProductActions onSizeGuide={() => setShowSizeGuide(true)} />
          <ProductInfo />
        </div>
      </section>

      <ProductTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        product={product}
        onWriteReview={() => setShowWriteReview(true)}
      />

      <RelatedProducts
        productss={productss}
        hovered={hovered}
        setHovered={setHovered}
      />

      <WriteReviewModal
        open={!!showWriteReview}
        onClose={() => setShowWriteReview(false)}
        product={{ id: product.id, img: product.img, name: product.name }}
      />
      <SizeGuideModal
        open={showSizeGuide}
        onClose={() => setShowSizeGuide(false)}
      />
      <CartModal
        open={showCart}
        onClose={() => setShowCart(false)}
        items={cartItems}
        onIncQty={(cartId: string) => cartStore.inc(cartId)}
        onDecQty={(cartId: string) => cartStore.dec(cartId)}
        onRemove={(cartId: string) => cartStore.remove(cartId)}
      />
    </>
  );
};

export default Page;
