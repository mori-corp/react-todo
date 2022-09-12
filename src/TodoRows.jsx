import React from "react";

export const TodoRows = ({ todo, onEditClick, onDeleteClick, onStatusChange }) => {
  return (
    <li key={todo.id}>
      <div>
        <p className="todo-title">{todo.text}</p>
        <p className="todo-description">{todo.description}</p>
        <div className="wrapper">
          <button className="edit-btn" onClick={() => onEditClick(todo)}>
            Edit
          </button>
          <button className="delete-btn" onClick={() => onDeleteClick(todo.id)}>
            Delete
          </button>
          <select
            value={todo.status}
            name="status"
            onChange={(e) => onStatusChange(todo, e)}
          >
            <option value="incomplete">未着手</option>
            <option value="onGoing">進行中</option>
            <option value="complete">完了</option>
          </select>
        </div>
      </div>
    </li>
  );
};
