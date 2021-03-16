import {
  createTodo,
  deleteTodo,
  getTodoByUserId,
  searchTodos,
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

router.route("/search").post(searchTodos);

export default router;
