// src/pages/Signup.jsx
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Side */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold">
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text ">
              Shiva's
            </span >{" "}
            <span className="font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Blog

            </span>
          </h1>
          <p className="text-gray-600 mt-4">
            This is a demo project. You can sign up with your email and password or with Google.
          </p>
        </div>

        {/* Right Side */}
        <div className="bg-white shadow-lg rounded-2xl p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Your username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Your email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Your password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium shadow-md"
            >
              Sign Up
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 py-2 border rounded-lg shadow-sm hover:bg-gray-50"
            >
              <FcGoogle size={20} />
              Continue with Google
            </button>
          </form>

          <p className="mt-5 text-sm text-gray-600 text-center">
            Have an account?{" "}
            <a href="/signin" className="text-blue-600 hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
