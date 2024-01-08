import api from "../config/apiConfig";
import { asyncHandler } from "../utils/asyncHandler";
import {  signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./auth/firbase.js";
export const registerUser = async (userData) => {
  const response = await asyncHandler(async () => {
    return await api.post("/api/v1/auth/register", userData);
  });
  return response;
};

export const loginUser = async (userData) => {
  const response = await asyncHandler(async () => {
    return await api.post("/api/v1/auth/login", userData);
  });
  return response;
};

//when page refresh user automatic login
export const refreshAutoLogin = async () => {
  const response = await asyncHandler(async () => {
    return await api.post("/api/v1/auth/refresh");
  });
  return response;
};

export const logoutUser = async () => {
  const response = await asyncHandler(async () => {
    return await api.post("/api/v1/auth/logout");
  });
  return response;
};

export const loginWithGoogle=()=>{
  const googleProvider = new GoogleAuthProvider();
  signInWithPopup(auth, googleProvider)
  .then(async (result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    console.log(credential);
   
  })
  .catch((error) => {
   console.log(error)
  });
}