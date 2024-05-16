import express from "express";
import multer from "multer";
import { login, logout, refresh, registerChannel, registerUser } from "../controllers/auth.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, callBack) {
    callBack(null, "src/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  },
});
const upload = multer({ storage: storage });
const cpUpload = upload.fields([
  { name: "profileImage", maxCount: 1 },
  { name: "coverImage", maxCount: 1 },
]);

router.route("/login").post(login);

router.route("/register").post(
  cpUpload,
  asyncHandler((req, res, next) => {
    const { role } = req.body;
    if (role === "USER") {
      registerUser(req, res, next);
    } else if (role === "NEWS_CHANNEL") {
      registerChannel(req, res, next);
    } else {
      res.status(400).json({ message: "please put valid role" });
    }
  }),
);
router.route("/refresh").post(refresh);
router.route("/logout").post(logout);

export default router;
