import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import connectDB from "./config/db.js";
dotenv.config();

connectDB();

const app = express();

// middlewares
app.use(express.json());

// Routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

// middleware to handle error
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log("Server running  on port 3000");
});
