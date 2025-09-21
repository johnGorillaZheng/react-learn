import React, { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }


  function addTodo() {    
    if (inputValue.trim() !== '') {
      setTodos([...todos, inputValue]);
      setInputValue(''); // Clear input field after adding
    }
  }

  return (
    <div className="Todo">
      <input onChange={handleInputChange}  value={inputValue} type="text" placeholder="Add a new todo" />
      <button onClick={addTodo}>Add Todo</button>

      <h1>Todo List</h1>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => {
              const newTodos = todos.filter((_, i) => i !== index);
              setTodos(newTodos);
            }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;