import React, { useState } from 'react';
import './NewProject.css';
import {Link, useNavigate} from 'react-router-dom';


const NewProject = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [projectManager, setProjectManager] = useState('');
    const [members, setMembers] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [state, setState] = useState(''); // Add this
    const [depId, setDepId] = useState(''); // Add this
    const [managerId, setManagerId] = useState(''); // Assuming this represents project manager
    const navigate = useNavigate();


    const handleInputChange = async (e) => {
        const query = e.target.value;
        setLocation(query);

        if (query.length < 3) {
            setSuggestions([]);
            return;
        }

        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&countrycodes=IN&format=json&addressdetails=1`);
            const data = await response.json();
            setSuggestions(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setLocation(suggestion.display_name);
        setSuggestions([]);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const projectData = {
            name: name,
            description: description,
            location: location,
            startDate: startDate,
            endDate: endDate,
            state: 0,
            depId: depId || '66c968135c51c93d0dea604e',
            managerId: managerId || undefined, // Avoid sending empty string
        };


        // console.log(projectData);

        try {
            const response = await fetch('http://localhost:3000/api/project/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(projectData),
            });

            if (response.ok) {
                const createdProject = await response.json();
                console.log('Project created:', createdProject);
                // Optionally redirect or show success message
            } else {
                console.error('Failed to create project');
            }
        } catch (error) {
            console.error('Error:', error);
        }

        navigate('/projects'); //change accordingly
    };

    function filterFunction() {
        const input = document.getElementById("searchInput");
        const filter = input.value.toUpperCase();
        const dropdown = document.getElementById("dropdownMenu");
        const items = dropdown.getElementsByClassName("manager-drop-item");

        for (let i = 0; i < items.length; i++) {
            const label = items[i].getElementsByClassName("user-name")[0];
            if (label.textContent.toUpperCase().indexOf(filter) > -1) {
                items[i].style.display = "";
            } else {
                items[i].style.display = "none";
            }
        }
    }


    return (
        <div className="maincon">
            <div className="newprojects-topcon">
                <p className="heading">Create new project</p>
            </div>

            <form className="new-proj-form" noValidate>
                <div className="input-component card">
                    <label>Title</label>
                    <input 
                        type="text" 
                        placeholder="Enter project name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required 
                    />
                </div>

                <div className="input-component card">
                    <label>Description</label>
                    <textarea 
                        placeholder="Enter project description" 
                        rows={5} 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div className="loc-date-con row">
                    <div className="input-component card col">
                        <label>
                            Location
                        </label>
                        <input
                            type="text"
                            placeholder="Enter location"
                            value={location}
                            onChange={handleInputChange}
                            required
                        />
                        {suggestions.length > 0 && (
                            <div className="autocomplete-suggestions">
                                {suggestions.map((suggestion) => (
                                    <div
                                        key={suggestion.place_id}
                                        className="autocomplete-suggestion"
                                        onClick={() => handleSuggestionClick(suggestion)}
                                    >
                                        {suggestion.display_name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="input-component card col">
                        <label>Start Date</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-component card col">
                        <label>End Date</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="member-con row ">
                    <div className="sel-manager-con card col">
                        <label>
                            Add Departments to this project
                        </label>

                        <input type="text" placeholder="Search members" id="searchInput" onKeyUp={filterFunction} required/>

                        <div id="dropdownMenu" className="manager-drop card dropdown-content">
                            <div className="manager-drop-item" htmlFor="member1">
                                <input type="radio" id="member1" name="projectManager" className="member-checkbox" required/>
                                <span htmlFor="member1">
                                    <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" alt="User Image" className="np-user-img" />
                                    <span className="user-name">Priya Sharma</span>
                                </span>
                            </div>

                            <div className="manager-drop-item" htmlFor="member2">
                                <input type="radio" id="member2" name="projectManager" className="member-checkbox" required/>
                                <span htmlFor="member2">
                                    <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" alt="User Image" className="np-user-img" />
                                    <span className="user-name">aaaiya Sharma</span>
                                </span>
                            </div>
                            <div className="manager-drop-item" htmlFor="member2">
                                <input type="radio" id="member2" name="projectManager" className="member-checkbox" required/>
                                <span htmlFor="member2">
                                    <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" alt="User Image" className="np-user-img" />
                                    <span className="user-name">aaaiya Sharma</span>
                                </span>
                            </div>
                            <div className="manager-drop-item" htmlFor="member2">
                                <input type="radio" id="member2" name="projectManager" className="member-checkbox" required/>
                                <span htmlFor="member2">
                                    <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" alt="User Image" className="np-user-img" />
                                    <span className="user-name">aaaiya Sharma</span>
                                </span>
                            </div>

                        </div>

                    </div>
                    <div className="sel-manager-con card col">
                        <label>
                            Select a Project Manager
                        </label>

                        <input type="text" placeholder="Search members" id="searchInput" onKeyUp={filterFunction} required/>

                        <div id="dropdownMenu" className="manager-drop card dropdown-content">
                            <div className="manager-drop-item" htmlFor="member1">
                                <input type="radio" id="member1" name="projectManager" className="member-checkbox" required/>
                                <span htmlFor="member1">
                                    <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" alt="User Image" className="np-user-img" />
                                    <span className="user-name">Priya Sharma</span>
                                </span>
                            </div>

                            <div className="manager-drop-item" htmlFor="member2">
                                <input type="radio" id="member2" name="projectManager" className="member-checkbox" required/>
                                <span htmlFor="member2">
                                    <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" alt="User Image" className="np-user-img" />
                                    <span className="user-name">aaaiya Sharma</span>
                                </span>
                            </div>
                            <div className="manager-drop-item" htmlFor="member2">
                                <input type="radio" id="member2" name="projectManager" className="member-checkbox" required/>
                                <span htmlFor="member2">
                                    <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" alt="User Image" className="np-user-img" />
                                    <span className="user-name">aaaiya Sharma</span>
                                </span>
                            </div>
                            <div className="manager-drop-item" htmlFor="member2">
                                <input type="radio" id="member2" name="projectManager" className="member-checkbox" required/>
                                <span htmlFor="member2">
                                    <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" alt="User Image" className="np-user-img" />
                                    <span className="user-name">aaaiya Sharma</span>
                                </span>
                            </div>

                        </div>

                    </div>


                    <div className="sel-mem-con card col">
                        <label>
                            Add members to this Project
                        </label>

                        <input type="text" placeholder="Search members" id="searchInput" onKeyUp={filterFunction} required/>

                        <div id="dropdownMenu" className="member-drop card dropdown-content">
                            <div className="member-drop-item" htmlFor="member1">
                                <input type="checkbox" id="member1" name="projmembers" className="member-checkbox" required/>
                                <span htmlFor="member1">
                                    <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" alt="User Image" className="np-user-img" />
                                    <span className="user-name">Priya Sharma</span>
                                </span>
                            </div>
                            <div className="member-drop-item" htmlFor="member1">
                                <input type="checkbox" id="member1" name="projmembers" className="member-checkbox" required/>
                                <span htmlFor="member1">
                                    <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" alt="User Image" className="np-user-img" />
                                    <span className="user-name">Priya Sharma</span>
                                </span>
                            </div>
                            <div className="member-drop-item" htmlFor="member1">
                                <input type="checkbox" id="member1" name="projmembers" className="member-checkbox" required/>
                                <span htmlFor="member1">
                                    <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" alt="User Image" className="np-user-img" />
                                    <span className="user-name">Priya Sharma</span>
                                </span>
                            </div>
                            <div className="member-drop-item" htmlFor="member1">
                                <input type="checkbox" id="member1" name="projmembers" className="member-checkbox" required/>
                                <span htmlFor="member1">
                                    <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" alt="User Image" className="np-user-img" />
                                    <span className="user-name">Priya Sharma</span>
                                </span>
                            </div>
                            <div className="member-drop-item" htmlFor="member1">
                                <input type="checkbox" id="member1" name="projmembers" className="member-checkbox" required/>
                                <span htmlFor="member1">
                                    <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" alt="User Image" className="np-user-img" />
                                    <span className="user-name">Priya Sharma</span>
                                </span>
                            </div>
                            <div className="member-drop-item" htmlFor="member1">
                                <input type="checkbox" id="member1" name="projmembers" className="member-checkbox" required/>
                                <span htmlFor="member1">
                                    <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" alt="User Image" className="np-user-img" />
                                    <span className="user-name">Priya Sharma</span>
                                </span>
                            </div>


                        </div>


                    </div>
                </div>

                <button className="creatproj btn btn-primary" onClick={handleFormSubmit}>Create Project</button>
            </form>
        </div>
    );
};

export default NewProject;