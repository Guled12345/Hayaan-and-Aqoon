// Define "require"
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { createRequire } from "module";
import ErrorMiddleware from "./middlewares/Error.js";
const require = createRequire(import.meta.url);

//Accessing .env variable using Dotenv
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./config/config.env",
  });
}

const app = express();

// Using Middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

import course from "./routes/courseRoutes.js";
import user from "./routes/userRoutes.js";

import other from "./routes/otherRoutes.js";

app.use("/api/v1", course);
app.use("/api/v1", user);

app.use("/api/v1", other);

const path = require("path");
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../e-learning/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../e-learning/build/index.html"));
});

app.use(ErrorMiddleware);

export default app;
