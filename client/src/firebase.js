// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-app-b7958.firebaseapp.com",
  projectId: "blog-app-b7958",
  storageBucket: "blog-app-b7958.firebasestorage.app",
  messagingSenderId: "796019422203",
  appId: "1:796019422203:web:60b8771ae8de42c7c8515e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);