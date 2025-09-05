import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/task.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`)
);
