import React from 'react';
import './NewTask.css';

const NewTask = ({ isVisible, onClose, onSave, newTask, setNewTask }) => {
    if (!isVisible) return null;

    return (
        <div className="maincon new-task-overlay">
            <div className="new-task-content">
                <h3>Create New Task</h3>
                <label>
                    Task Name:
                </label>
                <textarea
                    value={newTask.name}
                    onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                />
                <label>
                    Deadline:
                </label>
                <input
                    type="date"
                    value={newTask.deadline}
                    onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value }) } 
                    required
                />
                <div className="new-task-actions">
                    <button onClick={onSave}>Save</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default NewTask;
