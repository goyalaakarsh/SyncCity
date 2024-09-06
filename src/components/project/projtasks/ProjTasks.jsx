import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Modal from '../edittask/EditTask';
import NewTask from '../newtask/NewTask'; // Import the NewTask component
import './ProjTasks.css';


const ProjTasks = () => {
    const { id } = useParams(); // Get project ID from URL
    const [tasks, setTasks] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [isNewTaskModalVisible, setNewTaskModalVisible] = useState(false);
    const [newTask, setNewTask] = useState({ name: "", deadline: "", state: 0 });


    useEffect(() => {
        // Fetch tasks from the backend using the project ID
        const fetchTasks = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/project/${id}/tasks`);
                const data = await response.json();
                setTasks(data);

                console.log(tasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, [id]);


    const handleNewTaskSave = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/task/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...newTask, projectId: id }),
            });
            const savedTask = await response.json();
            setTasks([...tasks, savedTask]);
            setNewTaskModalVisible(false);
            setNewTask({ name: "", deadline: "", state: 0 });
        } catch (error) {
            console.error('Error saving new task:', error);
        }
    };


    const toggleTaskStatus = async (taskId) => {
        const updatedTasks = tasks.map(task =>
            task._id === taskId
                ? { ...task, state: task.state === 0 ? 1 : 0 }
                : task
        );
        setTasks(updatedTasks);

        // Update task status in the backend
        const taskToUpdate = tasks.find(task => task._id === taskId);
        // console.log(taskToUpdate);
        
        const updatedState = taskToUpdate.state === 0 ? 1 : 0;
        try {
            await fetch(`http://localhost:3000/api/task/update/${taskId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...taskToUpdate, state: updatedState }),
            });
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await fetch(`http://localhost:3000/api/task/delete/${taskId}`, {
                method: 'POST',
            });
            setTasks(tasks.filter(task => task._id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleEditClick = (task) => {
        setEditingTask(task);
        setModalVisible(true);
    };

    const handleTaskUpdate = async () => {
        try {
            await fetch(`http://localhost:3000/api/task/update/${editingTask._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editingTask),
            });
            setTasks(tasks.map(task =>
                task._id === editingTask._id
                    ? editingTask
                    : task
            ));
            setModalVisible(false);
            setEditingTask(null);
        } catch (error) {
            console.error('Error updating task:', error);
        }
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
                    <span className="task-label-info">Completed: {tasks.filter(task => task.state === 1).length}</span>
                </div>
                <div className='projtasks-cat In Progress'>
                    <div className='projtasks-label b-tag'></div>
                    <span className="task-label-info">In Progress: {tasks.filter(task => task.state === 0).length}</span>
                </div>
            </div>

            <div className="tasks-cat-list">
                <div className="task-category">
                    <span className="task-cat-tag b-tag">
                        <i className="fa-regular fa-circle-dot"></i>
                        <span>In Progress</span>
                    </span>
                    <div className="tasks-list">
                        {tasks.filter(task => task.state === 0).map(task => (
                            <div className="task-item" key={task.id}>
                                <i className="inprog fa-regular fa-circle-dot" onClick={() => toggleTaskStatus(task._id)}></i>
                                <div className="tooltiptext">Mark as completed</div>

                                <span>{task.name}</span>
                                <div className="task-extras">
                                    <div className="mainbtn task-deadline">
                                        <div className="info-icon">
                                            <i className="far fa-calendar-alt"></i>
                                        </div>
                                        {/* revisit */}
                                        <span>{new Date(task.deadline).toLocaleDateString()}</span> 
                                        {/* revisit */}
                                    </div>
                                    <span className="task-actions">
                                        <i className="fa-solid fa-pen" onClick={() => handleEditClick(task)}></i>
                                        <i className="fa-solid fa-trash" onClick={() => deleteTask(task._id)}></i>
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
                        {tasks.filter(task => task.state === 1).map(task => (
                            <div className="task-item" key={task.id}>
                                <i className="comp fa-solid fa-circle-check" onClick={() => toggleTaskStatus(task._id)}></i>
                                <div className="tooltiptext">Mark as in progress</div>
                                <span>{task.name}</span>

                                <div className="task-extras">
                                    <div className="mainbtn task-deadline">
                                        <div className="info-icon">
                                            <i className="far fa-calendar-alt"></i>
                                        </div>
                                        <span>{new Date(task.deadline).toLocaleDateString()}</span>
                                    </div>
                                    <span className="task-actions">
                                        <i className="fa-solid fa-pen" onClick={() => handleEditClick(task)}></i>
                                        <i className="fa-solid fa-trash" onClick={() => deleteTask(task._id)}></i>
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
