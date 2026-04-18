import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const API = "/api/todos";

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(API);
      setTodos(res.data);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  const addTodo = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post(API, { title: input });
      setTodos([res.data, ...todos]);
      setInput("");
    } catch (err) {
      console.error("Error adding todo:", err);
    }
    setLoading(false);
  };

  const toggleTodo = async (id) => {
    try {
      const res = await axios.put(`${API}/${id}`);
      setTodos(todos.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      console.error("Error toggling todo:", err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      setTodos(todos.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  const completed = todos.filter((t) => t.completed).length;

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <h1>📝 My Todos</h1>
          <p className="subtitle">
            {completed}/{todos.length} completed
          </p>
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

export default App;
