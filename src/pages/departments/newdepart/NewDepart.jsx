import React, { useState } from 'react';
import './NewDepart.css'
import {Link, useNavigate} from 'react-router-dom';

const NewDepart = () => {

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

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.id]: e.target.value,
        })
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          setLoading(true);
          const res = await fetch('http://localhost:3000/api/department/create', {
            method: 'POST',
            headers: {
              'Content-Type' : 'application/json',
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
          setLoading(false);
          setError(null);
          navigate('/'); //change accordingly
        } catch (error) {
          setLoading(false);
          setError(error.message);
        }
      
      };

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

        <button className="creatproj btn btn-primary">Create Department</button>
    </form>
</div>
  )
}

export default NewDepart