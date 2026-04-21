// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import TodoList from "./components/TodoList";
// // import "./App.css";

// // function App() {
// //   const [todos, setTodos] = useState([]);
// //   const [input, setInput] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const API = "https://mern-todo-backend-ddjh.onrender.com/api/todos";

// //   useEffect(() => {
// //     fetchTodos();
// //   }, []);

// //   const fetchTodos = async () => {
// //     try {
// //       const res = await axios.get(API);
// //       setTodos(res.data);
// //     } catch (err) {
// //       console.error("Error fetching todos:", err);
// //     }
// //   };

// //   const addTodo = async () => {
// //     if (!input.trim()) return;
// //     setLoading(true);
// //     try {
// //       const res = await axios.post(API, { title: input });
// //       setTodos([res.data, ...todos]);
// //       setInput("");
// //     } catch (err) {
// //       console.error("Error adding todo:", err);
// //     }
// //     setLoading(false);
// //   };

// //   const toggleTodo = async (id) => {
// //     try {
// //       const res = await axios.put(`${API}/${id}`);
// //       setTodos(todos.map((t) => (t._id === id ? res.data : t)));
// //     } catch (err) {
// //       console.error("Error toggling todo:", err);
// //     }
// //   };

// //   const deleteTodo = async (id) => {
// //     try {
// //       await axios.delete(`${API}/${id}`);
// //       setTodos(todos.filter((t) => t._id !== id));
// //     } catch (err) {
// //       console.error("Error deleting todo:", err);
// //     }
// //   };

// //   const completed = todos.filter((t) => t.completed).length;

// //   return (
// //     <div className="app">
// //       <div className="container">
// //         <div className="header">
// //           <h1>📝 My Todos</h1>
// //           <p className="subtitle">
// //             {completed}/{todos.length} completed
// //           </p>
// //         </div>

// //         <div className="input-section">
// //           <input
// //             type="text"
// //             placeholder="Add a new task..."
// //             value={input}
// //             onChange={(e) => setInput(e.target.value)}
// //             onKeyDown={(e) => e.key === "Enter" && addTodo()}
// //             className="todo-input"
// //           />
// //           <button
// //             onClick={addTodo}
// //             disabled={loading || !input.trim()}
// //             className="add-btn"
// //           >
// //             {loading ? "..." : "+ Add"}
// //           </button>
// //         </div>

// //         <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />

// //         {todos.length === 0 && (
// //           <div className="empty">No tasks yet! Add one above ☝️</div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default App;

// import React, { useState } from "react";
// import axios from "axios";
// import { AuthProvider, useAuth } from "./context/AuthContext";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import TodoList from "./components/TodoList";
// import "./App.css";
// import api from "./api";

// function TodoApp() {
//   const { user, token, logout } = useAuth();
//   const [todos, setTodos] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showRegister, setShowRegister] = useState(false);

//   const API = "/api/todos";
//   // const API = "https://mern-todo-backend-ddjh.onrender.com/api/todos";
//   const headers = { Authorization: `Bearer ${token}` };

//   React.useEffect(() => {
//     if (token) fetchTodos();
//   }, [token]);

//   const fetchTodos = async () => {
//     try {
//       const res = await api.get(API, { headers });
//       setTodos(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const addTodo = async () => {
//     if (!input.trim()) return;
//     setLoading(true);
//     try {
//       const res = await api.post(API, { title: input }, { headers });
//       setTodos([res.data, ...todos]);
//       setInput("");
//     } catch (err) {
//       console.error(err);
//     }
//     setLoading(false);
//   };

//   const toggleTodo = async (id) => {
//     try {
//       const res = await api.put(`${API}/${id}`, {}, { headers });
//       setTodos(todos.map((t) => (t._id === id ? res.data : t)));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const deleteTodo = async (id) => {
//     try {
//       await api.delete(`${API}/${id}`, { headers });
//       setTodos(todos.filter((t) => t._id !== id));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Auth screen
//   if (!user) {
//     return (
//       <div className="app">
//         {showRegister ? (
//           <Register onSwitch={() => setShowRegister(false)} />
//         ) : (
//           <Login onSwitch={() => setShowRegister(true)} />
//         )}
//       </div>
//     );
//   }

//   // Todo screen
//   const completed = todos.filter((t) => t.completed).length;

//   return (
//     <div className="app">
//       <div className="container">
//         <div className="header">
//           <div>
//             <h1>📝 My Todos</h1>
//             <p className="subtitle">
//               {completed}/{todos.length} completed
//             </p>
//           </div>
//           <div className="user-info">
//             <span className="user-name">👋 {user.name}</span>
//             <button onClick={logout} className="logout-btn">
//               Logout
//             </button>
//           </div>
//         </div>

//         <div className="input-section">
//           <input
//             type="text"
//             placeholder="Add a new task..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && addTodo()}
//             className="todo-input"
//           />
//           <button
//             onClick={addTodo}
//             disabled={loading || !input.trim()}
//             className="add-btn"
//           >
//             {loading ? "..." : "+ Add"}
//           </button>
//         </div>

//         <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />

//         {todos.length === 0 && (
//           <div className="empty">No tasks yet! Add one above ☝️</div>
//         )}
//       </div>
//     </div>
//   );
// }

// function App() {
//   return (
//     <AuthProvider>
//       <TodoApp />
//     </AuthProvider>
//   );
// }

// export default App;

import React, { useState, useEffect, useCallback } from "react";
import api from "./api";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { useSocket } from "./hooks/useSocket";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TodoList from "./components/TodoList";
import "./App.css";

function TodoApp() {
  const { user, token, logout } = useAuth();
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [notification, setNotification] = useState("");

  const API = "/api/todos";
  const headers = { Authorization: `Bearer ${token}` };

  // Notification helper
  const showNotif = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3000);
  };

  // Socket handlers
  const handleTodoAdded = useCallback((todo) => {
    setTodos((prev) => {
      if (prev.find((t) => t._id === todo._id)) return prev;
      showNotif("Naya todo add hua!");
      return [todo, ...prev];
    });
  }, []);

  const handleTodoUpdated = useCallback((updated) => {
    setTodos((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
  }, []);

  const handleTodoDeleted = useCallback(({ id }) => {
    setTodos((prev) => prev.filter((t) => t._id !== id));
  }, []);

  useSocket(handleTodoAdded, handleTodoUpdated, handleTodoDeleted);

  useEffect(() => {
    if (token) fetchTodos();
  }, [token]);

  const fetchTodos = async () => {
    try {
      const res = await api.get(API, { headers });
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addTodo = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      await api.post(API, { title: input }, { headers });
      setInput("");
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const toggleTodo = async (id) => {
    try {
      await api.put(`${API}/${id}`, {}, { headers });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.delete(`${API}/${id}`, { headers });
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) {
    return (
      <div className="app">
        {showRegister ? (
          <Register onSwitch={() => setShowRegister(false)} />
        ) : (
          <Login onSwitch={() => setShowRegister(true)} />
        )}
      </div>
    );
  }

  const completed = todos.filter((t) => t.completed).length;

  return (
    <div className="app">
      {notification && <div className="notification">{notification}</div>}

      <div className="container">
        <div className="header">
          <div>
            <h1>📝 My Todos</h1>
            <p className="subtitle">
              {completed}/{todos.length} completed
            </p>
          </div>
          <div className="user-info">
            <span className="user-name">👋 {user.name}</span>
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>

        <div className="input-section">
          <input
            type="text"
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            className="todo-input"
          />
          <button
            onClick={addTodo}
            disabled={loading || !input.trim()}
            className="add-btn"
          >
            {loading ? "..." : "+ Add"}
          </button>
        </div>

        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />

        {todos.length === 0 && (
          <div className="empty">No tasks yet! Add one above ☝️</div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <TodoApp />
    </AuthProvider>
  );
}

export default App;