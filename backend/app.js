const express = require("express");
const cors = require("cors");
const Sentry = require("@sentry/node");
require("dotenv").config();

const todoRoutes = require("./routes/todos");
const authRoutes = require("./routes/auth");

// Sentry initialize — sabse pehle
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV || "development",
  tracesSampleRate: 1.0,
});

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

// Mock io for tests
app.set("io", {
  to: () => ({ emit: () => {} }),
  emit: () => {},
});

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => {
  res.json({ message: "🚀 MERN Todo API is running!" });
});

// Global error handler — Sentry v8
app.use((err, req, res, next) => {
  Sentry.captureException(err);
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
  });
});

module.exports = app;
