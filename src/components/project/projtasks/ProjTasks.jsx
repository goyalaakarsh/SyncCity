import React, { useState } from 'react';
import Modal from '../edittask/EditTask';
import NewTask from '../newtask/NewTask'; // Import the NewTask component
import './ProjTasks.css';


const ProjTasks = () => {
    const [tasks, setTasks] = useState([
        { id: 1, name: "Upgrade citizen data management system ", status: "inprogress", deadline: "2024-09-15" },
        { id: 2, name: "Implement new tax reporting software", status: "completed", deadline: "2024-07-30" },
        { id: 3, name: "Develop public health initiative outreach program", status: "inprogress", deadline: "2024-10-05" },
        { id: 4, name: "Revamp online voter registration portal", status: "completed", deadline: "2024-08-20" },
        { id: 5, name: "Enhance social services application process", status: "inprogress", deadline: "2024-11-01" },
        { id: 6, name: "Upgrade infrastructure for national emergency", status: "inprogress", deadline: "2025-01-10" },
        { id: 7, name: "Improve public transportation scheduling", status: "inprogress", deadline: "2024-12-15" },
        { id: 8, name: "Launch new environmental conservation awareness", status: "completed", deadline: "2024-10-30" },
        { id: 9, name: "Revise and modernize government employee training programs", status: "inprogress", deadline: "2024-11-25" },
        { id: 10, name: "Upgrade security measures for sensitive government data systems", status: "completed", deadline: "2024-09-30" }
    ]);

    const [isModalVisible, setModalVisible] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const [isNewTaskModalVisible, setNewTaskModalVisible] = useState(false);
    const [newTask, setNewTask] = useState({ name: "", deadline: "", status: "inprogress" });

    const handleNewTaskSave = () => {
        setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
        setNewTaskModalVisible(false);
        setNewTask({ name: "", deadline: "", status: "inprogress" });
    };



    const toggleTaskStatus = (taskId) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId
                    ? { ...task, status: task.status === "inprogress" ? "completed" : "inprogress" }
                    : task
            )
        );
    };

    const deleteTask = (taskId) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    };

    const handleEditClick = (task) => {
        setEditingTask(task);
        setModalVisible(true);
    };

    const handleTaskUpdate = () => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === editingTask.id
                    ? editingTask
                    : task
            )
        );
        setModalVisible(false);
        setEditingTask(null);
    };

    return (
        <div className="ProjTasks">
            <div className='proj-tasks'>
                <span>Tasks</span>
                <button className="createnewbtn mainbtn" onClick={() => setNewTaskModalVisible(true)}><i className="fa-solid fa-circle-plus"></i> Create new</button>
            </div>

            <div className="projtasks-cats">
                <div className='projtasks-cat completed'>
                    <div className='projtasks-label g-tag'></div>
                    <span className="task-label-info">Completed: {tasks.filter(task => task.status === "completed").length}</span>
                </div>
                <div className='projtasks-cat In Progress'>
                    <div className='projtasks-label b-tag'></div>
                    <span className="task-label-info">In Progress: {tasks.filter(task => task.status === "inprogress").length}</span>
                </div>
            </div>

            <div className="tasks-cat-list">
                <div className="task-category">
                    <span className="task-cat-tag b-tag">
                        <i className="fa-regular fa-circle-dot"></i>
                        <span>In Progress</span>
                    </span>
                    <div className="tasks-list">
                        {tasks.filter(task => task.status === "inprogress").map(task => (
                            <div className="task-item" key={task.id}>
                                <i className="inprog fa-regular fa-circle-dot" onClick={() => toggleTaskStatus(task.id)}></i>
                                <div className="tooltiptext">Mark as completed</div>

                                <span>{task.name}</span>
                                <div className="task-extras">
                                    <div className="mainbtn task-deadline">
                                        <div className="info-icon">
                                            <i className="far fa-calendar-alt"></i>
                                        </div>
                                        <span>{task.deadline}</span>
                                    </div>
                                    <span className="task-actions">
                                        <i className="fa-solid fa-pen" onClick={() => handleEditClick(task)}></i>
                                        <i className="fa-solid fa-trash" onClick={() => deleteTask(task.id)}></i>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="tasks-cat-list">
                <div className="task-category">
                    <span className="task-cat-tag g-tag">
                        <i className="fa-solid fa-circle-check"></i>
                        <span>Completed</span>
                    </span>
                    <div className="tasks-list">
                        {tasks.filter(task => task.status === "completed").map(task => (
                            <div className="task-item" key={task.id}>
                                <i className="comp fa-solid fa-circle-check" onClick={() => toggleTaskStatus(task.id)}></i>
                                <div className="tooltiptext">Mark as in progress</div>
                                <span>{task.name}</span>

                                <div className="task-extras">
                                    <div className="mainbtn task-deadline">
                                        <div className="info-icon">
                                            <i className="far fa-calendar-alt"></i>
                                        </div>
                                        <span>{task.deadline}</span>
                                    </div>
                                    <span className="task-actions">
                                        <i className="fa-solid fa-pen" onClick={() => handleEditClick(task)}></i>
                                        <i className="fa-solid fa-trash" onClick={() => deleteTask(task.id)}></i>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal Component */}
            <Modal
                isVisible={isModalVisible}
                onClose={() => setModalVisible(false)}
                onSave={handleTaskUpdate}
                editingTask={editingTask}
                setEditingTask={setEditingTask}
            />

            <NewTask
                isVisible={isNewTaskModalVisible}
                onClose={() => setNewTaskModalVisible(false)}
                onSave={handleNewTaskSave}
                newTask={newTask}
                setNewTask={setNewTask}
            />

        </div>
    );
}

export default ProjTasks;
