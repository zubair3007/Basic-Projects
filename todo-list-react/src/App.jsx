import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import "./App.css";

function App() {
 const [tasks, setTasks] = useState(() => {
  try {
    const saved = localStorage.getItem("tasks");
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Failed to parse tasks from localStorage:", e);
    return [];
  }
});

  

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
  };

const toggleTask = (id) => {
  setTasks(
    tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    )
  );
};

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

   const editTask = (id, newText) => {
     setTasks(
       tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
     );
   };

  return (
    <div className="app">
      <h1>📝 Task Tracker</h1>
      <TaskForm onAdd={addTask} />
      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} onEdit={editTask} />
      <p>
         {tasks.filter((t) => t.completed).length} of {tasks.length} tasks
        completed
      </p>
    </div>
  );
}

export default App;
