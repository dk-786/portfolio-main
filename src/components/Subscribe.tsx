"use client"
import React from 'react'

const Subscribe = () => {
  return (
    <section
      className="relative flex items-center justify-center w-full h-[400px] md:h-[580px] bg-cover bg-center bg-no-repeat md:bg-fixed "
      style={{ 
        backgroundImage: "url('/images/background.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >

      <div className="absolute inset-0 bg-white opacity-5"></div>


      <div className="relative z-10 bg-white/90 px-6 md:px-10 py-8 md:py-25 shadow-lg text-center w-full max-w-sm md:max-w-4xl mx-auto mx-4 md:mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Subscribe To Our Newsletter</h2>
        <p className="text-gray-800 mb-6 text-sm md:text-base px-2">
          Sign up for the weekly newsletter and build better ecommerce stores.
        </p>


        <div className="flex flex-col md:flex-row w-full max-w-lg mx-auto gap-3 md:gap-4">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none text-sm md:text-base"
          />
          <button className="bg-black text-white px-6 md:px-8 py-3 rounded-md hover:bg-[#a67c00] text-sm md:text-base whitespace-nowrap">
            Subscribe
          </button>
        </div>

        <p className="text-gray-800 mt-4 text-xs md:text-sm px-2">
          We respect your privacy, so we never share your info.
        </p>
      </div>
    </section>
  )
}

export default Subscribe
