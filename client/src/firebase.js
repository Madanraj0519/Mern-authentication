// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-ac89b.firebaseapp.com",
  projectId: "mern-auth-ac89b",
  storageBucket: "mern-auth-ac89b.appspot.com",
  messagingSenderId: "701136050324",
  appId: "1:701136050324:web:9d3b1711eef252056b7c81"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);