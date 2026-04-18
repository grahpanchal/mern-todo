import React from "react";
import "./TodoList.css";

function TodoList({ todos, onToggle, onDelete }) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo._id} className={`todo-item ${todo.completed ? "done" : ""}`}>
          <button
            className="check-btn"
            onClick={() => onToggle(todo._id)}
            title="Toggle complete"
          >
            {todo.completed ? "✓" : ""}
          </button>

          <span className="todo-title">{todo.title}</span>

          <button
            className="delete-btn"
            onClick={() => onDelete(todo._id)}
            title="Delete"
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
