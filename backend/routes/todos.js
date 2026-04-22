// const express = require("express");
// const router = express.Router();
// const Todo = require("../models/Todo");
// const protect = require("../middleware/auth"); // ← naya

// // Ab saare routes protected hain
// router.get("/", protect, async (req, res) => {
//   try {
//     const todos = await Todo.find({ userId: req.userId }) // ← sirf us user ke todos
//       .sort({ createdAt: -1 });
//     res.json(todos);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// router.post("/", protect, async (req, res) => {
//   try {
//     const todo = new Todo({
//       title: req.body.title,
//       userId: req.userId, // ← user se link
//     });
//     const savedTodo = await todo.save();
//     res.status(201).json(savedTodo);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// router.put("/:id", protect, async (req, res) => {
//   try {
//     const todo = await Todo.findOne({ _id: req.params.id, userId: req.userId });
//     if (!todo) return res.status(404).json({ message: "Todo not found!" });
//     todo.completed = !todo.completed;
//     const updated = await todo.save();
//     res.json(updated);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// router.delete("/:id", protect, async (req, res) => {
//   try {
//     await Todo.findOneAndDelete({ _id: req.params.id, userId: req.userId });
//     res.json({ message: "Todo deleted!" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const protect = require("../middleware/auth");

// GET all todos
router.get("/", protect, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.userId }).sort({
      createdAt: -1,
    });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create todo
router.post("/", protect, async (req, res) => {
  try {
    const todo = new Todo({
      title: req.body.title,
      userId: req.userId,
    });
    const savedTodo = await todo.save();

    // Socket event emit karo
    const io = req.app.get("io");
    io.to(req.userId.toString()).emit("todo:added", savedTodo);

    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT toggle complete
router.put("/:id", protect, async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!todo) return res.status(404).json({ message: "Todo not found!" });

    todo.completed = !todo.completed;
    const updated = await todo.save();

    // Socket event emit karo
   const io = req.app.get("io");
   io.to(req.userId.toString()).emit("todo:updated", updated);

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT edit title
router.put("/:id/edit", protect, async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!todo) return res.status(404).json({ message: "Todo not found!" });

    todo.title = req.body.title;
    const updated = await todo.save();

    const io = req.app.get("io");
    io.to(req.userId.toString()).emit("todo:updated", updated);

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE todo
router.delete("/:id", protect, async (req, res) => {
  try {
    await Todo.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    // Socket event emit karo
     const io = req.app.get("io");
     io.to(req.userId.toString()).emit("todo:deleted", {
       id: req.params.id,
     });

    res.json({ message: "Todo deleted!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
