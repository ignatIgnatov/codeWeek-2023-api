import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import blogsRoute from "./src/routes/blog.routes.js";

import usersRoute from "./src/routes/user.routes.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/api", blogsRoute);
app.use("/api", usersRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
  });
});

app.listen(8080, () => {
  console.log("Server is running");
  connect();
});

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
