import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onToggle, onDelete, onEdit })

{



    console.log("Rendering tasks:", tasks);
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default TaskList;
