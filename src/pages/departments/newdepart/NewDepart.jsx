import React, { useState, useEffect } from 'react';
import './NewDepart.css'
import {Link, useNavigate} from 'react-router-dom';

const NewDepart = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [admins, setAdmins] = useState([]);
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

    const fetchAdmins = async () => {
        try {
          console.log("Fetching admins...");
          const res = await fetch('http://localhost:3000/api/user/admins', {
            method: 'GET',
            credentials: 'include',
          });
      
          console.log("Response status:", res.status);
          console.log("Response OK:", res.ok);
      
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
      
          const data = await res.json();
          console.log("Fetched data:", data);
          setAdmins(data);
        } catch (error) {
          console.error("Error fetching admins:", error);
          setError('Failed to fetch admins: ' + error.message);
        }
      };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            // [e.target.name]: e.target.value,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.depName || !formData.depDesc || !formData.adminId) {
            setError('Please fill in all required fields');
            return;
        }
        try {
            setLoading(true);
            const res = await fetch('http://localhost:3000/api/department/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData),
            });
    
            const data = await res.json();
            console.log('Response data:', data);
            
            if (!res.ok) {
                throw new Error(data.message || 'Failed to create department');
            }
    
            setLoading(false);
            setError(null);
            navigate('/root'); //change accordingly
        } catch (error) {
            setLoading(false);
            setError(error.message);
            console.error('Error creating department:', error);
        }
    };

    useEffect(() => {
    fetchAdmins();
    }, []);

  return (
    <div className="maincon">
    <div className="projects-topcon">
        <p className="heading">Create new department</p>
    </div>

    <form onSubmit={handleSubmit} className="new-proj-form">
        <div className="input-component card">
            <label>
                Name
            </label>
            <input type="text" placeholder="Enter name of the department" id='depName' onChange={handleChange}/>
        </div>

        <div className="member-con row ">

        <div className="input-component card col depart-desc-inp">
            <label>
                Description
            </label>
            <textarea placeholder="Enter project description" rows={5} id='depDesc' onChange={handleChange}/>
        </div>



            <div className="sel-manager-con card col">
                <label>
                    Select the Department Admin
                </label>

                <input type="text" placeholder="Search" id="searchInput" onKeyUp={filterFunction} />

                <div id="dropdownMenu" className="manager-drop card dropdown-content">
                    {admins.map((admin) => (
                        <div key={admin._id} className="manager-drop-item">
                        <input
                            type="radio"
                            // id={admin._id}
                            // name="adminId"
                            id = "adminId"
                            value={admin._id}
                            onChange={handleChange}
                            className="member-checkbox"
                        />
                        <label htmlFor={admin._id}>
                            <img src={admin.avatar} alt="User Image" className="np-user-img" />
                            <span className="user-name">{admin.name}</span>
                        </label>
                        </div>
                    ))}
                </div>

            </div>

        </div>

        <button className="creatproj btn btn-primary" disabled={loading}>
                    {loading ? 'Creating...' : 'Create'}
                </button>
    </form>
</div>
  )
}

export default NewDepart