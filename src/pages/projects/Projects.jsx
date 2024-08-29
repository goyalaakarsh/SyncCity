import React, { useEffect, useState } from 'react';
import './Projects.css';
import ProjectCard from '../../components/project/projectcard/ProjectCard';
import { useNavigate } from 'react-router-dom';

// const dummyProjects = [
//     {
//         title: "Project Alpha",
//         dateRange: "20/08/2024 - 23/09/2025",
//         location: "Faridabad, Haryana",
//         manager: "Aakarsh Goyal",
//         status: "Completed",
//         requests: "Pending",
//         tasks: [
//             { status: "completed", labelClass: "g-tag", label: "Completed", count: 5 },
//             { status: "In Progress", labelClass: "b-tag", label: "In Progress", count: 5 }
//         ]
//     },
//     {
//         title: "Project Beta",
//         dateRange: "01/09/2024 - 30/10/2025",
//         location: "Gurgaon, Haryana",
//         manager: "Ravi Kumar",
//         status: "In Progress",
//         requests: "Approved",
//         tasks: [
//             { status: "completed", labelClass: "g-tag", label: "Completed", count: 2 },
//             { status: "In Progress", labelClass: "b-tag", label: "In Progress", count: 8 }
//         ]
//     },
//     // Add more dummy projects as needed
// ];

const Projects = () => {

    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/project'); // Your API endpoint to get all projects
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);


    const handleProjectClick = (projectId) => {
        navigate(`/project/${projectId}`); // Navigate to the project details page with the project ID
    };


    return (
        <div className="maincon">
            <div className="projects-topcon">
                <p className="heading">Projects</p>
                <a href="/create-project">
                    <button className="mainbtn"><i className="tag-icon fa-solid fa-circle-plus"></i> Create new</button>
                </a>
            </div>

            <div className="project-cards">
                {projects.map((project, index) => (
                    <ProjectCard 
                        key={index} 
                        {...project} 
                        onClick={() => handleProjectClick(project._id)} // Pass project ID on click
                    />
                ))}
            </div>
        </div>
    );
}

export default Projects;
