import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './ProjectCard.css';

const ProjectCard = ({ title, dateRange, location, manager, status, requests, tasks }) => {
    // Determine status and request classes based on the props
    const getStatusClass = () => {
        switch (status.toLowerCase()) {
            case 'delayed':
                return 'r-tag';
            case 'in progress':
                return 'b-tag';
            case 'completed':
                return 'g-tag';
            case 'upcoming':
                return 'y-tag';
            default:
                return '';
        }
    };

    const getRequestsClass = () => {
        return requests.toLowerCase() === 'pending' ? 'r-tag' : 'g-tag';
    };

    return (
        <Link to="/project-details" className="project-card-link">
            <div className="project-card card">
                <h5 className="project-title">{title}</h5>

                <div className="project-inform">
                    <div className="projinfo-item">
                        <i className="fa-solid fa-calendar-days"></i>
                        <span>{dateRange}</span>
                    </div>
                    <div className="projinfo-item">
                        <i className="fa-solid fa-location-dot"></i>
                        <span>{location}</span>
                    </div>
                </div>

                <div className="projcard-tags">
                    <span className='p-tag'>Manager: {manager}</span>
                    <span className={`status-tag ${getStatusClass()}`}>Status: {status}</span>
                    <span className={`requests-tag ${getRequestsClass()}`}>Requests: {requests}</span>
                </div>

                <div className="projcard-tasks">
                    <span className='projtask-head'>Tasks:</span>
                    <div className="projecttask-cats">
                        {tasks.map((task, index) => (
                            <div key={index} className={`projtasks-cat ${task.status}`}>
                                <div className={`projtasks-label ${task.labelClass}`}></div>
                                <span className="task-label-info">{task.label}: {task.count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ProjectCard;
