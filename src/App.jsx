import React, { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const AddTodo = () => {
    if (value.trim() !== "") {
      const existingTodo = todos.find((todo) => todo.text === value.trim());
      if (!existingTodo) {
        setTodos([...todos, { text: value, isEditing: false }]);
        setValue("");
      } else {
        alert("todo already exists");
      }
    }
  };

  const handleDelete = (indexToDelete) => {
    const updatedTodos = todos.filter((_, index) => index !== indexToDelete);
    setTodos(updatedTodos);
  };

  const moveTodo = (index, direction) => {
    const newTodos = [...todos];
    if (direction === "up" && index > 0) {
      [newTodos[index], newTodos[index - 1]] = [
        newTodos[index - 1],
        newTodos[index],
      ];
    } else if (direction === "down" && index < newTodos.length - 1) {
      [newTodos[index], newTodos[index + 1]] = [
        newTodos[index + 1],
        newTodos[index],
      ];
    }
    setTodos(newTodos);
  };

  const handleEdit = (indexToEdit) => {
    setTodos(
      todos.map((todo, index) =>
        index === indexToEdit ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const handleSave = (indexToSave, newValue) => {
    setTodos(
      todos.map((todo, index) =>
        index === indexToSave
          ? { ...todo, text: newValue, isEditing: false }
          : todo
      )
    );
  };

  return (
    <>
      <input
        type="text"
        placeholder="Enter a value"
        value={value}
        onChange={handleChange}
      />
      <button type="button" onClick={AddTodo}>
        Add Todo
      </button>
      <ol>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo.isEditing ? (
              <>
                <input
                  type="text"
                  value={todo.text}
                  onChange={(e) =>
                    setTodos(
                      todos.map((t, i) =>
                        i === index ? { ...t, text: e.target.value } : t
                      )
                    )
                  }
                />
                <button
                  type="button"
                  onClick={() => moveTodo(index, "up")}
                  disabled={index === 0}
                >
                  Move Up
                </button>
                <button
                  type="button"
                  onClick={() => moveTodo(index, "down")}
                  disabled={index === todos.length - 1}
                >
                  Move Down
                </button>
                <button
                  type="button"
                  onClick={() => handleSave(index, todo.text)}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                {todo.text}
                <button type="button" onClick={() => handleEdit(index)}>
                  Edit
                </button>
              </>
            )}
            <button type="button" onClick={() => handleDelete(index)}>
              Delete
            </button>
          </li>
        ))}
      </ol>
    </>
  );
}

export default App;
