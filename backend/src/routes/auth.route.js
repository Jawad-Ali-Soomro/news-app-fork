import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  userAutoLoginWithRefreshToken,
  verifyAccount,
  forgotPassword,
  resetPassword,
  resendVerificationEmail,
} from "../controllers/auth.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

const uplaodImages = [
  { name: "profileImage", maxCount: 1 },
  { name: "coverImage", maxCount: 1 },
];

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").post(authenticateUser, logoutUser);

router.route("/refresh-token").post(authenticateUser, userAutoLoginWithRefreshToken);

router.route("/verify-account").post(verifyAccount);

router.route("/forgot-password").post(forgotPassword);

router.route("/reset-password").post(resetPassword);

router.route("/resend-verification-email").post(resendVerificationEmail);

export default router;
