"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [email, setEmail] = useState("");
   const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password reset request for:", email);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-6">
      <h2 className="text-2xl font-semibold mb-2">Forgot your password?</h2>
      <div className="w-full max-w-md border-1  p-8">
        {/* Title */}

        <p className="text-sm text-gray-600 mb-6">
          Please enter the email address you used to register. You will receive
          a temporary link to reset your password.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium py-2">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border rounded-lg px-3 py-2 "
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black text-white rounded-lg py-2 font-medium hover:bg-gray-700 transition cursor-pointer"
          >
            Send Link
          </button>
        </form>

       
        <p className="text-sm text-center mt-6">
          Remembered your password?{" "}
          <button  className="text-blue-600 hover:underline cursor-pointer" onClick={() =>router.push('/login')}>
            Back to login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Page;
