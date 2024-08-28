import React from 'react';
import './DepartListCard.css';

const DepartListCard = ({ department, onClick }) => {
  return (
    <div className="departlistcard card" onClick={onClick}>
      <h6 className="depart-name">{department.depName}</h6>
      <div className="departcard-tags">
        <span className='p-tag'>Admin: {department.adminId?.name || 'Unknown Admin'}</span>
        <span className='g-tag'>Projects: {department.projects || 0}</span>
        <span className='b-tag'>Members: {department.members || 0}</span>
      </div>
    </div>
  );
};

export default DepartListCard;
