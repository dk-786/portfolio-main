"use client";
import React from "react";

interface ShowmodalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  formData: {
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    captcha: string;
    agreeTerms: boolean;
    newsletter: boolean;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      captcha: string;
      agreeTerms: boolean;
      newsletter: boolean;
    }>
  > | ((formData: {
      title: string;
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      confirmPassword: string;
      captcha: string;
      agreeTerms: boolean;
      newsletter: boolean;
    }) => void);
  generatedCaptcha: string;
  setGeneratedCaptcha: (captcha: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  generateCaptcha: () => string;
  setShowModaleye: (show: boolean) => void;
}

const Showmodal: React.FC<ShowmodalProps> = ({
  showModal,
  setShowModal,
  formData,
  setFormData,
  generatedCaptcha,
  setGeneratedCaptcha,
  handleSubmit,
  handleChange,
  generateCaptcha,
  setShowModaleye,
}) => {
  if (!showModal) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
      onClick={() => setShowModal(false)}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-2 right-4 text-gray-600 hover:text-black text-xl cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center mb-4">
          Create an Account
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block mb-1 font-medium ">Title</label>
            <select
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 cursor-pointer"
            >
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
            </select>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
              required
            />
          </div>

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            required
          />

          {/* Captcha */}
          <div className="flex items-center gap-3">
            <span className="bg-gray-200 px-4 py-2 font-bold rounded">
              {generatedCaptcha || "....."}
            </span>
            <button
              type="button"
              className="text-blue-500 underline text-sm cursor-pointer"
              onClick={() => setGeneratedCaptcha(generateCaptcha())}
            >
              Refresh
            </button>
          </div>
          <input
            type="text"
            name="captcha"
            placeholder="Enter Captcha"
            value={formData.captcha}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            required
          />

          {/* Terms */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="mr-2 cursor-pointer"
            />
            <label>
              I agree to the{" "}
              <a href="#" className="text-blue-500 underline">
                terms
              </a>
              . *
            </label>
          </div>

          {/* Newsletter */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleChange}
              className="mr-2 cursor-pointer"
            />
            <label>Sign up for our newsletter</label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-black/80 transition-colors cursor-pointer"
          >
            Create an Account
          </button>
        </form>

        {/* Footer Links */}
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a
            href="#"
            className="text-blue-500 underline"
            onClick={(e) => {
              e.preventDefault();
              setShowModal(false);
              setShowModaleye(true);
            }}
          >
            Log in instead
          </a>
        </p>
      </div>
    </div>
  );
};

export default Showmodal;
