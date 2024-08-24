import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './ProjectCard.css';

const ProjectCard = () => {
    return (
        <Link to="/project-details" className="project-card-link">
            <div className="project-card card">
                <h5 className="project-title">Title of the Projectwesdwsd,fdewdfdsm</h5>

                <div className="project-inform">
                    <div className="projinfo-item">
                        <i className="fa-solid fa-calendar-days"></i>
                        <span>20/08/2024 - 23/09/2025</span>
                    </div>
                    <div className="projinfo-item">
                        <i className="fa-solid fa-location-dot"></i>
                        <span>Faridabad, Haryana</span>
                    </div>
                </div>

                <div className="projcard-tags">
                    <span className='p-tag'>Manager: Aakarsh Goyal</span>
                    <span className='g-tag'>Status: Completed</span>
                    <span className='r-tag'>Requests: Pending</span>
                </div>

                <div className="projcard-tasks">
                    <span className='projtask-head'>Tasks:</span>
                    <div className="projecttask-cats">
                        <div className='projtasks-cat completed'>
                            <div className='projtasks-label g-tag'></div>
                            <span className="task-label-info">Completed: 5</span>
                        </div>
                        <div className='projtasks-cat In Progress'>
                            <div className='projtasks-label b-tag'></div>
                            <span className="task-label-info">In Progress: 5</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ProjectCard;
