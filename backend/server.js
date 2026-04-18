const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const todoRoutes = require("./routes/todos");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/todos", todoRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "🚀 MERN Todo API is running!" });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected!");
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });
