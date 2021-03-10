import express from "express";
import dotenv from "dotenv";

import connectToDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";

//connect database
connectToDB();

//dotenv config
dotenv.config({
  path: path.join(__dirname, `../.env.${process.env.NODE_ENV})}`),
});

const app = express();

//Creating API for user
app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
