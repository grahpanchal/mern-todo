// import React from "react";
// import "./TodoList.css";

// function TodoList({ todos, onToggle, onDelete }) {
//   return (
//     <ul className="todo-list">
//       {todos.map((todo) => (
//         <li key={todo._id} className={`todo-item ${todo.completed ? "done" : ""}`}>
//           <button
//             className="check-btn"
//             onClick={() => onToggle(todo._id)}
//             title="Toggle complete"
//           >
//             {todo.completed ? "✓" : ""}
//           </button>

//           <span className="todo-title">{todo.title}</span>

//           <button
//             className="delete-btn"
//             onClick={() => onDelete(todo._id)}
//             title="Delete"
//           >
//             ✕
//           </button>
//         </li>
//       ))}
//     </ul>
//   );
// }

// export default TodoList;

import React, { useState } from "react";
import "./TodoList.css";

function TodoList({ todos, onToggle, onDelete, onEdit }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const startEdit = (todo) => {
    setEditingId(todo._id);
    setEditText(todo.title);
  };

  const saveEdit = (id) => {
    if (!editText.trim()) return;
    onEdit(id, editText);
    setEditingId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li
          key={todo._id}
          className={`todo-item ${todo.completed ? "done" : ""}`}
        >
          {/* Check button */}
          <button
            className="check-btn"
            onClick={() => onToggle(todo._id)}
            title="Toggle complete"
          >
            {todo.completed ? "✓" : ""}
          </button>

          {/* Edit mode */}
          {editingId === todo._id ? (
            <div className="edit-section">
              <input
                className="edit-input"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveEdit(todo._id);
                  if (e.key === "Escape") cancelEdit();
                }}
                autoFocus
              />
              <button className="save-btn" onClick={() => saveEdit(todo._id)}>
                Save
              </button>
              <button className="cancel-btn" onClick={cancelEdit}>
                ✕
              </button>
            </div>
          ) : (
            /* Normal mode */
            <span
              className="todo-title"
              onDoubleClick={() => !todo.completed && startEdit(todo)}
              title={!todo.completed ? "Double click to edit" : ""}
            >
              {todo.title}
            </span>
          )}

          {/* Edit button */}
          {editingId !== todo._id && (
            <button
              className="edit-btn"
              onClick={() => !todo.completed && startEdit(todo)}
              disabled={todo.completed}
              title="Edit"
            >
              ✎
            </button>
          )}

          {/* Delete button */}
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