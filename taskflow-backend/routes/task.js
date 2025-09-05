import express from "express";
import Task from "../models/Task.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Get tasks
router.get("/", protect, async (req, res) => {
  const tasks = await Task.find({ userId: req.user });
  res.json(tasks);
});

// Add task
router.post("/", protect, async (req, res) => {
  const task = await Task.create({ ...req.body, userId: req.user });
  res.json(task);
});

// Update task
router.put("/:id", protect, async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

// Delete task
router.delete("/:id", protect, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ msg: "Task deleted" });
});

export default router;
