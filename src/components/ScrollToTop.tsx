"use client";
import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react"; // optional, nice icon

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  // Show button only after scrolling down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {visible && (
        <button
          onClick={scrollToTop}
          className="fixed z-50 cursor-pointer bottom-6 right-6 p-3 rounded-full bg-gray-800 text-white shadow-lg hover:bg-gray-900 transition duration-300"
        >
          <ChevronUp size={20} />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
