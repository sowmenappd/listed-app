import {
  createTodo,
  deleteTodo,
  getTodoByUserId,
  updateTodo,
} from "../controllers/todoController.js";
import express from "express";
const router = express.Router();

// express router method to create route for getting users by id
router.route("/").get(getTodoByUserId);
router.route("/").post(createTodo);
router.route("/").put(updateTodo);
router.route("/:id").delete(deleteTodo);

router.route("/:userId").get(getTodoByUserId);

export default router;
