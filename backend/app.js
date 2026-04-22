// // const express = require("express");
// // const cors = require("cors");
// // require("dotenv").config();

// // const todoRoutes = require("./routes/todos");
// // const authRoutes = require("./routes/auth");

// // const app = express();

// // const corsOptions = {
// //   origin: [
// //     "http://localhost:3000",
// //     "https://mern-todo-frontend-drab.vercel.app",
// //   ],
// //   credentials: true,
// //   methods: ["GET", "POST", "PUT", "DELETE"],
// // };

// // app.use(cors(corsOptions));
// // app.use(express.json());

// // // Mock io — tests mein real socket nahi hoga
// // app.set("io", {
// //   to: () => ({ emit: () => {} }),
// //   emit: () => {},
// // });

// // app.use("/api/auth", authRoutes);
// // app.use("/api/todos", todoRoutes);

// // app.get("/", (req, res) => {
// //   res.json({ message: "🚀 MERN Todo API is running!" });
// // });

// // module.exports = app;

// const mongoose = require("mongoose");
// const http = require("http");
// const { Server } = require("socket.io");
// const app = require("./app");
// require("dotenv").config();

// const PORT = process.env.PORT || 5000;
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: [
//       "http://localhost:3000",
//       "https://mern-todo-frontend-drab.vercel.app",
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   },
// });

// io.on("connection", (socket) => {
//   console.log("✅ User connected:", socket.id);

//   // User apne room mein join kare
//   socket.on("join", (userId) => {
//     socket.join(userId);
//     console.log(`User ${userId} joined their room`);
//   });

//   socket.on("disconnect", () => {
//     console.log("❌ User disconnected:", socket.id);
//   });
// });

// // app.set("io", io);
// app.set("io", {
//   to: () => ({ emit: () => {} }),
//   emit: () => {},
// });

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ MongoDB Connected!");
//     server.listen(PORT, () => {
//       console.log(`✅ Server running on http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("❌ MongoDB connection failed:", err.message);
//   });

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

// Mock io — server.js mein real io override kar dega
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