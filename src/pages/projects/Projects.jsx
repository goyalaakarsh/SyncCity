import React from 'react'
import './Projects.css'
import ProjectCard from '../../components/project/projectcard/ProjectCard'

const Projects = () => {
    return (
        <div className="maincon">
            <div className="projects-topcon">
                <p className="heading">Projects</p>
                <button className="mainbtn"><i className="fa-solid fa-circle-plus"></i> Create new</button>
            </div>

            <div className="project-cards">
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
            </div>

        </div>
    )
}

export default Projects