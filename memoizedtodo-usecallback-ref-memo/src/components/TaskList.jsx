


function TaskList({ tasks = [], toggleCompleted }) {
  return (
    <ul className="task-list">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <li key={task.id} className="task-item">
            <span className={`task-title ${task.completed ? "completed" : ""}`}>
              {task.title}
            </span>
            <button
              onClick={() => toggleCompleted(task.id)}
              className="toggle-button"
            >
              {task.completed ? "Undo" : "Complete"}
            </button>
          </li>
        ))
      ) : (
        <li className="task-item">No tasks available</li>
      )}
    </ul>
  );
}

export default TaskList;