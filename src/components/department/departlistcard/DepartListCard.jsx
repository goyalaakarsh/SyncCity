import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DepartListCard.css';

const DepartListCard = ({ department, onClick }) => {
  const [adminName, setAdminName] = useState('Unknown Admin');
  const [members, setMembers] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchAdmin = async () => {
      if (department.adminId) {
        try {
          const response = await fetch(`http://localhost:3000/api/user/${department.adminId}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            }
          });

          if (response.ok) {
            const adminData = await response.json();
            setAdminName(adminData.name);
          } else {
            setAdminName('Unknown Admin');
          }
        } catch (error) {
          console.error('Error fetching admin details:', error);
          setAdminName('Unknown Admin');
        }
      }
    };

    
    // Fetch all members of the department
    const fetchMembers = async () => {
      try {
        console.log(department._id);
        
        const response = await axios.post('http://localhost:3000/api/department/members-by-department', {
          departmentId: department._id,  // Send department IDs in the body
        }, {
          withCredentials: true,  // To include credentials (cookies, etc.)
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // if (response.ok) {
          const membersData = response;
          console.log(membersData);
          
          setMembers(membersData.data);
        // } else {
        //   console.error('Failed to fetch department members');
        // }
        
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };



    // Fetch all projects of the department
    const fetchProjects = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/department/projects-by-department', {
          departmentId: department._id,  // Send department IDs in the body
        }, {
          withCredentials: true,  // To include credentials (cookies, etc.)
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // if (response.ok) {
          const projectsData = response;
          setProjects(projectsData.data);
        // } else {
        //   console.error('Failed to fetch department projects');
        // }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchAdmin();
    fetchMembers();
    fetchProjects();


  }, [department._id, department.adminId]);

  return (
    <div className="departlistcard card" onClick={onClick}>
      <h6 className="depart-name">{department.depName}</h6>
      <div className="departcard-tags">
        <span className='p-tag'>Admin: {adminName}</span>
        <span className='g-tag'>Projects: {projects.length || 0}</span>
        <span className='b-tag'>Members: {members.length || 0}</span>
      </div>
    </div>
  );
};

export default DepartListCard;