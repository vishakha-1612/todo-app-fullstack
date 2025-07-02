const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username, password });
        await user.save();
        res.json({ message: "User registered!" });
    } catch (err) {
        res.status(400).json({ error: "Username already exists" });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) res.json({ userId: user._id });
    else res.status(401).json({ error: "Invalid credentials" });
});

module.exports = router;
