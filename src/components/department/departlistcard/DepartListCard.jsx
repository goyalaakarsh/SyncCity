import React, { useState, useEffect } from 'react';
import './DepartListCard.css';

const DepartListCard = ({ department, onClick }) => {
  const [adminName, setAdminName] = useState('Unknown Admin');

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

    fetchAdmin();
  }, [department.adminId]);

  return (
    <div className="departlistcard card" onClick={onClick}>
      <h6 className="depart-name">{department.depName}</h6>
      <div className="departcard-tags">
        <span className='p-tag'>Admin: {adminName}</span>
        <span className='g-tag'>Projects: {department.projects || 0}</span>
        <span className='b-tag'>Members: {department.members || 0}</span>
      </div>
    </div>
  );
};

export default DepartListCard;