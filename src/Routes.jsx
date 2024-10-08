import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Dashboard from './pages/dashboard/Dashboard';
import Signup from './pages/onboarding/Signup';
import Login from './pages/onboarding/Login';
import Projects from './pages/projects/Projects';
import ProjectDetails from './pages/projects/projectdetails/ProjectDetails';
import Departments from './pages/departments/Departments';
import Events from './pages/events/Events';
import NewProject from './pages/projects/newproject/NewProject';
import NewDepart from './pages/departments/newdepart/NewDepart';
import Discussions from './pages/discussions/Discussions';
import ShareData from './pages/sharedata/ShareData';
import Notifications from './pages/notifications/Notifications';
import NewEvent from './pages/events/newevent/NewEvent';
import Profile from './pages/profile/Profile';
import Root from './pages/root/Root';
import Join from './pages/onboarding/Join';
import DepartDeets from './components/department/departdeets/DepartDeets';
import EditDepart from './pages/departments/editdepart/EditDepart';
import { useUser } from './UserContext';
import Inventory from './pages/inventory/Inventory';


const AppRoutes = () => {
    return (
        <Router>
            <AppLayout />
        </Router>
    );
};

const AppLayout = () => {
    const { state } = useUser();
    const location = useLocation();
    const hideNavbarRoutes = ['/', '/signup', '/login', '/root', '/join'];
    const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);
    const shouldShowFooter = true; // Adjust this if needed
  
    return (
      <>
        {shouldShowNavbar && <Navbar />}
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/projects" element={<Projects />} />
            <Route
              path="/dashboard"
              element={state.user && state.user.depId ? <Dashboard /> : <Navigate to="/join" />}
            />
            <Route path="/create-project" element={<NewProject />} />
            <Route path="/project-details/:id" element={<ProjectDetails />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/create-department" element={<NewDepart />} />
            <Route path="/events" element={<Events />} />
            <Route path="/discussions" element={<Discussions />} />
            <Route path="/share-data" element={<ShareData />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/create-event" element={<NewEvent />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/root" element={<Root />} />
            <Route path="/join" element={<Join />} /> {/* Ensure this matches your backend route */}
            <Route path="/departments/update/:id" element={<EditDepart />} />
            <Route path="/departments/:id" element={<DepartDeets />} />
            <Route path="/inventory" element={<Inventory />} />
          </Routes>
        </main>
      </>
    );
  };
  

export default AppRoutes;
