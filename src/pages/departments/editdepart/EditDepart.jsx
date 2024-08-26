import React, { useState, useEffect } from 'react';
import '../newdepart/NewDepart.css';
import {Link, useNavigate, useParams} from 'react-router-dom';

const EditDepart = () => {

    const { id } = useParams(); // Extract department ID from URL

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        depName: '',
        depDesc: '',
        adminId: '',
        avatar: '',
    });
  
    console.log(formData);

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

    useEffect(() => {
        // Fetch the existing department data when the component mounts
        const fetchDepartment = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/department/${id}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || 'Failed to fetch department');
                }
                setFormData({
                    depName: data.depName,
                    depDesc: data.depDesc,
                    adminId: data.adminId,
                    avatar: data.avatar,
                });
            } catch (error) {
                setError(error.message);
            }
        };

        fetchDepartment();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.id]: e.target.value,
        })
    };

    const handleAdminChange = (e) => {
        setFormData({
            ...formData,
            adminId: e.target.value, // Update adminId based on selection
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch(`http://localhost:3000/api/department/update/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            console.log(data);
            
            if (data.success === false) {
                setLoading(false);
                setError(data.message);
                return;
            }

            if (!res.ok) {
                throw new Error(data.message || 'Failed to update department');
            }

            setLoading(false);
            setError(null);
            // navigate(`/departments/${id}`); //go to the edited dep page, does make sense since root doesnt care
            navigate('/root'); //go back to root page
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };

  return (
    <div className="maincon">
    <div className="projects-topcon">
        <p className="heading">Edit Department</p>
    </div>

    <form onSubmit={handleSubmit} className="new-proj-form">
        <div className="input-component card">
            <label>
                Name
            </label>
            <input type="text" placeholder="Enter name of the department" id='depName' value={formData.depName} onChange={handleChange}/>
        </div>

        <div className="member-con row ">

        <div className="input-component card col depart-desc-inp">
            <label>
                Description
            </label>
            <textarea placeholder="Enter project description" rows={5} id='depDesc' value={formData.depDesc} onChange={handleChange}/>
        </div>



            <div className="sel-manager-con card col">
                <label>
                    Select the Department Admin
                </label>

                <input type="text" placeholder="Search" id="searchInput" onKeyUp={filterFunction} />

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

        </div>

        <button className="creatproj btn btn-primary" disabled={loading}>
            {loading ? 'Updating...' : 'Edit'}
        </button>

        {error && <p className="error">{error}</p>}

    </form>
</div>
  )
};

export default EditDepart