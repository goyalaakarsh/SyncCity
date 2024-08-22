import React from 'react'
import './ProjectDetails.css'
import ProjDeets from '../../../components/project/projdeets/ProjDeets'
import ProjTasks from '../../../components/project/projtasks/ProjTasks'

const ProjectDetails = () => {
  return (
    <div className="project-details maincon">
        <ProjDeets/>
        <div className="v-divider">

        </div>
        <ProjTasks/>
    </div>
  )
}

export default ProjectDetails