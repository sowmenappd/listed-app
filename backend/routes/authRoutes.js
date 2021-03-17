import { login, signUp } from "../controllers/authController.js";
import express from "express";
const router = express.Router();

// express router method to create route for getting all users
router.route("/").post(login);
router.route("/signup").post(signUp);

export default router;
