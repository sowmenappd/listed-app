import {
  createTodo,
  createUserCollection,
  deleteTodo,
  getTodoByUserId,
  updateTodo,
  getUserCollectionsById,
} from "../controllers/todoController.js";
import express from "express";
const router = express.Router();

// express router method to create route for getting users by id
router.route("/").get(getTodoByUserId);
router.route("/").post(createTodo);
router.route("/").put(updateTodo);
router.route("/:id").delete(deleteTodo);

router.route("/:userId").get(getTodoByUserId);
router.route("/:userId/collections").get(getUserCollectionsById);
router.route("/:userId/collections").post(createUserCollection);

export default router;
