const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');
require('dotenv').config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
