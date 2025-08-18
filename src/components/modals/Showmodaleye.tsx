import React from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface ShowmodaleyeProps {
  showModaleye: boolean;
  setShowModaleye: (show: boolean) => void;
  formDatalogin: {
    email: string;
    password: string;
    remember: boolean;
  };
  setFormDatalogin: React.Dispatch<React.SetStateAction<{
    email: string;
    password: string;
    remember: boolean;
  }>>;
  handleChangelogin: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmitlogin: (e: React.FormEvent<HTMLFormElement>) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  setShowForgotModal: (show: boolean) => void;
  setShowModal: (show: boolean) => void;
}

const Showmodaleye: React.FC<ShowmodaleyeProps> = ({
  showModaleye,
  setShowModaleye,
  formDatalogin,
  setFormDatalogin,
  handleChangelogin,
  handleSubmitlogin,
  showPassword,
  setShowPassword,
  setShowForgotModal,
  setShowModal
}) => {
  if (!showModaleye) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
      onClick={() => setShowModaleye(false)}
    >
      <div
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setShowModaleye(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl transition"
        >
          ✕
        </button>

        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Login to your account
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmitlogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block mb-1 text-gray-600 font-medium">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formDatalogin.email}
              onChange={handleChangelogin}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password with toggle */}
          <div>
            <label className="block mb-1 text-gray-600 font-medium">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formDatalogin.password}
                onChange={handleChangelogin}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input
                type="checkbox"
                name="remember"
                checked={formDatalogin.remember}
                onChange={handleChangelogin}
                className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              />
              Remember Me
            </label>
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 font-medium"
              onClick={(e) => {
                e.preventDefault();
                setShowModaleye(false);
                setShowForgotModal(true);
              }}
            >
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-black/80 transition-colors"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-600 text-sm mt-5">
          No account?{" "}
          <a
            href="#"
            className="text-blue-600 font-semibold hover:underline"
            onClick={() => {
              setShowModaleye(false);
              setShowModal(true);
            }}
          >
            Create one here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Showmodaleye;
