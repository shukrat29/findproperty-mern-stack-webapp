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

app.listen(3000, () => {
  console.log("Server running  on port 3000");
});
