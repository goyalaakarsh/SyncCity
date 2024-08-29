import React from 'react';
import './Projects.css';
import ProjectCard from '../../components/project/projectcard/ProjectCard';
import {Link, useNavigate} from 'react-router-dom';


const dummyProjects = [
    {
        title: "Project Alpha",
        dateRange: "20/08/2024 - 23/09/2025",
        location: "Faridabad, Haryana",
        manager: "Aakarsh Goyal",
        status: "Completed",
        requests: "Pending",
        tasks: [
            { status: "completed", labelClass: "g-tag", label: "Completed", count: 5 },
            { status: "In Progress", labelClass: "b-tag", label: "In Progress", count: 5 }
        ]
    },
    {
        title: "Project Beta",
        dateRange: "01/09/2024 - 30/10/2025",
        location: "Gurgaon, Haryana",
        manager: "Ravi Kumar",
        status: "In Progress",
        requests: "Approved",
        tasks: [
            { status: "completed", labelClass: "g-tag", label: "Completed", count: 2 },
            { status: "In Progress", labelClass: "b-tag", label: "In Progress", count: 8 }
        ]
    },
    // Add more dummy projects as needed
];

const Projects = () => {
    return (
        <div className="maincon">
            <div className="projects-topcon">
                <p className="heading">Projects</p>
                <a href="/create-project">
                    <button className="mainbtn"><i className="tag-icon fa-solid fa-circle-plus"></i> Create new</button>
                </a>
            </div>

            <div className="project-cards">
                {dummyProjects.map((project, index) => (
                    <ProjectCard key={index} {...project} />
                ))}
            </div>
        </div>
    );
}

export default Projects;
