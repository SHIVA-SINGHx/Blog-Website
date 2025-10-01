import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";

export default function SignInPage() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
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
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        return setErrorMessage(data.message);
      }

      setLoading(false);
      if (res.ok) {
        navigate("/home");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-4xl flex shadow-lg rounded-2xl overflow-hidden">
        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-white p-10">
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
        <div className="w-full md:w-1/2 bg-white p-8">
          <h2 className="text-2xl font-semibold mb-6">Sign In</h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your email
              </label>
              <input
                id="email"
                type="email"
                onChange={handleChange}
                placeholder="name@company.com"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your password
              </label>
              <input
                id="password"
                type="password"
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold"
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

          <button className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition">
            <FcGoogle className="text-xl " />
            <span className="text-black font-medium">Continue with Google</span>
          </button>

          <p className="text-sm text-gray-600 mt-6 text-center">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-purple-600 hover:underline">
              Sign Up
            </Link>
          </p>
          {errorMessage && (
            <Stack gap="4" width="full" className="mt-4">
              <Alert.Root status="error">
                <Alert.Indicator />
                <Alert.Title>{errorMessage}</Alert.Title>
              </Alert.Root>
            </Stack>
          )}
        </div>
      </div>
    </div>
  );
}
