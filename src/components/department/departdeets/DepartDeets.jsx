import React from 'react';
import './DepartDeets.css';

const DepartDeets = ({ department }) => {
    const depName = department?.depName || 'Name not available.';
    const depDesc = department?.depDesc || 'Description not available.';
    const adminName = department?.adminId?.name || 'Unknown Admin'; // Placeholder admin name
    const avatar = department?.avatar || "https://media.istockphoto.com/id/866715034/vector/entrepreneurs-and-business-people-conference-in-modern-meeting-room.jpg?s=612x612&w=0&k=20&c=HViAYHb_7ZXDuoWEM113lHzShRMBFShmHw2LbuwhNJA="; // Default avatar
    const projects = department?.projects || 0; // Placeholder for projects count
    const members = department?.members || 0; // Placeholder for members count

    return (
        <div className="departdeets">
            <div className="departinfo">
                <img className='departlogo' src={avatar} alt="Department Avatar" />
                <h5 className="departname">{depName}</h5>
                <a href="/discussions">
                    <button className="discussbtn mainbtn"><i className="fa-solid fa-comments"></i>Discuss with Admin</button></a>
            </div>

            <div className="departstats">
                <div className="depart-info-items">
                    <div className="info-icon">
                        <i className="fa-solid fa-user-tie"></i>
                    </div>
                    <span>{adminName}</span>
                </div>
                <div className="depart-info-items">
                    <div className="info-icon">
                        <i className="fa-solid fa-diagram-project"></i>
                    </div>
                    <span>{projects} Projects</span>
                </div>
                <div className="depart-info-items">
                    <div className="info-icon">
                        <i className="fas fa-user-group"></i>
                    </div>
                    <span>{members} Members</span>
                </div>
            </div>

            <div className="depart-desc">
                <h5>Description:</h5>
                <span>{depDesc}</span>
            </div>
        </div>
    );
}

export default DepartDeets;
