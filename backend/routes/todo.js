const express = require("express");
const Todo = require("../models/Todo");
const auth = require("../middleware/authMiddleware");

const router = express.Router(); // ✅ fixed

// CREATE todo
router.post("/", auth, async (req, res) => {
  const { text, title } = req.body;
  try {
    const newTodo = new Todo({
      user: req.user,
      text,
      title, // ✅ saving title too
    });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ all todos
router.get("/", auth, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE todo
router.put("/:id", auth, async (req, res) => {
  const { text, completed } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { text, completed },
      { new: true }
    );
    res.json(updatedTodo); // ✅ fixed
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE todo
router.delete("/:id", auth, async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ msg: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
