// Import the functions you need from the SDKs you need
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "shopnest-a5348.firebaseapp.com",
  projectId: "shopnest-a5348",
  storageBucket: "shopnest-a5348.firebasestorage.app",
  messagingSenderId: "543845140459",
  appId: "1:543845140459:web:40a60f284c57ddc34f3bae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider =new  GoogleAuthProvider();
export { app, auth, provider };