import React, { useState } from "react";

function TaskForm({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    onAdd(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a task..."
      />
      <button type="submit">+</button>
    </form>
  );
}

export default TaskForm;
