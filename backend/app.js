const express = require("express");
const cors = require("cors");
require("dotenv").config();

const todoRoutes = require("./routes/todos");
const authRoutes = require("./routes/auth");

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://mern-todo-frontend-drab.vercel.app",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));
app.use(express.json());

// Mock io — tests mein real socket nahi hoga
app.set("io", {
  to: () => ({ emit: () => {} }),
  emit: () => {},
});

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => {
  res.json({ message: "🚀 MERN Todo API is running!" });
});

module.exports = app;
