import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Projects from './pages/projects/Projects'
import ProjectDetails from './pages/projects/projectdetails/ProjectDetails'
import Departments from './pages/departments/Departments'
import Events from './pages/events/Events'
import NewProject from './pages/projects/newproject/NewProject'
import Signup from './pages/onboarding/Signup'
import Login from './pages/onboarding/Login'
import NewDepart from './pages/departments/newdepart/NewDepart'
import Home from './pages/home/Home'
import AppRoutes from './Routes'
import { UserProvider } from './UserContext';

function App() {

  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  )
}

export default App
