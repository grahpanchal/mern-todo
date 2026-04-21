import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SOCKET_URL =
  process.env.NODE_ENV === "production"
    ? "https://mern-todo-backend-ddjh.onrender.com"
    : "http://localhost:5000";

export const useSocket = (onTodoAdded, onTodoUpdated, onTodoDeleted) => {
  const socketRef = useRef(null);

  useEffect(() => {
    // Socket connect karo
    socketRef.current = io(SOCKET_URL);

    socketRef.current.on("connect", () => {
      console.log("✅ Socket connected!");
    });

    // Events sun
    socketRef.current.on("todo:added", onTodoAdded);
    socketRef.current.on("todo:updated", onTodoUpdated);
    socketRef.current.on("todo:deleted", onTodoDeleted);

    // Cleanup
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return socketRef.current;
};
