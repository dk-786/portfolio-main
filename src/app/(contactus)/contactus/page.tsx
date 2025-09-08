"use client";
import React, { useState } from "react";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    subject: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Type the event as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Type the event as React.FormEvent<HTMLFormElement>
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");

    setTimeout(() => {
      setLoading(false);
      setSuccessMessage("Your message has been sent successfully!");
      setFormData({
        subject: "",
        email: "",
        message: "",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="bg-white flex flex-col md:flex-row w-full overflow-hidden">
        {/* Left Column (Store Info) */}
        <div className="w-full md:w-1/3 p-8 flex flex-col justify-start space-y-8 border-r">
          <h2 className="text-xl font-semibold text-gray-800">Store information</h2>
          <div className="space-y-4 text-gray-600">
            <div className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500 mr-3 mt-1"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <div>
                <p className="font-medium text-gray-700">Vt Interior Elements</p>
                <p>United States</p>
              </div>
            </div>
            <div className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500 mr-3 mt-1"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              <div>
                <p className="font-medium text-gray-700">Email us:</p>
                <p>demo@demo.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Contact Form) */}
        <div className="w-full md:w-2/3 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">CONTACT US</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Subject */}
            <div className="relative">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out py-2 px-3 appearance-none"
                required
              >
                <option value="" disabled>
                  Choose subject
                </option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Product Support">Product Support</option>
                <option value="Billing Question">Billing Question</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@email.com"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out py-2 px-3"
                required
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help?"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out py-2 px-3"
                required
              ></textarea>
            </div>

            {/* Success Message */}
            {successMessage && <div className="text-green-600 text-sm">{successMessage}</div>}

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-150 ease-in-out"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
