import { useState } from "react";

import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const AddTodo = () => {
    if (value.trim() !== "") {
      setTodos([...todos, value]);
      setValue("");
    }
  };

  const handleDelete = (indexToDelete) => {
    const updatedTodos = todos.filter((_, index) => index !== indexToDelete);
    setTodos(updatedTodos);
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
            {todo}
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
