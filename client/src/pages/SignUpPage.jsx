import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { Spinner } from "@chakra-ui/react"

export default function SignUpPage() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, seterrorMessage] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  console.log(formData);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(!formData || !formData.email || formData.password){
      return seterrorMessage("please fill out all fileds");
    }
    try {
      setLoading(true)
      const res = await fetch('http://localhost:8080/auth/signup', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if(data.success === false){
        return (`invalid user ${data.message}`);
      }

      setLoading(false);
    } catch (error) {
      return error

    }
  }


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

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your username
              </label>
              <input
              
                id="username"
                onClick={handleChange}
                type="text"
                placeholder="username"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your email
              </label>
              <input
                onClick={handleChange}
                id="email"
                type="email"
                placeholder="name@company.com"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" >
                Your password
              </label>
              <input
                onClick={handleChange}
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <button
            disabled= {loading}
              type="submit"
              className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold"
            >
              {
                loading ? (
                 <Spinner size="sm" />
                ) : "SignUp"
              }
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <button className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition">
            <FcGoogle className="text-xl" />
            Continue with Google
          </button>

          <p className="text-sm text-gray-600 mt-6 text-center">
            Don’t have an account?{" "}
            <Link to="/signin" className="text-purple-600 hover:underline" >
           
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
