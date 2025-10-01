import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import OAuth from "../components/Oauth";

export default function SignInPage() {

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });

    
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields");
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      
      const res = await fetch("http://localhost:8080/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false || !res.ok) {
        setLoading(false);
        return setErrorMessage(data.message || "Something went wrong");
      }

      setLoading(false);
      navigate("/"); 
      
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Failed to connect to server");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-4xl flex shadow-lg rounded-2xl overflow-hidden bg-white">
        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 p-10">
          <h1 className="text-4xl font-bold">
            <span className="text-purple-600">Shiva's</span>{" "}
            <span className="text-gray-800">Blog</span>
          </h1>
          <p className="text-gray-500 mt-4 text-center">
            This is a demo project. You can sign in with your email and password
            or with Google.
          </p>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold mb-6">Sign In</h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your email
              </label>
              <input
                id="email"
                type="email"
                onChange={handleChange}
                placeholder="name@company.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your password
              </label>
              <input
                id="password"
                type="password"
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={loading}
              />
            </div>


            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-300 rounded-lg">
                <p className="text-red-700 text-sm font-medium">{errorMessage}</p>
              </div>
            )}

            <button
              disabled={loading}
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Spinner size="sm" />
                  <span>Loading...</span>
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <OAuth/>
       
        </div>
      </div>
    </div>
  );
}