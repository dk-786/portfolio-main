"use client";
import React, { useState } from "react";

interface BlogCommentsProps {
  comments: string[];
  setComments: (comments: string[]) => void;
}

const BlogComments = ({ comments, setComments }: BlogCommentsProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    comment: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.comment.trim()) return;

    setComments([...comments, formData.comment]);
    setFormData({ fullName: "", email: "", comment: "" });
  };

  return (
    <>
      <div className="flex flex-col mt-6">
        <h1 className="md:text-xl font-bold text-black mb-4">Comments</h1>

        {comments.length === 0 ? (
          <div className="w-full bg-[#dff0d8] border-[#d0e9c6] text-[#3c763d] rounded p-3">
            No comment at this time!
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((c, idx) => (
              <div
                key={idx}
                className="w-full bg-gray-100 border border-gray-200 p-3"
              >
                <p className="text-gray-800">{c}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col mt-6">
        <h1 className="md:text-xl font-bold text-black mb-4">
          Leave your comment
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-full bg-white p-6 space-y-6"
        >
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#ba933e]"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#ba933e]"
              required
            />
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Comment
            </label>
            <textarea
              name="comment"
              placeholder="Enter your comment"
              rows={4}
              value={formData.comment}
              onChange={handleChange}
              className="w-full border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#ba933e]"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white font-medium py-2 px-4 hover:bg-[#a68233] transition"
          >
            Submit Comment
          </button>
        </form>
      </div>
    </>
  );
};

export default BlogComments;
