import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Dashboard from './pages/dashboard/Dashboard';
import Signup from './pages/onboarding/Signup';
import Login from './pages/onboarding/Login';
import Projects from './pages/projects/Projects';
import ProjectDetails from './pages/projectdetails/ProjectDetails';
import Departments from './pages/departments/Departments';
import Events from './pages/events/Events';
import NewProject from './pages/newproject/NewProject';
import NewDepart from './pages/newdepart/NewDepart';

const AppRoutes = () => {
    return (
        <Router>
            <AppLayout />
        </Router>
    );
};

const AppLayout = () => {
    const location = useLocation();
    const shouldShowNavbar = location.pathname !== '/';

    return (
        <>
            {shouldShowNavbar && <Navbar />}
            <main className="main">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/create-project" element={<NewProject />} />
                    <Route path="/projects/:id" element={<ProjectDetails />} />
                    <Route path="/departments" element={<Departments />} />
                    <Route path="/create-department" element={<NewDepart />} />
                    <Route path="/events" element={<Events />} />
                </Routes>
            </main>
        </>
    );
};

export default AppRoutes;
    