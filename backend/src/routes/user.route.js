import express from "express";
// import { allUsers, userById } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/Authentication.middleware.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import {
  changeCurrentUserPassword,
  changeUserAvatar,
  changeUserCoverImage,
  deleteAccount,
  getAllUsersList,
  getUserById,
  updateAccountDetails,
} from "../controllers/user.controller.js";

const router = express.Router();

router.use(authenticateUser);

router.route("/users-list").get(getAllUsersList);

router.route("/user/:id").get(getUserById);

router.route("/change-password").get(changeCurrentUserPassword);

router.route("/update-account-details").get(updateAccountDetails);

router.route("/change-avatar").get(changeUserAvatar);

router.route("/change-coverImage").get(changeUserCoverImage);

router.route("/delete-account").get(deleteAccount);

export default router;
