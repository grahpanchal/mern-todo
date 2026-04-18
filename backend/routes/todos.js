const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// GET all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create todo
router.post("/", async (req, res) => {
  try {
    const todo = new Todo({ title: req.body.title });
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT toggle complete
router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    todo.completed = !todo.completed;
    const updated = await todo.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE todo
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
