import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { EditForm } from "./EditForm";
import { AddTodoForm } from "./AddTodoForm";
import { TodoRows } from "./TodoRows";

export const App = () => {
  const [addTodo, setAddTodo] = useState("");
  const [description, setDescription] = useState("");

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");

    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });

  // set the todos to the local storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    // set addTodo into the todos array
    if (addTodo !== "") {
      setTodos([
        ...todos,
        {
          id: uuid(),
          text: addTodo.trim(),
          description: description.trim(),
        },
      ]);
    }
    setAddTodo("");
    setDescription("");
  };

  const handleInputChange = (e) => {
    setAddTodo(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleDeleteClick = (id) => {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(removeItem);
  };

  // handle Editing Mode
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  const handleEditClick = (todo) => {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  };

  const handleEditInputChange = (e) => {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
  };

  const handleEditDescriptionChange = (e) => {
    setCurrentTodo({
      ...currentTodo,
      description: e.target.value,
    });
  };

  const handleUpdateTodo = (id, updatedTodo) => {
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    setIsEditing(false);
    setTodos(updatedItem);
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    handleUpdateTodo(currentTodo.id, currentTodo);
  };

  return (
    <div className="App">
      {isEditing ? (
        <EditForm
          currentTodo={currentTodo}
          setIsEditing={isEditing}
          onEditInputChange={handleEditInputChange}
          onEditDescriptionChange={handleEditDescriptionChange}
          onEditFormSubmit={handleEditFormSubmit}
        />
      ) : (
        <AddTodoForm
          addTodo={addTodo}
          description={description}
          onAddInputChange={handleInputChange}
          onAddDescriptionChange={handleDescriptionChange}
          onAddFormSubmit={onFormSubmit}
        />
      )}

      <ul>
        {todos.map((todo) => (
          <TodoRows
            todo={todo}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
          />
        ))}
      </ul>
    </div>
  );
};
