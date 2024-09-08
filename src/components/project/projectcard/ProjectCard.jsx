import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import './ProjectCard.css';

const ProjectCard = ({ _id, name, startDate, endDate, location, state, managerId }) => {
    const [managerName, setManagerName] = useState('');
    const [completedTasksCount, setCompletedTasksCount] = useState(0);
    const [inProgressTasksCount, setInProgressTasksCount] = useState(0);

    // Fetch manager name
    useEffect(() => {
        const fetchManagerName = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/user/${managerId}`);
                if (!response.ok) throw new Error('Failed to fetch manager name');
                
                const data = await response.json();
                setManagerName(data.name);
            } catch (error) {
                console.error('Error fetching manager name:', error);
                setManagerName('Unknown');
            }
        };

        if (managerId) {
            fetchManagerName();
        }
    }, [managerId]);

    // Fetch task counts (completed and in-progress)
    useEffect(() => {
        const fetchTaskCounts = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/task?projectId=${_id}`);
                if (!response.ok) throw new Error('Failed to fetch task counts');

                const data = await response.json();
                setCompletedTasksCount(data.completedTasks);
                setInProgressTasksCount(data.inProgressTasks);
            } catch (error) {
                console.error('Error fetching task counts:', error);
            }
        };

        fetchTaskCounts();
    }, [_id]);

    const formatDateRange = (startDate, endDate) => {
        const start = new Date(startDate).toLocaleDateString();
        const end = new Date(endDate).toLocaleDateString();
        return `${start} - ${end}`;
    };

    const getStatusLabel = (state) => {
        switch (state) {
            case 0: return 'In Progress';
            case 1: return 'Completed';
            default: return 'Unknown';
        }
    };

    const getStatusClass = () => {
        switch (state) {
            case 0: return 'b-tag'; 
            case 1: return 'g-tag'; 
            default: return '';
        }
    };

    return (
        <Link to={`/project-details/${_id}`} className="project-card-link">
            <div className="project-card card">
                <h5 className="project-title">{name}</h5>
                <div className="project-inform">
                    <div className="projinfo-item">
                        <i className="fa-solid fa-calendar-days"></i>
                        <span>{formatDateRange(startDate, endDate)}</span>
                    </div>
                    <div className="projinfo-item">
                        <i className="fa-solid fa-location-dot"></i>
                        <span>{location}</span>
                    </div>
                </div>
                <div className="projcard-tags">
                    <span className='p-tag'>Manager: {managerName}</span>
                    <span className={`status-tag ${getStatusClass()}`}>Status: {getStatusLabel(state)}</span>
                </div>
                <div className="projcard-tasks">
                    <span className='projtask-head'>Tasks:</span>
                    <div className="projecttask-cats">
                        <span>Completed: {completedTasksCount}</span>
                        <span>In Progress: {inProgressTasksCount}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProjectCard;
