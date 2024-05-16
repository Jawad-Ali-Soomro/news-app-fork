import express from "express";
import { addToCollection, fetchUserCollection, removeToCollection } from "../controllers/collection.controller.js";
import { isAuthenticated } from "../middlewares/Authentication.middleware.js";
const router = express.Router();

//fetch user collection which contains all user saved articles
router.route("/collection/:userId").get(isAuthenticated, fetchUserCollection);

//add article from user collection
router.route("/collection/add/:id").post(isAuthenticated, addToCollection);

//remove article from user collection
router.route("/collection/remove/:id").delete(isAuthenticated, removeToCollection);

export default router;
