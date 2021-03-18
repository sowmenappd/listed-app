import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import jwt from "jwt-simple";

import connectToDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import collectionRoutes from "./routes/collectionRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";

import User from "./models/User.js";

const env_path = path.join(process.cwd(), `.env.${process.env.NODE_ENV}`);
console.log(env_path);

//dotenv config
dotenv.config({
  path: env_path,
});

//connect database
connectToDB();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Creating API for user
app.use("/api/users", userRoutes);
app.use("/api/todos", ensureAuthenticated, todoRoutes);
app.use("/api/collections", ensureAuthenticated, collectionRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

function ensureAuthenticated(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send({ error: "TokenMissing" });
  }
  var token = req.headers.authorization.split(" ")[1];
  var payload = null;

  try {
    payload = jwt.decode(token, process.env.CRYPTO_SECRET_KEY);
  } catch (err) {
    return res.status(401).send({ error: "TokenInvalid" });
  }

  User.findById(payload._id, (err, user) => {
    if (!user) {
      return res.status(401).send({ error: "UserNotFound" });
    } else {
      next();
    }
  });
}
