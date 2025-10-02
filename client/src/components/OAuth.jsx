import React, {  } from 'react'
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { app } from '../firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {  signInSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';




const OAuth = () => {
const navigate = useNavigate();
const dispatch = useDispatch()
  const auth = getAuth(app);
//  const [errorMessage, setErrorMessage] = useState(null);
  const hanndleGoogleClick = async()=>{

  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({prompt: "select_account"})

  try {

    const resultFromGoogle = await signInWithPopup(auth, provider)

    const res = await fetch("auth/google", {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: resultFromGoogle.user.displayName,
        email: resultFromGoogle.user.email,
        googlePhoto: resultFromGoogle.user.photoURL,
      }),
    })

    const data = await res.json()

    if(res.ok){
    dispatch(signInSuccess(data))
    navigate("/")
    }

  } catch (error) {
    console.log(error);
    
  }

  }

  return (
    <div>
      <form onClick={hanndleGoogleClick}>

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
            </form>
    </div>
  )
}

export default OAuth