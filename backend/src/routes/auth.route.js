import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  userAutoLoginWithRefreshToken,
  verifyAccount,
} from "../controllers/auth.controller.js";

const router = express.Router();

const uplaodImages = [
  { name: "profileImage", maxCount: 1 },
  { name: "coverImage", maxCount: 1 },
];

router.route("/register").post(upload.fields(uplaodImages), registerUser);

router.route("/login").post(loginUser);

router.route("/logout").post(logoutUser);

router.route("/refresh-token").post(userAutoLoginWithRefreshToken);

router.route("/verify-account").post(verifyAccount);

export default router;
