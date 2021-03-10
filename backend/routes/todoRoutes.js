import { getTodoByUserId } from "../controllers/todoController.js";
import express from "express";
const router = express.Router();

// express router method to create route for getting users by id
router.route("/").get(getTodoByUserId);
router.route("/:id").get(getTodoByUserId);

export default router;
