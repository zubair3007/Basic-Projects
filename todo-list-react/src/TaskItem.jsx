import React, { useState } from "react";
function TaskItem({ task, onToggle, onDelete, onEdit})

{

const[editing, setIsEditing] = useState(false);
const [editText, setEditText] = useState(task.text);


const handleSave =() =>{
    if(editText.trim() === "")return;
    onEdit(task.id, editText);
    setIsEditing(false);
}
return (
  <div className="task-item">
    <input
      type="checkbox"
      checked={task.completed}
      onChange={() => onToggle(task.id)}
    />

    {editing ? (
      <>
        <input value={editText} onChange={(e) => setEditText(e.target.value)} />
        <button onClick={handleSave}>💾</button>
        <button onClick={() => setIsEditing(false)}>❌</button>
      </>
    ) : (
      <>
        <span className={task.completed ? "done" : ""}>{task.text}</span>
        <button onClick={() => setIsEditing(true)}>✏️</button>
        <button onClick={() => onDelete(task.id)}>❌</button>
      </>
    )}
  </div>
);
}

export default TaskItem;
