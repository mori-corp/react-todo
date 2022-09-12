import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
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

  const [todoId, setTodoId] = useState(todos.length + 1);
  const [filter, setFilter] = useState("notStarted");
  const [filteredTodos, setFilteredTodos] = useState([]);

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
          id: todoId,
          text: addTodo.trim(),
          description: description.trim(),
          status: "incomplete",
        },
      ]);
    }
    setTodoId(todoId + 1);
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

  // handle status Changes
  const handleStatusChange = (targetTodo, e) => {
    const newArray = todos.map((todo) =>
      todo.id === targetTodo.id ? { ...todo, status: e.target.value } : todo
    );
    setTodos(newArray);
  };

  const handleSetFilter = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    const filteringTodos = () => {
      switch (filter) {
        case "incomplete":
          setFilteredTodos(
            todos.filter((todo) => todo.status === "incomplete")
          );
          break;
        // 問題1.絞り込みの処理を書こう
        case "onGoing":
          setFilteredTodos(todos.filter((todo) => todo.status === "onGoing"));
          break;
        case "complete":
          setFilteredTodos(todos.filter((todo) => todo.status === "complete"));
          break;
        // ここまで
        default:
          setFilteredTodos(todos);
      }
    };
    // 問題2. filteringTodosを呼び出そう
    filteringTodos();
    //ここまで
  }, [filter, todos]);

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
          filter={filter}
          onSetFilter={handleSetFilter}
        />
      )}

      <ul>
        {filteredTodos.map((todo) => (
          <TodoRows
            key={todo.id}
            todo={todo}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            onStatusChange={handleStatusChange}
          />
        ))}
      </ul>
    </div>
  );
};
