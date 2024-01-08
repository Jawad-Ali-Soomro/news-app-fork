// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAvmn5SdTKBWNQUnCYK65N1QmBZskirUpI",
  authDomain: "mern-8.firebaseapp.com",
  projectId:"mern-8",
  storageBucket: "mern-8.appspot.com",
  messagingSenderId:  "575027847766",
  appId: "1:575027847766:web:b866694d594a6b6f5e91f7",
  measurementId: "G-10WYZ54H2V",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();