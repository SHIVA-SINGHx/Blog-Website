import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { app } from '../firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const OAuth = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      setLoading(true);
      setErrorMessage(null);

      const resultFromGoogle = await signInWithPopup(auth, provider);
      console.log("Google User:", resultFromGoogle.user);

      const res = await fetch("http://localhost:8080/auth/google", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          googlePhotoUrl: resultFromGoogle.user.photoURL,
        }),
      });

      const data = await res.json();
      console.log("Backend Response:", data);

      if (data.success === false || !res.ok) {
        setLoading(false);
        return setErrorMessage(data.message || "Google sign in failed");
      }

      setLoading(false);
      
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      navigate("/");
      
    } catch (error) {
      console.error("Google Sign In Error:", error);
      setErrorMessage(error.message || "Failed to sign in with Google");
      setLoading(false);
    }
  };

  return (
    <div>
      <button 
        type="button"
        onClick={handleGoogleClick}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FcGoogle className="text-xl" />
        <span className="text-gray-700 font-medium">
          {loading ? "Loading..." : "Continue with Google"}
        </span>
      </button>

      {errorMessage && (
        <div className="mt-4 p-3 bg-red-50 border border-red-300 rounded-lg">
          <p className="text-red-700 text-sm font-medium">{errorMessage}</p>
        </div>
      )}

      <p className="text-sm text-gray-600 mt-6 text-center">
        Don't have an account?{" "}
        <Link to="/signup" className="text-purple-600 hover:underline font-medium">
          Sign Up
        </Link>
        
      </p>
    </div>
  );
};

export default OAuth;