import Todo from "../models/Todo.js";

export const getTodoByUserId = async (req, res) => {
  let todos = null;

  if (req.query.userId) {
    todos = await Todo.find({ userId: req.query.userId });
  }
  if (req.params.id) {
    todos = await Todo.findById(req.params.id);
  }

  //if user id match param id send user else throw error
  if (todos) {
    res.status(200).json(todos);
  } else {
    res.status(404).json({ message: "No todo for that userId exists" });
  }
};
