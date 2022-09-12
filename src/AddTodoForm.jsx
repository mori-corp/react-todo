import React from "react";

export const AddTodoForm = ({
  addTodo,
  description,
  onAddFormSubmit,
  onAddInputChange,
  onAddDescriptionChange,
}) => {
  return (
    <form onSubmit={onAddFormSubmit}>
      <input
        name="todo"
        type="text"
        placeholder="Create a new todo"
        value={addTodo}
        autoComplete="off"
        onChange={onAddInputChange}
        required
      />
      <textarea
        name="description"
        value={description}
        onChange={onAddDescriptionChange}
        id=""
        cols="30"
        rows="2"
        placeholder="description"
        autoComplete="off"
        required
      ></textarea>
      <button type="submit" className="add-btn">
        +
      </button>
    </form>
  );
};
