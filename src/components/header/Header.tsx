"use client";
import React, { useState, useEffect, useRef } from "react";
import { MdOutlineWifiCalling3 } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { AiOutlineShopping } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaBasketballBall,
} from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import Image from "next/image";
import { useId } from "react";
import Mobiledrawer from "../Mobiledrawer";
import Showmodal from "../modals/Showmodal";
import Showmodaleye from "../modals/Showmodaleye";
import Showforgotmodal from "../modals/Showforgotmodal";
import Showsearch from "../modals/Showsearch";
import CartModal from "@/components/modals/CartModal";
import { cartStore } from "@/utils/cartStore";
import { useCartItems } from "../hookes/useCartItems";
import NavbarDropdown from "./NavbarDropdown";
import { useAppContext } from "@/components/context/AppContext";

const Header = () => {
  const id = useId();
  const [formData, setFormData] = useState({
    title: "Mr",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    captcha: "",
    agreeTerms: false,
    newsletter: false,
  });
  const [showModal, setShowModal] = useState(false);
  const [showModaleye, setShowModaleye] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [email, setEmail] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [showCart, setShowCart] = useState(false);
  const [cartQty, setCartQty] = useState(0);
  const router = useRouter();
const [generatedCaptcha, setGeneratedCaptcha] = useState<string>("");

  // ✅ Import language & currency from context
  const { language, setLanguage, currency, setCurrency } = useAppContext();

  type HeaderTexts = {
    freeShipping: string;
    shopNow: string;
    signIn: string;
    register: string;
  };
  // ✅ Translations
  const texts: Record<string, HeaderTexts> = {
    en: {
      freeShipping: "Free shipping on all orders over $79",
      shopNow: "Shop Now!",
      signIn: "Sign In",
      register: "Register",
    },
    es: {
      freeShipping: "Envío gratis en todos los pedidos superiores a $79",
      shopNow: "¡Compra ahora!",
      signIn: "Iniciar sesión",
      register: "Registrarse",
    },
    ar: {
      freeShipping: "شحن مجاني على جميع الطلبات التي تزيد عن 79 دولارًا",
      shopNow: "تسوق الآن!",
      signIn: "تسجيل الدخول",
      register: "إنشاء حساب",
    },
    pt: {
      freeShipping: "Frete grátis em todos os pedidos acima de $79",
      shopNow: "Compre agora!",
      signIn: "Entrar",
      register: "Registrar",
    },
    ru: {
      freeShipping: "Бесплатная доставка на все заказы свыше $79",
      shopNow: "Купить сейчас!",
      signIn: "Войти",
      register: "Регистрация",
    },
  };
  function generateCaptcha(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  // Client (browser) secure random
  if (typeof window !== "undefined" && window.crypto && window.crypto.getRandomValues) {
    const bytes = new Uint8Array(6);
    window.crypto.getRandomValues(bytes);
    let result = "";
    for (let i = 0; i < bytes.length; i++) {
      result += chars[bytes[i] % chars.length];
    }
    return result;
  }
   let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

useEffect(() => {
  setGeneratedCaptcha(generateCaptcha());
}, []);

function refreshCaptcha() {
  setGeneratedCaptcha(generateCaptcha());
}


  const handleSubmitForgot = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Password reset link sent to: ${email}`);
    setShowForgotModal(false);
  };

  const [formDatalogin, setFormDatalogin] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChangelogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormDatalogin({
      ...formDatalogin,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmitlogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Login Successful!");
    console.log(formDatalogin);
    setShowModaleye(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      e.target instanceof HTMLInputElement ? e.target.checked : false;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.captcha !== generatedCaptcha) {
      alert("Captcha does not match!");
      return;
    }
    if (!formData.agreeTerms) {
      alert("You must agree to the terms.");
      return;
    }
    alert("Account created successfully!");
    console.log(formData);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Element;
      if (searchRef.current && !searchRef.current.contains(target)) {
        setShowSearch(false);
      }
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setShowSearch(false);
      }
    }

    if (showSearch) {
      setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscapeKey);
      }, 100);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [showSearch]);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    const update = () => setCartQty(cartStore.getTotalQty());
    update();
    return cartStore.subscribe(update);
  }, []);

  return (
    <>
      <Showsearch
        ref={searchRef}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
      />

      <Showforgotmodal
        showForgotModal={showForgotModal}
        setShowForgotModal={setShowForgotModal}
        email={email}
        setEmail={setEmail}
        handleSubmitForgot={handleSubmitForgot}
        setShowModaleye={setShowModaleye}
      />

      <Showmodaleye
        showModaleye={showModaleye}
        setShowModaleye={setShowModaleye}
        formDatalogin={formDatalogin}
        setFormDatalogin={setFormDatalogin}
        handleChangelogin={handleChangelogin}
        handleSubmitlogin={handleSubmitlogin}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        setShowForgotModal={setShowForgotModal}
        setShowModal={setShowModal}
      />

      <Showmodal
        showModal={showModal}
        setShowModal={setShowModal}
        formData={formData}
        setFormData={setFormData}
        generatedCaptcha={generatedCaptcha}
        setGeneratedCaptcha={setGeneratedCaptcha}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        generateCaptcha={generateCaptcha}
        setShowModaleye={setShowModaleye}
      />

      {/* Top Bar */}
      <div className="hidden md:flex items-center justify-between bg-[#f5f5f5] h-8 p-6 gap-4 ">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <MdOutlineWifiCalling3 className="text-lg mt-1" />
            <span>+391(0)3525684593</span>
          </div>

          <span className="text-gray-400 flex items-center">|</span>

          <div className="flex items-center gap-2">
            <CiMail className="text-lg mt-1" />
            <span>demo@demo.com</span>
          </div>
        </div>

        <div className="flex items-center text-sm gap-2">
          <span className=" flex text-gray-600">
            {texts[language].freeShipping}
          </span>
          <Button
            size="sm"
            className="bg-[#ba933e] hover:bg-black text-white h-7 cursor-pointer"
            onClick={() => router.push("/")}
          >
            {texts[language].shopNow}
          </Button>
        </div>

        {/* ✅ Language & Currency */}
        <div className="flex items-center gap-8">
          <div className="flex items-center text-sm gap-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="p-1  rounded text-sm"
            >
              <option value="en">🇬🇧 English</option>
              <option value="es">🇪🇸 Spanish</option>
              <option value="ar">🇸🇦 Arabic</option>
              <option value="pt">🇵🇹 Portuguese</option>
              <option value="ru">🇷🇺 Russian</option>
            </select>

            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="p-1  rounded text-sm"
            >
              <option value="USD">$ USD</option>
              <option value="GBP">£ GBP</option>
              <option value="EUR">€ EUR</option>
              <option value="JPY">¥ JPY</option>
            </select>
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={() =>
                window.open(
                  "https://portfolio-main-lake-eta.vercel.app/",
                  "_blank"
                )
              }
              className="text-gray-600 hover:text-[#ba933e]"
            >
              <FaFacebook size="18px" />
            </button>
            <button
              onClick={() =>
                window.open(
                  "https://portfolio-main-lake-eta.vercel.app/",
                  "_blank"
                )
              }
              className="text-gray-600 hover:text-[#ba933e]"
            >
              <FaInstagram size="18px" />
            </button>
            <button
              onClick={() =>
                window.open(
                  "https://portfolio-main-lake-eta.vercel.app/",
                  "_blank"
                )
              }
              className="text-gray-600 hover:text-[#ba933e]"
            >
              <FaTwitter size="18px" />
            </button>
            <button
              onClick={() =>
                window.open(
                  "https://portfolio-main-lake-eta.vercel.app/",
                  "_blank"
                )
              }
              className="text-gray-600 hover:text-[#ba933e]"
            >
              <FaBasketballBall size="18px" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Top Bar */}
      <div className="md:hidden gap-2 flex items-center justify-center bg-[#f5f5f5] h-10  px-4">
        <span className="text-sm text-gray-600 text-center">
          {texts[language].freeShipping}
        </span>
        <Button
          size="sm"
          className="bg-[#ba933e] hover:bg-[#a47f32] text-white h-7 cursor-pointer"
        >
          {texts[language].shopNow}
        </Button>
      </div>

      <div className=" flex items-center justify-between gap-3  px-4 ">
        {/* Mobile Menu */}
        <div className="md:hidden">
          {isClient && (
            <Mobiledrawer
              onSignIn={() => setShowModaleye(true)}
              onRegister={() => setShowModal(true)}
            />
          )}
        </div>

        {/* Mobile Search */}
        <div className="md:hidden ">
          <IoMdSearch
            className="size-6 cursor-pointer"
            onClick={() => setShowSearch(true)}
          />
        </div>

        {/* Logo */}
        <div
          className="flex  items-center justify-center flex-1 md:flex-none p-6 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image src="/logo.jpg" alt="Logo" width={120} height={40} priority />
        </div>

        <div className="hidden md:flex  items-center ">
          <NavbarDropdown />
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4  justify-between font-medium p-6">
          <div className="flex items-center gap-2 ">
            <button
              onClick={() => setShowModaleye(true)}
              className="flex items-center gap-1 cursor-pointer hover:text-[#ba933e] transition"
            >
              <CiUser className="size-6" />
              {texts[language].signIn}
            </button>
            <span>/</span>
            <button
              onClick={() => setShowModal(true)}
              className="cursor-pointer hover:text-[#ba933e]"
            >
              {texts[language].register}
            </button>
          </div>

          <span>|</span>
          <div className="flex items-center gap-6">
            <div className="relative cursor-pointer ">
              <FaRegHeart
                className="size-5 hover:text-[#ba933e]"
                onClick={() => router.push("/signup")}
              />
              <span className="absolute -top-3 -right-3 text-xs font-medium rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </div>

            <div
              className="relative cursor-pointer"
              onClick={() => setShowCart(true)}
            >
              <AiOutlineShopping className="size-6 hover:text-[#ba933e]" />
              <span className="absolute -top-2 -right-2 text-xs font-medium rounded-full w-4 h-4 flex items-center justify-center">
                {cartQty}
              </span>
            </div>

            <IoMdSearch
              className="size-6 cursor-pointer hover:text-[#ba933e]"
              onClick={() => setShowSearch(true)}
            />
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="md:hidden flex items-center gap-3 ">
          <div
            className="relative cursor-pointer"
            onClick={() => setShowCart(true)}
          >
            <AiOutlineShopping className="size-6 cursor-pointer" />
            <span className="absolute -top-2 -right-2  text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {cartQty}
            </span>
          </div>
          <CiUser
            className="size-6 cursor-pointer"
            onClick={() => router.push("/login")}
          />
        </div>
      </div>

      <CartModal
        open={showCart}
        onClose={() => setShowCart(false)}
        items={useCartItems()}
        onIncQty={(cartId: string) => cartStore.inc(cartId)}
        onDecQty={(cartId: string) => cartStore.dec(cartId)}
        onRemove={(cartId: string) => cartStore.remove(cartId)}
      />
    </>
  );
};

export default Header;
