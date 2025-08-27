"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [form, setForm] = useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthdate: "",
    offers: false,
    terms: false,
    newsletter: false,
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", form);
  };

  return (
    <div className="flex flex-col gap-2 w-full items-center justify-center min-h-screen p-4 sm:p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Create an account</h2>

      {/* ✅ Responsive container */}
      <div className="w-full max-w-[800px] border p-6 sm:p-8   bg-white">
        <p className="text-sm mb-6 text-center sm:text-left">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:underline"
            onClick={() => router.push("/login")}
          >
            Log in instead!
          </a>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Social Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Social title</label>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="title"
                  value="Mr."
                  checked={form.title === "Mr."}
                  onChange={handleChange}
                  className="text-blue-600"
                />
                Mr.
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="title"
                  value="Mrs."
                  checked={form.title === "Mrs."}
                  onChange={handleChange}
                  className="text-blue-600"
                />
                Mrs.
              </label>
            </div>
          </div>

          {/* First Name */}
          <div>
            <label className="block text-sm font-medium py-2">First name</label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="John"
              className="w-full border px-3 py-2 rounded"
              pattern="[A-Za-z. ]+"
              required
            />
            <p className="text-xs text-gray-500">
              Only letters and dot (.) followed by a space are allowed.
            </p>
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium py-2">Last name</label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Doe"
              className="w-full border px-3 py-2 rounded"
              pattern="[A-Za-z. ]+"
              required
            />
            <p className="text-xs text-gray-500">
              Only letters and dot (.) followed by a space are allowed.
            </p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium py-2">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium py-2">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          {/* Birthdate */}
          <div>
            <label className="block text-sm font-medium py-2">Birthdate</label>
            <input
              type="date"
              name="birthdate"
              value={form.birthdate}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            <p className="text-xs text-gray-500">E.g.: 05/31/1970</p>
          </div>

          {/* Checkboxes */}
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="offers"
                checked={form.offers}
                onChange={handleChange}
                className="text-blue-600 cursor-pointer"
              />
              Receive offers from our partners
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="terms"
                checked={form.terms}
                onChange={handleChange}
                className="text-blue-600 cursor-pointer"
                required
              />
              I agree to the terms and conditions and the privacy policy
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="newsletter"
                checked={form.newsletter}
                onChange={handleChange}
                className="text-blue-600 cursor-pointer"
              />
              Sign up for our newsletter
            </label>
            <p className="text-xs text-gray-500">
              You may unsubscribe at any moment. For that purpose, please find
              our contact info in the legal notice.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black text-white rounded-lg py-2 font-medium hover:bg-gray-700 transition cursor-pointer"
          >
            Create Account
          </button>
        </form>

        {/* Privacy Notice */}
        <div className="mt-6 text-xs text-gray-500">
          <h4 className="font-semibold mb-1">Customer data privacy</h4>
          <p>
            The personal data you provide is used to answer queries, process
            orders or allow access to specific information. You have the right
            to modify and delete all the personal information found in the
            &quot;My Account&quot; page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
