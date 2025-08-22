import React, { useState, useEffect, useRef } from "react";
import { MdOutlineWifiCalling3 } from "react-icons/md";
import Link from "next/link";
import { CiUser } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { AiOutlineShopping } from "react-icons/ai";
import { languageOptions, currencyOptions } from "@/utils/constants/constant";
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
import Mobiledrawer from "../Mobiledrawer";
import Showmodal from "../modals/Showmodal";
import Showmodaleye from "../modals/Showmodaleye";
import Showforgotmodal from "../modals/Showforgotmodal";
import Showsearch from "../modals/Showsearch";
import CartModal from "@/components/modals/CartModal";
import { cartStore } from "@/utils/cartStore";
import { useCartItems } from "../hookes/useCartItems";
import NavbarDropdown from "./NavbarDropdown";
import Dropdown from "@/components/header/Dropdown";

const Header = () => {
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
  const [generatedCaptcha, setGeneratedCaptcha] = useState("");
  const router = useRouter();
  // Generate only on client
  useEffect(() => {
    setGeneratedCaptcha(generateCaptcha());
  }, []);

  function generateCaptcha() {
    return Math.random().toString(36).substring(2, 7).toUpperCase();
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
    setShowModaleye(false); // Close modal after login
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
      console.log(
        "Click detected, searchRef.current:",
        searchRef.current,
        "target:",
        target
      );
      if (searchRef.current && !searchRef.current.contains(target)) {
        console.log("Click outside detected, closing search");
        setShowSearch(false);
      }
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setShowSearch(false);
      }
    }

    if (showSearch) {
      // Add a small delay to ensure the modal is rendered
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

      {/* Top Bar - Hidden on Mobile */}

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
            Free shipping on all orders over $79
          </span>
          <Button
            size="sm"
            className="bg-[#ba933e] hover:bg-[#a47f32] text-white h-7 cursor-pointer"
          >
            Shop Now!
          </Button>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center text-sm gap-4">
            <Dropdown options={languageOptions} type="language" />
            <Dropdown options={currencyOptions} type="currency" />
          </div>

          <div className="flex items-center gap-5">
            <Link
              href="/"
              className="text-gray-600 hover:text-[#ba933e] transition-colors duration-300 cursor-pointer"
            >
              <FaFacebook size="18px" />
            </Link>
            <Link
              href="/"
              className="text-gray-600 hover:text-[#ba933e] transition-colors duration-300 cursor-pointer"
            >
              <FaInstagram size="18px" />
            </Link>
            <Link
              href="/"
              className="text-gray-600 hover:text-[#ba933e] transition-colors duration-300 cursor-pointer"
            >
              <FaTwitter size="18px" />
            </Link>
            <Link
              href="/"
              className="text-gray-600 hover:text-[#ba933e] transition-colors duration-300 cursor-pointer"
            >
              <FaBasketballBall size="18px" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Top Bar - Show only shipping message */}
      <div className="md:hidden gap-2 flex items-center justify-center bg-[#f5f5f5] h-10 px-4">
        <span className="text-sm text-gray-600 text-center">
          Free shipping on all orders over $79
        </span>
        <Button
          size="sm"
          className="bg-[#ba933e] hover:bg-[#a47f32] text-white h-7 cursor-pointer"
        >
          Shop Now!
        </Button>
      </div>

      <div className=" flex items-center justify-between gap-2   ">
        {/* Mobile Menu Button - First on Mobile */}
        <div className="md:hidden">
          <Mobiledrawer
            onSignIn={() => setShowModaleye(true)}
            onRegister={() => setShowModal(true)}
          />
        </div>

        {/* Search Button - Second on Mobile */}
        <div className="md:hidden ">
          <IoMdSearch
            className="size-6 cursor-pointer"
            onClick={() => setShowSearch(true)}
          />
        </div>

        {/* Logo - Centered on Mobile */}
        <Link
          href="/"
          className="flex  items-center justify-center flex-1 md:flex-none p-6"
        >
          <Image src="/logo.jpg" alt="Logo" width={120} height={40} priority />
        </Link>

        <div className="hidden md:flex  items-center ">
          <NavbarDropdown />
        </div>

        {/* Desktop Actions - Hidden on Mobile */}
        <div className="hidden md:flex items-center gap-4  justify-between font-medium p-6">
          <div className="flex items-center gap-2 ">
            <button
              onClick={() => setShowModaleye(true)}
              className="flex items-center gap-1 cursor-pointer hover:text-[#ba933e]"
            >
              {" "}
              <CiUser className="size-6" />
              SignIn{" "}
            </button>
            <span className=" flex items-center">/</span>
            <button
              onClick={() => setShowModal(true)}
              className="cursor-pointer hover:text-[#ba933e]"
            >
              Register
            </button>
          </div>

          <span className=" flex items-center">|</span>
          <div className="flex items-center gap-6">
            {/* Heart with Counter */}
            <div className="relative cursor-pointer">
              <FaRegHeart
                className="size-5 hover:text-[#ba933e]"
                onClick={() => router.push("/signup")}
              />
              <span
                className="
         absolute -top-3 -right-3
         text-xs
         font-medium
         rounded-full
         w-4 h-4
         flex items-center justify-center
       "
              >
                0
              </span>
            </div>

            <div
              className="relative cursor-pointer"
              onClick={() => setShowCart(true)}
            >
              <AiOutlineShopping className="size-6 hover:text-[#ba933e]" />
              <span
                className="
         absolute -top-2 -right-2
         text-xs
         font-medium
         rounded-full
                 w-4 h-4
         flex items-center justify-center
       "
              >
                {cartQty}
              </span>
            </div>

            <IoMdSearch
              className="size-6 cursor-pointer hover:text-[#ba933e]"
              onClick={() => setShowSearch(true)}
            />
          </div>
        </div>

        {/* Mobile Actions - Visible only on Mobile */}
        <div className="md:hidden flex items-center gap-4 ">
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
            onClick={() => setShowModaleye(true)}
          />
        </div>
      </div>

      <CartModal
        open={showCart}
        onClose={() => setShowCart(false)}
        items={useCartItems()}
        onIncQty={(cartId: string) => cartStore.inc(cartId)} // ✅ use cartId
        onDecQty={(cartId: string) => cartStore.dec(cartId)} // ✅ use cartId
        onRemove={(cartId: string) => cartStore.remove(cartId)} // ✅ use cartId
      />
    </>
  );
};

export default Header;
