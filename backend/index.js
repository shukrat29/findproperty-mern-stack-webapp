import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import connectDB from "./config/db.js";
dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Frontend origin
    credentials: true, // Include credentials if you are using cookies or sessions
  })
);

// middlewares
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

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
