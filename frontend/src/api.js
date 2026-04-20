import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://mern-todo-backend-ddjh.onrender.com" // Render ka URL
      : "http://localhost:5000", // Local
});

export default api;
