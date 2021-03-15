import Todo from "../models/Todo.js";

export const getTodoByUserId = async (req, res) => {
  let todos = null;

  if (req.query.collectionId) {
    todos = await Todo.find({ collectionId: req.query.collectionId }).sort({
      createdAt: "desc",
    });
  } else if (req.query.userId) {
    todos = await Todo.find({ userId: req.query.userId }).sort({
      createdAt: "desc",
    });
  } else if (req.params.userId) {
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
    await todo.save();
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

    const modTodo = await Todo.findByIdAndUpdate(todo._id, todo, { new: true });
    res.status(200).json(modTodo);
  } catch (ex) {
    console.log(ex);
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

export const createUserCollection = async (req, res) => {
  const { collectionName } = req.body;
};

export const getUserCollectionsById = async (req, res) => {
  const userId = req.params.userId;

  let todos = [];
  if (req.params.userId) {
    todos = await Todo.find({ userId });
  }

  let collections = [];
  for (let i = 0; i < todos.length; i++) {
    let { collectionId } = todos[i];
    if (collectionId == "") {
      collectionId = "default";
    }
    if (collections.findIndex((c) => c.collectionId === collectionId) === -1) {
      collections.push({ collectionId });
    }
  }
  console.log(collections);
  res.status(200).json(collections);
};
