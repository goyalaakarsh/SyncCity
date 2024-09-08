import React, { useEffect, useState } from 'react';
import './Profile.css';
import { useUser } from '../../UserContext'; // Update the path as needed
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const { state: { user }, dispatch } = useUser();
  const navigate = useNavigate();

  const [departmentName, setDepartmentName] = useState('');

  useEffect(() => {
    if (user.depId) {
      // Fetch the department name based on depId
      axios.get(`http://localhost:3000/api/department/${user.depId}`)
        .then(response => {
          setDepartmentName(response.data.depName); // Assuming depName is the field for the department name
        })
        .catch(error => {
          console.error('Error fetching department details:', error);
        });
    }
  }, [user.depId]);

  // You can now use user.id
  console.log('User ID:', user.id);

  const handleLogout = () => {
    // Perform any logout actions (e.g., clearing cookies)
    // Then dispatch the logout action
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="maincon">
      <div className="profile-topcon">
        <p className="heading">Profile</p>
      </div>

      <div className="profile-deets">
        <div className="departinfo">
          <img className='departlogo' src={user.profilePicture || "https://media.istockphoto.com/id/866715034/vector/entrepreneurs-and-business-people-conference-in-modern-meeting-room.jpg?s=612x612&w=0&k=20&c=HViAYHb_7ZXDuoWEM113lHzShRMBFShmHw2LbuwhNJA="} alt="Profile" />
          <h5 className="departname">{user.name}</h5>
          <button className="discussbtn mainbtn">
            <i className="fa-solid fa-envelope"></i>{user.email}
          </button>
          <button className="discussbtn mainbtn">
            {/* <i className="fa-solid fa-building"></i>{user.depId} */}
            <i className="fa-solid fa-building"></i>{departmentName || 'Fetching department...'}
          </button>

          <div className="prof-actions">
            <button className="btn btn-primary">Edit</button>
            <button className="btn btn-danger" onClick={handleLogout}>Log out</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;