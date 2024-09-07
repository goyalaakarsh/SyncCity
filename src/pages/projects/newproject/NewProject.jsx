import React, { useState, useEffect } from 'react';
import './NewProject.css';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

const NewProject = () => {
    const [departments, setDepartments] = useState([]);
    const [members, setMembers] = useState([]);
    const [selectedDepartments, setSelectedDepartments] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([]);
    // const [selectedManager, setSelectedManager] = useState('');
    const [managerId, setManagerId] = useState('66c89c4ca55b8e6d57574695'); // Default manager
    const [projectData, setProjectData] = useState({
        name: '',
        description: '',
        location: '',
        startDate: '',
        endDate: ''
    });
    const navigate = useNavigate();
    const [location, setLocation] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    console.log("project data", projectData);
    // console.log("project data to submit", projectDataToSubmit);


      // Fetch all departments on mount
    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/department');
                setDepartments(response.data);
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };
        fetchDepartments();
    }, []);

    // Fetch members based on selected departments
    useEffect(() => {
        if (selectedDepartments.length > 0) {
            const fetchMembers = async () => {
                try {
                    const response = await axios.post('http://localhost:3000/api/department/members-by-departments', {
                        departmentIds: selectedDepartments
                    });
                    setMembers(response.data);
                } catch (error) {
                    console.error('Error fetching members:', error);
                }
            };

            fetchMembers();
        }
    }, [selectedDepartments]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDepartmentSelection = (event) => {
        const { value, checked } = event.target;
        setSelectedDepartments((prevSelectedDepartments) =>
          checked
            ? [...prevSelectedDepartments, value]
            : prevSelectedDepartments.filter((depId) => depId !== value)
        );
      };

        // Handle member selection
    const handleMemberSelection = (event) => {
        const { value, checked } = event.target;
        setSelectedMembers((prevSelectedMembers) =>
        checked
            ? [...prevSelectedMembers, value]
            : prevSelectedMembers.filter((memberId) => memberId !== value)
        );
    };

      // Handle manager selection
    const handleManagerSelection = (event) => {
        setManagerId(event.target.value);
    };

    const handleInputChange = async (e) => {
        const query = e.target.value;
        setProjectData(prevData => ({
            ...prevData,
            location: query  // Update location inside projectData
        }));
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
        const selectedLocation = suggestion.display_name;
        setLocation(selectedLocation);  // Update location state used in input field
        setProjectData(prevData => ({
            ...prevData,
            location: selectedLocation  // Update projectData
        }));
        setSuggestions([]);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const projectDataToSubmit = {
            location, // Include location here
            ...projectData,
            state: 0,
            depId: selectedDepartments,
            managerId: managerId || '66c89c4ca55b8e6d57574695',
            members: selectedMembers
        };

        console.log("project data to submit: ", projectDataToSubmit);

        try {
            const response = await fetch('http://localhost:3000/api/project/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(projectDataToSubmit),
            });

            if (response.ok) {
                const createdProject = await response.json();
                console.log('Project created:', createdProject);

                // After the project is created, update the projectId array for manager and members
                const projectId = createdProject._id; // Assuming the created project ID is in the response

                // Combine the selected members and manager ID into one array
                const usersToUpdate = [...selectedMembers, managerId];

                // Make a separate request to update the projectId array for the selected users
                await axios.post('http://localhost:3000/api/user/assignProject', {
                    projectId: projectId,
                    userIds: usersToUpdate
                }, { withCredentials: true });

                console.log('Users successfully updated with project ID');
                
                navigate('/projects'); // Optionally redirect or show success message
                // Optionally redirect or show success message
            } else {
                console.error('Failed to create project');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const filterFunction = (dropdownId) => {
        const input = document.getElementById(`searchInput-${dropdownId}`);
        const filter = input.value.toUpperCase();
        const dropdown = document.getElementById(`dropdownMenu-${dropdownId}`);
        const items = dropdown.getElementsByClassName("drop-item");

        for (let i = 0; i < items.length; i++) {
            const label = items[i].getElementsByClassName("user-name")[0];
            if (label.textContent.toUpperCase().indexOf(filter) > -1) {
                items[i].style.display = "";
            } else {
                items[i].style.display = "none";
            }
        }
    };

    return (
        <div className="maincon">
            <div className="newprojects-topcon">
                <p className="heading">Create new project</p>
            </div>

            <form className="new-proj-form" noValidate onSubmit={handleFormSubmit}>
                <div className="input-component card">
                    <label>Title</label>
                    <input
                        type="text"
                        placeholder="Enter project name"
                        name="name"
                        value={projectData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-component card">
                    <label>Description</label>
                    <textarea
                        placeholder="Enter project description"
                        rows={5}
                        name="description"
                        value={projectData.description}
                        onChange={handleChange}
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
                            name="startDate"
                            value={projectData.startDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-component card col">
                        <label>End Date</label>
                        <input
                            type="date"
                            name="endDate"
                            value={projectData.endDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="member-con row ">
                    <div className="sel-manager-con card col">
                        <label>Add Departments to this project</label>
                        <input
                            type="text"
                            placeholder="Search Departments"
                            id="searchInput-department"
                            onKeyUp={() => filterFunction('department')}
                            required
                        />
                        <div id="dropdownMenu-department" className="manager-drop card dropdown-content">
                            {departments.map((department) => (
                                <div key={department._id} className="drop-item">
                                    <input
                                        type="checkbox"
                                        value={department._id}
                                        onChange={handleDepartmentSelection}
                                        className="member-checkbox"
                                    />
                                    <span className="user-name">{department.depName}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="sel-manager-con card col">
                        <label>Select a Project Manager</label>
                        <input
                            type="text"
                            placeholder="Search members"
                            id="searchInput-manager"
                            onKeyUp={() => filterFunction('manager')}
                            required
                        />
                        <div id="dropdownMenu-manager" className="manager-drop card dropdown-content">
                            {members.map((member) => (
                                <div key={member._id} className="drop-item">
                                    <input
                                        type="radio"
                                        value={member._id}
                                        name="projectManager"
                                        onChange={handleManagerSelection}
                                        className="member-checkbox"
                                    />
                                    <span className="user-name">{member.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="sel-mem-con card col">
                        <label>Add members to this Project</label>
                        <input
                            type="text"
                            placeholder="Search members"
                            id="searchInput-members"
                            onKeyUp={() => filterFunction('members')}
                            required
                        />
                        <div id="dropdownMenu-members" className="member-drop card dropdown-content">
                            {members.map((member) => (
                                <div key={member._id} className="drop-item">
                                    <input
                                        type="checkbox"
                                        value={member._id}
                                        onChange={handleMemberSelection}
                                        className="member-checkbox"
                                    />
                                    <span className="user-name">{member.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <button className="creatproj btn btn-primary" type="submit">Create Project</button>
                {/* <button className="creatproj btn btn-primary" onClick={handleFormSubmit}>Create Project</button> */}
            </form>
        </div>
    );
};

export default NewProject;