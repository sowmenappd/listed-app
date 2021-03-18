import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";

import connectToDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import collectionRoutes from "./routes/collectionRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";

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
app.use("/api/todos", todoRoutes);
app.use("/api/collections", collectionRoutes);
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
    payload = jwt.decode(token, config.TOKEN_SECRET);
  } catch (err) {
    return res.status(401).send({ error: "TokenInvalid" });
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ error: "TokenExpired" });
  }
  // check if the user exists
  Person.findById(payload.sub, function (err, person) {
    if (!person) {
      return res.status(401).send({ error: "PersonNotFound" });
    } else {
      req.user = payload.sub;
      next();
    }
  });
}
