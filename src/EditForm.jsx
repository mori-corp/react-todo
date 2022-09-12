import React from "react";

export const EditForm = ({
  currentTodo,
  setIsEditing,
  onEditInputChange,
  onEditDescriptionChange,
  onEditFormSubmit,
}) => {
  return (
    <>
      <form onSubmit={onEditFormSubmit}>
        <input
          name="todo"
          type="text"
          placeholder="Create a new todo"
          value={currentTodo.text}
          autoComplete="off"
          onChange={onEditInputChange}
          required
        />
        <textarea
          name="description"
          value={currentTodo.description}
          onChange={onEditDescriptionChange}
          id=""
          cols="30"
          rows="2"
          placeholder="description"
          autoComplete="off"
          required
        ></textarea>
        <div>
          <button type="submit" className="edit-btn">
            Update
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
            }}
            className="cancel-btn"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};
