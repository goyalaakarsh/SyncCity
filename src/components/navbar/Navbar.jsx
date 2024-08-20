import React from 'react'
import Logo from '../../assets/logo.png'
import './Navbar.css'

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="logo">
                <img src={Logo} alt="" />
            </div>

            <div className="navbar_links">
                <a className='navbar_link' href="/dashboard">Dashboard</a>
                <a className='navbar_link' href="/projects">Projects</a>
                <a className='navbar_link' href="/inbox">Inbox</a>
                <a className='navbar_link' href="/events">Events</a>
                <a className='navbar_link' href="/departments">Departments</a>
                <a className='navbar_link' href="/share-data">Share Data</a>
            </div>

            <div className="navbar_icons">
                <div className="bell-icon">
                <i className="fa-solid fa-bell"></i>
                </div>
                <img className='profile-img' src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" alt="" />
            </div>
        </div>
    )
}

export default Navbar