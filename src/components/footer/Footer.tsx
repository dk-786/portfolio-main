"use client";
import React from "react";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaDribbble, FaYoutube } from "react-icons/fa";
import { MdOutlineWifiCalling3, MdLocationOn } from "react-icons/md";
import { CiMail } from "react-icons/ci";
import { footerLinks, socialLinks } from "@/utils/constants/constant";

const iconComponents: { [key: string]: React.ComponentType } = {
  FaFacebookF: FaFacebookF,
  FaInstagram: FaInstagram,
  FaDribbble: FaDribbble,
  FaYoutube: FaYoutube,
};

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-gray-300">
      {/* Main Footer Content */}
      <div className="sm:p-12 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Company Info & Social */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h1 className="text-white text-2xl font-bold mb-4 sm:mt-0 mt-10">RUBIX</h1>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Discover the perfect blend of style and comfort with our curated collection of furniture and home decor.
              </p>
            </div>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = iconComponents[social.icon];
                return (
                  <a 
                    key={index} 
                    href={social.url} 
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-[#ba933e] transition-all duration-300"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Customer Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Customer Services</h3>
            <ul className="space-y-3">
              {footerLinks.customerServices.map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* More From Rubix */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">More From Rubix</h3>
            <ul className="space-y-3">
              {footerLinks.moreFromRubix.map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Let&apos;s Talk</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MdOutlineWifiCalling3 className="text-gray-400 text-lg" />
                <p className="text-gray-400 text-sm">+000 (0)12 3456 7899</p>
              </div>
              <div className="flex items-center space-x-3">
                <CiMail className="text-gray-400 text-lg" />
                <a 
                  href="mailto:demo@demo.com" 
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm underline"
                >
                  demo@demo.com
                </a>
              </div>
            </div>

            <h3 className="text-white font-semibold text-lg mb-6 mt-8">Find Us</h3>
            <div className="flex items-start space-x-3">
              <MdLocationOn className="text-gray-400 text-lg mt-1" />
              <p className="text-gray-400 text-sm leading-relaxed">
                502 New Design Str,<br />
                Melbourne, Australia
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 sm:p-4  p-2">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            {/* Copyright */}
            <div className="text-center sm:text-left ">
              <p className="text-white text-sm sm:ml-5 ">
                © 2024 Rubix. All Rights Reserved
              </p>
            </div>

            <div className="flex items-center space-x-3">
             
              <div className="flex space-x-3 ">
                <Image 
                  src="/images/payment.png" 
                  alt="Payment Methods" 
                  width={400} 
                  height={200} 
                  className="object-contain "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;