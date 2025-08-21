"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login data:", form);
  };

  return (
    <div className="flex flex-col items-center justify-center  min-h-screen p-6">
      <h2 className="text-2xl font-semibold mb-4">Log in to your account</h2>
      <div className="w-full max-w-md border-1 p-8">
        {/* Title */}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium py-2">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full border rounded-lg px-3 py-2 "
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
              className="w-full border rounded-lg px-3 py-2 "
              required
            />
          </div>

          {/* Forgot Password */}
          <div className="flex justify-between items-center text-sm">
            <button
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() =>router.push('/forgetpassword')}
            >
              Forgot your password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black text-white rounded-lg py-2 font-medium hover:bg-gray-700 transition cursor-pointer"
          >
            Log In
          </button>
        </form>

        {/* Footer Links */}
        <p className="text-sm text-center mt-6">
          No account?{" "}
          <button
           
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => router.push("/signup")}
          >
            Create one here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Page;
