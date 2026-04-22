// // // // const express = require("express");
// // // // const mongoose = require("mongoose");
// // // // const cors = require("cors");
// // // // require("dotenv").config();

// // // // const todoRoutes = require("./routes/todos");

// // // // const app = express();
// // // // const PORT = process.env.PORT || 5000;

// // // // // Middleware
// // // // app.use(cors());
// // // // app.use(express.json());

// // // // // Routes
// // // // app.use("/api/todos", todoRoutes);

// // // // // Health check
// // // // app.get("/", (req, res) => {
// // // //   res.json({ message: "🚀 MERN Todo API is running!" });
// // // // });

// // // // // MongoDB Connection
// // // // // check backdend live deploy ment on render.com
// // // // mongoose
// // // //   .connect(process.env.MONGO_URI)
// // // //   .then(() => {
// // // //     console.log("✅ MongoDB Connected!");
// // // //     app.listen(PORT, () => {
// // // //       console.log(`✅ Server running on http://localhost:${PORT}`);
// // // //     });
// // // //   })
// // // //   .catch((err) => {
// // // //     console.error("❌ MongoDB connection failed:", err.message);
// // // //   });

// // // const express = require("express");
// // // const mongoose = require("mongoose");
// // // const cors = require("cors");
// // // require("dotenv").config();

// // // const todoRoutes = require("./routes/todos");
// // // const authRoutes = require("./routes/auth"); // ← naya

// // // const app = express();
// // // const PORT = process.env.PORT || 5000;

// // // // CORS config
// // // const corsOptions = {
// // //   origin: [
// // //     "http://localhost:3000", // local development
// // //     "https://mern-todo-frontend-drab.vercel.app/", // tumhara vercel URL
// // //   ],
// // //   credentials: true,
// // //   methods: ["GET", "POST", "PUT", "DELETE"],
// // // };

// // // app.use(cors());
// // // app.use(express.json());

// // // // Routes
// // // app.use("/api/auth", authRoutes); // ← naya
// // // app.use("/api/todos", todoRoutes);

// // // app.get("/", (req, res) => {
// // //   res.json({ message: "🚀 MERN Todo API is running!" });
// // // });

// // // mongoose
// // //   .connect(process.env.MONGO_URI)
// // //   .then(() => {
// // //     console.log("✅ MongoDB Connected!");
// // //     app.listen(PORT, () => {
// // //       console.log(`✅ Server running on http://localhost:${PORT}`);
// // //     });
// // //   })
// // //   .catch((err) => {
// // //     console.error("❌ MongoDB connection failed:", err.message);
// // //   });

// // const mongoose = require("mongoose");
// // const app = require("./app");
// // require("dotenv").config();

// // const PORT = process.env.PORT || 5000;

// // mongoose
// //   .connect(process.env.MONGO_URI)
// //   .then(() => {
// //     console.log("✅ MongoDB Connected!");
// //     app.listen(PORT, () => {
// //       console.log(`✅ Server running on http://localhost:${PORT}`);
// //     });
// //   })
// //   .catch((err) => {
// //     console.error("❌ MongoDB connection failed:", err.message);
// //   });

// const mongoose = require("mongoose");
// const http = require("http");
// const { Server } = require("socket.io");
// const app = require("./app");
// require("dotenv").config();

// const PORT = process.env.PORT || 5000;

// // HTTP server banao
// const server = http.createServer(app);

// // Socket.io attach karo
// const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:3000", "https://mern-todo-frontend-drab.vercel.app/"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   },
// });

// // Socket events
// io.on("connection", (socket) => {
//   console.log("✅ User connected:", socket.id);

//   socket.on("disconnect", () => {
//     console.log("❌ User disconnected:", socket.id);
//   });
// });

// // io ko global banao taaki routes mein use ho sake
// app.set("io", io);

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

const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://mern-todo-frontend-drab.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room`);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// Real io set karo
app.set("io", io);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected!");
    server.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });