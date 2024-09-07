import React, { useState, useEffect } from 'react';
import './ProjDeets.css'
import ReqResources from '../reqresources/ReqResources'
import mapboxgl from 'mapbox-gl';
import { useParams } from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapComponent from '../../maps/Maps';

const ProjDeets = () => {
    const { id } = useParams(); // Get project ID from URL
    const [project, setProject] = useState(null); // State for storing the project details
    const [managerName, setManagerName] = useState(''); // State for storing the manager's name
    const [isReqResourcesVisible, setReqResourcesVisible] = useState(false);
    const [summary, setSummary] = useState(''); // State for storing the summary
    const [loading, setLoading] = useState(false); // State for loading indicator
    const [error, setError] = useState(''); // State for error handling
    const [departments, setDepartments] = useState([]);

    const fetchDepartmentNames = async (depIds) => {
        try {
          const promises = depIds.map(id => 
            fetch(`http://localhost:3000/api/department/${id}`).then(res => res.json())
          );
          const departmentsData = await Promise.all(promises);
          setDepartments(departmentsData.map(dep => dep.depName));
        } catch (error) {
          console.error('Error fetching department names:', error);
          setDepartments(['Error fetching departments']);
        }
      };

    // Fetch project details when the component mounts
    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/project/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setProject(data);
                fetchManagerName(data.managerId); // Fetch manager name based on manager ID
                fetchDepartmentNames(data.depId);
            } catch (error) {
                console.error('Error fetching project details:', error);
            }
        };

        const fetchManagerName = async (managerId) => {
            try {
                const response = await fetch(`http://localhost:3000/api/user/${managerId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const userData = await response.json();
                setManagerName(userData.name);
            } catch (error) {
                console.error('Error fetching manager name:', error);
                setManagerName('Unknown');
            }
        };

        fetchProjectDetails();
    }, [id]);
    // Empty dependency array to run only once when the component mounts

    if (!project) {
        return <div>Loading...</div>;
    }


    const handleReqResourcesOpen = () => {
        setReqResourcesVisible(true);
    };

    const handleReqResourcesClose = () => {
        setReqResourcesVisible(false);
    };

    const handleSaveResources = (requestedResources) => {
        console.log('Requested Resources:', requestedResources);
        setReqResourcesVisible(false);
    };

    const handleSummarize = async () => {
        setLoading(true);
        setError('');
        try {
            console.log("Making request to summarize API");
    
            const response = await fetch('http://localhost:3000/api/aiml/summarize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    projectDetails: project.description,
                }), 
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("Response Data:", data);
    
            setSummary(data.summary);
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while fetching the summary.');
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="ProjDeets">
            <div className="aibtn">
                <button className="withai" onClick={handleSummarize}><i className="tag-icon fa-solid fa-wand-magic-sparkles"></i>Summarize with AI</button>
                {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {summary && (
                <div className="proj-summary">
                    {/* <h5>Summary:</h5> */}
                    <p>{summary}</p>
                </div>
            )}
            </div>
            <div className='proj-title'>{project.name}</div>

            <div className="proj-tags">
                <span className='g-tag'>Status: {project.state}</span>
                {/* Replace project.state with a status label based on your logic */}
                <span className='r-tag'>Requests: Pending</span>
                {/* Commented out or replace with dynamic requests info */}
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
                    <span>{managerName}</span>
                </div>
                <div className="proj-info-items">
                    <div className="info-icon">
                        <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <span>{project.location}</span>
                </div>
                <div className="proj-info-items">
                    <div className="info-icon">
                        <i className="far fa-calendar-alt"></i>
                    </div>
                    <span>{new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}</span>
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
                    {departments.map((dep, index) => (
                    <li key={index}>{dep}</li>
                    ))}
                </div>
            </div>

            <div className="proj-desc">
                <h5>Description:</h5>
                <span>
                    {project.description} 
                </span>
            </div>
            

            {/* <MapComponent /> */}
            {project && project.location && (
                <MapComponent location={project.location} projectName={project.name} />
            )}

            <ReqResources
                isVisible={isReqResourcesVisible}
                onClose={handleReqResourcesClose}
                onSave={handleSaveResources}
            />
        </div>
    )
}

export default ProjDeets