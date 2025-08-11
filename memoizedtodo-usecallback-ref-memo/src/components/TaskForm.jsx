import { useState } from "react";


function TaskForm({inputRef, addTask})
{
    const [title, setTitle]= useState('');

    const handleSubmit =(e) =>{
        e.preventDefault();
        addTask(title);
        setTitle('');
    };


    return (
        <div className="form-container">
        <form onSubmit={handleSubmit} className="input-group">
            <input 
            ref={inputRef}
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e)=> setTitle(e.target.value)}
            className="input-title" />

            <button type="submit" className="add-button">Add task</button>
        </form>
        </div>
    );

}

export default TaskForm