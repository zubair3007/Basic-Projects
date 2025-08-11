import { useState, useRef, useMemo, useCallback } from "react";

import TaskForm  from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';


function App(){
  const [tasks, setTasks] =useState([]);
  const [filter, setFilter]  =useState('all');
  const inputRef = useRef(null);


  const addTask= useCallback((title)=>{
    if(title.trim())
    {
      setTasks((prevTasks)=> [...prevTasks, {id: Date.now(), title:title.trim(), completed:false }]);
      inputRef.current.focus();
    }
  },[]);

  const toggleCompleted = useCallback((id) => {
    setTasks((prevTasks)=>
      prevTasks.map((task)=> (task.id===id? {...task, completed: !task.completed}: task))
    )
  },[]);
  
  

  const filteredTasks = useMemo(()=>{
    if(filter === 'completed') return tasks.filter((task)=> task.completed);
    if(filter === 'pending') return tasks.filter((task)=> !task.completed);

    return tasks;
    
  },[tasks, filter]);


  return (
    <div className="app-container">
      <div className="tracker-container">
        <h1>Memoised TOdo</h1>

        <TaskForm inputRef={inputRef} addTask={addTask} />

        <div className="filter-group">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <TaskList tasks={filteredTasks} toggleCompleted={toggleCompleted} />
      </div>
    </div>
  );
  }


  export default App



