import Todo from "../models/Todo.js";

export const getTodoByUserId = async (req, res) => {
  let todos = null;

  if (req.query.userId) {
    todos = await Todo.find({ userId: req.query.userId }).sort({
      createdAt: "desc",
    });
  }
  if (req.params.userId) {
    todos = await Todo.findById(req.params.id);
  }

  //if user id match param id send user else throw error
  if (todos) {
    res.status(200).json(todos);
  } else {
    res.status(404).json({ message: "No todo for that userId exists" });
  }
};

export const createTodo = async (req, res) => {
  try {
    let todoObj = req.body;
    let todo = new Todo(todoObj);
    todo.save();
    res.status(200).json(todo);
  } catch (ex) {
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
    return;
  }
};

export const updateTodo = async (req, res) => {
  try {
    let todo = req.body;
    await Todo.findByIdAndUpdate(todo._id, { ...todo });
    res.status(200).json(todo);
  } catch (ex) {
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
    return;
  }
};

export const deleteTodo = async (req, res) => {
  const _id = req.params.id;
  await Todo.findByIdAndDelete(_id);
  res.status(200).json({ _id });
};
