import mongoose from "mongoose";

const todoSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
    },
    tasks: {
      type: [new mongoose.Schema({ name: String, completed: Boolean })],
      required: true,
      unique: false,
    },
    collectionId: {
      type: String,
      required: false,
      unique: false,
    },
    userId: {
      type: String,
      required: true,
      unique: false,
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
