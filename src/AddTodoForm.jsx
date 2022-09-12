import React from "react";

export const AddTodoForm = ({
  addTodo,
  description,
  onAddFormSubmit,
  onAddInputChange,
  onAddDescriptionChange,
  filter,
  onSetFilter,
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
      <div className="command-area">
        <button type="submit" className="add-btn">
          +
        </button>
        <select value={filter} onChange={onSetFilter}>
          <option value="all">すべて</option>
          <option value="incomplete">未着手</option>
          <option value="onGoing">作業中</option>
          <option value="complete">完了</option>
        </select>
      </div>
    </form>
  );
};
