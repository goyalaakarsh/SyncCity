import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Projects from './pages/projects/Projects'
import ProjectDetails from './pages/projectdetails/ProjectDetails'
import Departments from './pages/departments/Departments'
import Events from './pages/events/Events'

function App() {

  return (
    <>
      <Navbar />

      {/* <Projects/> */}
      <ProjectDetails/>
      {/* <Departments/>
      <Events/> */}

    </>
  )
}

export default App
