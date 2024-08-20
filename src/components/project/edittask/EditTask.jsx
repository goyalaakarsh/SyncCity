import React from 'react';
import './EditTask.css';

const EditTask = ({ isVisible, onClose, onSave, editingTask, setEditingTask }) => {
    if (!isVisible) return null;

    return (
        <div className="maincon edit-task-overlay">
            <div className="edit-task-content">
                <h3>Edit Task</h3>
                <label>
                    Task Name:
                </label>
                <textarea
                    value={editingTask.name}
                    onChange={(e) => setEditingTask({ ...editingTask, name: e.target.value })}
                />
                <label>
                    Deadline:
                </label>
                
                <input
                    type="date"
                    value={editingTask.deadline}
                    onChange={(e) => setEditingTask({ ...editingTask, deadline: e.target.value })}
                />
                <div className="edit-task-actions">
                    <button onClick={onSave}>Save</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default EditTask;
