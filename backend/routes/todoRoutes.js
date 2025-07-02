const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Get all todos
router.get('/:userId', async (req, res) => {
    const todos = await Todo.find({ userId: req.params.userId });
    res.json(todos);
});

// Add todo
router.post('/', async (req, res) => {
    const { userId, text } = req.body;
    const todo = new Todo({ userId, text, completed: false });
    await todo.save();
    res.json(todo);
});

// Toggle complete
router.put('/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
});

// Delete todo
router.delete('/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

module.exports = router;
