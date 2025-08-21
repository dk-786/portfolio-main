"use client";
import React from 'react';

interface ShowforgotmodalProps {
  showForgotModal: boolean;
  setShowForgotModal: (show: boolean) => void;
  email: string;
  setEmail: (email: string) => void;
  handleSubmitForgot: (e: React.FormEvent<HTMLFormElement>) => void;
  setShowModaleye: (show: boolean) => void;
}

const Showforgotmodal: React.FC<ShowforgotmodalProps> = ({
  showForgotModal,
  setShowForgotModal,
  email,
  setEmail,
  handleSubmitForgot,
  setShowModaleye
}) => {
  if (!showForgotModal) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
      onClick={() => setShowForgotModal(false)}
    >
      <div
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setShowForgotModal(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl transition"
        >
          ✕
        </button>

        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Forgot Password?
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Enter your email address to receive a password reset link.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmitForgot} className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-600 font-medium">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-black/80 transition-colors"
          >
            Send Reset Link
          </button>
        </form>

        {/* Back to Login */}
        <p className="text-center text-gray-600 text-sm mt-5">
          Remembered your password?{" "}
          <a
            href="#"
            className="text-blue-600 font-semibold hover:underline"
            onClick={(e) => {
              e.preventDefault();
              setShowForgotModal(false);
              setShowModaleye(true);
            }}
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Showforgotmodal;
