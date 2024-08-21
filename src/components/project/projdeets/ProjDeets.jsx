import React, { useState } from 'react';
import './ProjDeets.css'
import ReqResources from '../reqresources/ReqResources'

const ProjDeets = () => {
    const [isReqResourcesVisible, setReqResourcesVisible] = useState(false);

    const handleReqResourcesOpen = () => {
        setReqResourcesVisible(true);
    };

    const handleReqResourcesClose = () => {
        setReqResourcesVisible(false);
    };

    const handleSaveResources = (requestedResources) => {
        console.log('Requested Resources:', requestedResources);
        setReqResourcesVisible(false);
        // Handle the saving of requested resources here
    };

    return (
        <div className="ProjDeets">
            <div className="aibtn">
                <button className="withai"><i className="tag-icon fa-solid fa-wand-magic-sparkles"></i>Summarize with AI</button>
            </div>
            <div className='proj-title'>Revamping Public Transportation System in Metropolitan Area</div>

            <div className="proj-tags">
                <span className='g-tag'>Status: Completed</span>
                <span className='r-tag'>Requests: Pending</span>
            </div>

            <div className="proj-actions">
                <button className="discussbtn mainbtn"><i className="fa-solid fa-comments"></i>Discuss with team</button>
                <button className="discussbtn mainbtn" onClick={handleReqResourcesOpen}><i className="fa-solid fa-hand"></i>Request Resources</button>
            </div>

            <div className="proj-info">
                <div className="proj-info-items">
                    <div className="info-icon">
                        <i className="fa-solid fa-user-tie"></i>
                    </div>
                    <span>Aakarsh Goyal</span>
                </div>
                <div className="proj-info-items">
                    <div className="info-icon">
                        <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <span>Faridabad, Haryana</span>
                </div>
                <div className="proj-info-items">
                    <div className="info-icon">
                        <i className="far fa-calendar-alt"></i>
                    </div>
                    <span>20/08/2024 - 23/09/2027</span>
                </div>
                <div className="proj-info-items">
                    <div className="info-icon">
                        <i className="fas fa-user-group"></i>
                    </div>
                    <span>39 Members</span>
                </div>
            </div>

            <div className="proj-depart">
                <p>Departments:</p>
                <div className='depart-list'>
                    <li>Finance</li>
                    <li>Marketing</li>
                    <li>Sales</li>
                </div>
            </div>

            <div className="proj-desc">
                <h5>Description:</h5>
                <span>
                    The Revamping Public Transportation System in Metropolitan Area project is a comprehensive initiative aimed at modernizing and enhancing the public transport infrastructure to better serve the needs of the metropolitan population. This project seeks to address the current limitations of the transportation network by implementing a series of upgrades and innovations designed to improve efficiency, accessibility, and user experience.

                    The project will focus on several key areas:
                    1. Infrastructure Upgrades: Replacing outdated transit facilities and expanding transit routes to cover underserved areas. This includes the construction of new bus stations, upgrading rail systems, and improving connectivity between different modes of transport.

                    2. Technology Integration: Incorporating advanced technologies such as real-time tracking systems, smart ticketing solutions, and automated fare collection. These innovations aim to streamline operations, reduce wait times, and provide passengers with up-to-date information on service schedules and disruptions.

                    3. Sustainability Initiatives: Promoting environmentally friendly practices by integrating electric and hybrid vehicles into the fleet, enhancing energy efficiency of transit facilities, and encouraging the use of alternative transportation methods such as cycling and walking.

                    4. Community Engagement: Engaging with residents and stakeholders to gather feedback and ensure that the new systems meet the needs of the community. This involves public consultations, surveys, and partnerships with local organizations to address specific concerns and preferences.

                    5. Safety Improvements: Implementing measures to enhance the safety and security of transit users, including improved lighting at stations, surveillance systems, and better emergency response protocols.

                    6. Economic Impact: The project aims to stimulate economic growth by creating jobs, supporting local businesses, and enhancing the overall attractiveness of the metropolitan area as a place to live and work.

                    The ultimate goal of this project is to create a reliable, efficient, and user-friendly transportation network that supports sustainable development, reduces traffic congestion, and improves the overall quality of life for residents. By addressing current challenges and preparing for future needs, the project seeks to establish a modern public transportation system that can adapt to evolving urban dynamics and contribute to a more connected and vibrant metropolitan community.

                </span>
            </div>

            <ReqResources
                isVisible={isReqResourcesVisible}
                onClose={handleReqResourcesClose}
                onSave={handleSaveResources}
            />
        </div>
    )
}

export default ProjDeets