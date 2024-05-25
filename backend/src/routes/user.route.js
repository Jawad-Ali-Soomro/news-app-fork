import express from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  changeCurrentUserPassword,
  changeUserAvatar,
  changeUserCoverImage,
  deleteAccount,
  getAllUsersList,
  getCurrentUser,
  getUserById,
  updateAccountDetails,
} from "../controllers/user.controller.js";

const router = express.Router();

router.use(authenticateUser);

router.route("/users-list").get(getAllUsersList);

router.route("/user/:id").get(getUserById);

router.route("/current-user").get(getCurrentUser);

router.route("/change-password").put(changeCurrentUserPassword);

router.route("/update-account-details").put(updateAccountDetails);

router.route("/change-avatar").patch(upload.single("avatar"), changeUserAvatar);

router.route("/change-coverImage").patch(upload.single("coverImage"), changeUserCoverImage);

router.route("/delete-account").delete(deleteAccount);

export default router;
