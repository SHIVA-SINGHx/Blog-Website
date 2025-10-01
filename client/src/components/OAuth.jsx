import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const OAuth = () => {
  return (
    <div>
         <button 
            type="button"
            className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition"
          >
            <FcGoogle className="text-xl" />
            <span className="text-gray-700 font-medium">Continue with Google</span>
          </button>

          <p className="text-sm text-gray-600 mt-6 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-purple-600 hover:underline font-medium">
              Sign Up
            </Link>
          </p>
    </div>
  )
}

export default OAuth