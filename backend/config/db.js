import mongoose from "mongoose";
import User from "../models/User.js";
import Todo from "../models/Todo.js";
import Collection from "../models/Collection.js";

const connectToDB = async () => {
  try {
    console.log("attempting to connect..");
    const databaseName = "todo-db";
    const con = await mongoose.connect(
      `mongodb://${process.env.DATABASE_HOST}:27017/${databaseName}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    );
    console.log(`Database connected : ${con.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectToDB;
