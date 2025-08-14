import { useState } from "react";

  import useTodoStore from './store';

  import './App.css';

 function App (){

  const [inputText, setInputText] = useState('');
  const {todos, addTodo, toggleTodo, deleteTodo}  =useTodoStore();

  const handleAddTodo =(e)=>{
    e.preventDefault();
    if(inputText.trim())
    addTodo(inputText);
  setInputText('');
  }

  return (
    <div className="app">
      <h1>Todo List with Zustand</h1>
      <p>Total Todos: {todos.length}</p>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter a todo"
        />

        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {todo.length} {todo.text}
            <button onClick={() => toggleTodo(todo.id)}>
              {todo.completed ? "Undo" : "Completed"}
            </button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
 }

 export default App
 