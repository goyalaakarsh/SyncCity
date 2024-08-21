import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Projects from './pages/projects/Projects'
import ProjectDetails from './pages/projectdetails/ProjectDetails'
import Departments from './pages/departments/Departments'
import Events from './pages/events/Events'
import NewProject from './pages/newproject/NewProject'
import Signup from './pages/onboarding/Signup'
import Login from './pages/onboarding/Login'
import NewDepart from './pages/newdepart/NewDepart'
import Home from './pages/home/Home'

function App() {

  return (
    <>
      <Home/>
      {/* <Navbar />

      <Projects/>
      <ProjectDetails/>
      <Departments/>
      <Events/>
      <NewProject/>
      <Signup/>
      <Login/>
      <NewDepart/> */}

    </>
  )
}

export default App
