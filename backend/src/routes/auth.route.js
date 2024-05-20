import express from "express";
import { login, loginUser, logout, logoutUser, refresh, registerChannel, registerUser, userAutoLoginWithRefreshToken } from "../controllers/auth.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

// define config for uplaod files on user registration
const uplaodImages = [
  { name: "profileImage", maxCount: 1 },
  { name: "coverImage", maxCount: 1 },
];

router.route("/login").post(loginUser);

router.route("/register").post(upload.fields(uplaodImages), registerUser);

router.route("/logout").post(logoutUser);

router.route("/refresh-token").post(userAutoLoginWithRefreshToken);

router.route("/verify-account").post(refresh);

export default router;
