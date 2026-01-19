import React, { useState } from "react"

function ToDoList() {

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [taskToDelete, setTaskToDelete] = useState(null);

    function handleInputChange(event){
        setNewTask(event.target.value);
    }

    function addTask(){

        if(newTask.trim() !== ""){
            setTasks(t => [...t, newTask]);
            setNewTask("");
        }
    }

    function deleteTask(index){
        if (window.confirm("Are you sure you want to delete this task?")) {
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

    return(
        <div className="to-do-list">

            <h1>To-Do-List</h1>

            <div>
                <input
                    type="text"
                    placeholder="Enter a task..."
                    value={newTask}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') addTask();
                    }}
                />
                <button
                    className="add-button"
                    onClick={addTask}>
                    Add
                </button>
            </div>

            <ol>
                {tasks.map((task, index) =>
                    <li key={index}>
                        <span className="text">{task}</span>
                        <button
                            className="delete-button"
                            onClick={() => setTaskToDelete(index)}>
                            Delete    
                        </button>
                        <button
                            className="move-button"
                            onClick={() => moveTaskUp(index)}>
                            👆    
                        </button>
                        <button
                            className="move-button"
                            onClick={() => moveTaskDown(index)}>
                            👇    
                        </button>
                    </li>
                )}
            </ol>

            {taskToDelete !== null && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <p>You sure say you complete the task🌚?</p>
                        <button
                            className="confirm"
                            onClick={() => {
                                const updatedTasks = tasks.filter((_, i) => i !== taskToDelete);
                                setTasks(updatedTasks);
                                setTaskToDelete(null);
                            }}>
                            Yes
                            </button>

                            <button
                            className="cancel"
                            onClick={() => setTaskToDelete(null)}>
                            No
                            </button>
                    </div>
                </div>
            )}

        </div>);
}
export default ToDoList