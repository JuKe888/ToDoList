import React, { useState, useEffect } from "react"

function ToDoList() {

    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [newTask, setNewTask] = useState("");
    const [taskToDelete, setTaskToDelete] = useState(null);

    function handleInputChange(event){
        setNewTask(event.target.value);
    }

    function addTask(){
        if(!newTask.trim()) return;
            setTasks(t => [
                ...t, 
                { text: newTask.trim(), completed: false }
            ]);
            setNewTask("");
    }

    function toggleTask(index) {
        setTasks(tasks =>
            tasks.map((task, i) =>
                i === index
                    ? { ...task, completed: !task.completed }
                    : task
            )
        );
    }

    function deleteTask(index){
        if (window.confirm("You sure say you complete the task?")) {
            const updatedTasks = tasks.filter((_, i) => i !== index);
            setTasks(updatedTasks);
        }
    }

    function moveTaskUp(index){
        if(index > 0){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] =
            [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index){
        if(index < tasks.length - 1){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] =
            [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    return(
        <div className="to-do-list">
            <div className="todo-card">
                <h1 className="title">
                    <img src="/todo-icon.png" alt="todo icon" />
                    To-Do-List
                </h1>

                <form
                    className="task-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        addTask();
                    }}
                >
                    <input
                        type="text"
                        placeholder="Enter a task..."
                        value={newTask}
                        onChange={handleInputChange}
                    />
                    <button type="submit" className="add-button">
                        Add
                    </button>
                </form>

                <ol>
                    {tasks.map((task, index) => (
                    <li key={index}>
                        <img
                            src={task.completed ? "/checked.png" : "/unchecked.png"}
                            alt="checkbox"
                            className="checkbox"
                            onClick={() => toggleTask(index)}
                        />

                        <span className={`text ${task.completed ? "completed" : ""}`}>
                            {task.text}
                        </span>

                        <button
                            className="delete-button"
                            onClick={() => deleteTask(index)}
                        >
                         Delete
                        </button>
                        <button
                        className="move-button"
                        onClick={() => moveTaskUp(index)}
                        >
                            👆
                        </button>
                        <button
                            className="move-button"
                            onClick={() => moveTaskDown(index)}
                        >
                            👇
                        </button>
                    </li>
                 ))}
                </ol>
            </div>
        </div>

)}
export default ToDoList