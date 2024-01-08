import express from "express";
import { allUsers, userById } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/Authentication.middleware.js";

const router = express.Router();

//Get all users list
router.route("/all").get(isAuthenticated, allUsers);

//Get one specific user by Id
router.route("/one/:id").get(isAuthenticated, userById);

export default router;
