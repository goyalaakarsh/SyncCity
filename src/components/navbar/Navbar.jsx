import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import './Navbar.css';

const Navbar = () => {
    return (
        <div className="navbar">
            <NavLink to="/" exact>
                <div className="logo">
                    <img src={Logo} alt="Logo" />
                </div>
            </NavLink>

            <div className="navbar_links">
                <NavLink
                    className="navbar_link"
                    to="/dashboard"
                    activeclassname="active"
                    exact
                >
                    Dashboard
                </NavLink>
                <NavLink
                    className="navbar_link"
                    to="/projects"
                    activeclassname="active"
                >
                    Projects
                </NavLink>
                <NavLink
                    className="navbar_link"
                    to="/discussions"
                    activeclassname="active"
                >
                    Discussions
                </NavLink>
                <NavLink
                    className="navbar_link"
                    to="/events"
                    activeclassname="active"
                >
                    Events
                </NavLink>
                {/* <NavLink
                    className="navbar_link"
                    to="/root"
                    activeclassname="active"
                >
                    Departments
                </NavLink> */}
                {/* <NavLink
                    className="navbar_link"
                    to="/share-data"
                    activeclassname="active"
                >
                    Share Data
                </NavLink> */}
            </div>

            <div className="navbar_icons">
                <NavLink to="/notifications">
                    <div className="bell-icon">
                        <i className="fa-solid fa-bell"></i>
                    </div>
                </NavLink>

                <NavLink to="/profile">
                    <img
                        className='profile-img'
                        src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
                        alt="Profile"
                    />
                </NavLink>
            </div>
        </div>
    );
}

export default Navbar;
