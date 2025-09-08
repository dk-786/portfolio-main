"use client";
import React from "react";
import Image from "next/image";
import { ABOUT_US, Blogmain1, TEAM_MEMBERS } from "@/utils/constants/constant";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

const Page = () => {
  return (
    <div>
      {/* -------- About Us Section -------- */}
      <section className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 px-6 md:px-16 py-20">
        {/* Left Content */}
        <div className="space-y-6">
          <p className="text-sm text-gray-500">{ABOUT_US.subtitle}</p>
          <h2 className="text-3xl md:text-4xl font-bold leading-snug">
            {ABOUT_US.title.split(" ").slice(0, 2).join(" ")} <br />
            {ABOUT_US.title.split(" ").slice(2).join(" ")}
          </h2>

          <p className="text-gray-600 leading-relaxed">
            {ABOUT_US.description1}
          </p>

          <blockquote className="border-l-4 border-yellow-500 pl-4 italic text-gray-700">
            {ABOUT_US.quote}
          </blockquote>

          <p className="text-gray-600 leading-relaxed">
            {ABOUT_US.description2}
          </p>

          {/* Signature */}
          <div>
            <Image
              src={ABOUT_US.signature}
              alt="Signature"
              width={150}
              height={60}
              className="mb-2"
            />
            <p className="font-semibold text-gray-900">
              {ABOUT_US.founder.name}{" "}
              <span className="font-normal text-gray-600">
                — {ABOUT_US.founder.role}
              </span>
            </p>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <Image
            src={ABOUT_US.image}
            alt="Company history image"
            width={500}
            height={600}
            className="object-cover"
          />
        </div>
      </section>

      {/* -------- Blog Section (First 3) -------- */}
      <section className="px-6 md:px-16 py-20 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Blogmain1.slice(0, 3).map((blog) => (
            <div
              key={blog.id}
              className="bg-white  shadow-sm overflow-hidden flex flex-col"
            >
              {/* Blog Image */}
              <Image
                src={blog.img}
                alt={blog.title}
                width={500}
                height={300}
                className="w-full h-56 object-cover"
              />

              {/* Blog Content */}
              <div className="p-5 flex flex-col flex-grow">
                <p className="text-sm text-gray-500">{blog.date}</p>
                <h3 className="text-lg font-semibold mt-2 mb-3">
                  {blog.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="py-10">
          <iframe
            src="https://www.youtube.com/embed/oXVCLfX9sl8?start=195"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-screen w-full"
          ></iframe>
        </div>
      </section>


      <section className="px-6 md:px-16 py-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Meet our team</h2>
          <p className="text-gray-600 mt-2">
            At vero eos et accusamus et iusto odio dignissimos ducimus.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="bg-white border border-gray-300 overflow-hidden text-center hover:shadow-xl transition-shadow duration-300"
            >
              {/* Team Image */}
              <Image
                src={member.img}
                alt={member.name}
                width={400}
                height={400}
                className="w-full h-72 object-cover"
              />

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold">{member.name}</h3>
                <p className="text-gray-500 text-sm">{member.role}</p>

                {/* Social Links */}
                <div className="flex justify-center space-x-4 mt-4 text-gray-600">
                  <a
                    href={member.socials.facebook}
                    className="hover:text-blue-600"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href={member.socials.twitter}
                    className="hover:text-sky-500"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href={member.socials.instagram}
                    className="hover:text-pink-500"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href={member.socials.github}
                    className="hover:text-gray-800"
                  >
                    <FaGithub />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Page;
