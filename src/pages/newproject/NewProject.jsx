import React, { useState } from 'react';
import './NewProject.css';

const NewProject = () => {
    const [location, setLocation] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');

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
        setSelectedLocation(suggestion);
        setSuggestions([]);
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
            <div className="projects-topcon">
                <p className="heading">Create new project</p>
            </div>

            <form className="new-proj-form">
                <div className="input-component card">
                    <label>
                        Title
                    </label>
                    <input type="text" placeholder="Enter project name" />
                </div>
                <div className="input-component card">
                    <label>
                        Description
                    </label>
                    <textarea placeholder="Enter project description" rows={5} />
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
                        <div className="row">
                            <div className="col">
                                <label htmlFor="start-date">
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    id="start-date"
                                    name="start-date"
                                    placeholder="Start Date"
                                />
                            </div>

                            <div className="col">
                                <label htmlFor="end-date">
                                    End Date
                                </label>
                                <input
                                    type="date"
                                    id="end-date"
                                    name="end-date"
                                    placeholder="End Date"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="member-con row ">
                    <div className="sel-manager-con card col">
                        <label>
                            Select a Project Manager
                        </label>

                        <input type="text" placeholder="Search members" id="searchInput" onKeyUp={filterFunction} />

                        <div id="dropdownMenu" className="manager-drop card dropdown-content">
                            <div className="manager-drop-item" htmlFor="member1">
                                <input type="radio" id="member1" name="projectManager" className="member-checkbox" />
                                <span htmlFor="member1">
                                    <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" alt="User Image" className="np-user-img" />
                                    <span className="user-name">Priya Sharma</span>
                                </span>
                            </div>

                            <div className="manager-drop-item" htmlFor="member2">
                                <input type="radio" id="member2" name="projectManager" className="member-checkbox" />
                                <span htmlFor="member2">
                                    <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" alt="User Image" className="np-user-img" />
                                    <span className="user-name">aaaiya Sharma</span>
                                </span>
                            </div>
                            <div className="manager-drop-item" htmlFor="member2">
                                <input type="radio" id="member2" name="projectManager" className="member-checkbox" />
                                <span htmlFor="member2">
                                    <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" alt="User Image" className="np-user-img" />
                                    <span className="user-name">aaaiya Sharma</span>
                                </span>
                            </div>
                            <div className="manager-drop-item" htmlFor="member2">
                                <input type="radio" id="member2" name="projectManager" className="member-checkbox" />
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

                        <input type="text" placeholder="Search members" id="searchInput" onKeyUp={filterFunction} />

                        <div id="dropdownMenu" className="member-drop card dropdown-content">
                            <div className="member-drop-item" htmlFor="member1">
                                <input type="checkbox" id="member1" name="projmembers" className="member-checkbox" />
                                <span htmlFor="member1">
                                    <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" alt="User Image" className="np-user-img" />
                                    <span className="user-name">Priya Sharma</span>
                                </span>
                            </div>
                            <div className="member-drop-item" htmlFor="member1">
                                <input type="checkbox" id="member1" name="projmembers" className="member-checkbox" />
                                <span htmlFor="member1">
                                    <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" alt="User Image" className="np-user-img" />
                                    <span className="user-name">Priya Sharma</span>
                                </span>
                            </div>
                            <div className="member-drop-item" htmlFor="member1">
                                <input type="checkbox" id="member1" name="projmembers" className="member-checkbox" />
                                <span htmlFor="member1">
                                    <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" alt="User Image" className="np-user-img" />
                                    <span className="user-name">Priya Sharma</span>
                                </span>
                            </div>
                            <div className="member-drop-item" htmlFor="member1">
                                <input type="checkbox" id="member1" name="projmembers" className="member-checkbox" />
                                <span htmlFor="member1">
                                    <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" alt="User Image" className="np-user-img" />
                                    <span className="user-name">Priya Sharma</span>
                                </span>
                            </div>
                            <div className="member-drop-item" htmlFor="member1">
                                <input type="checkbox" id="member1" name="projmembers" className="member-checkbox" />
                                <span htmlFor="member1">
                                    <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" alt="User Image" className="np-user-img" />
                                    <span className="user-name">Priya Sharma</span>
                                </span>
                            </div>
                            <div className="member-drop-item" htmlFor="member1">
                                <input type="checkbox" id="member1" name="projmembers" className="member-checkbox" />
                                <span htmlFor="member1">
                                    <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" alt="User Image" className="np-user-img" />
                                    <span className="user-name">Priya Sharma</span>
                                </span>
                            </div>


                        </div>


                    </div>
                </div>

                <button className="creatproj btn btn-primary">Create Project</button>
            </form>
        </div>
    );
};

export default NewProject;