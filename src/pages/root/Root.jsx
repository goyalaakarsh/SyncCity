import React, { useEffect, useState } from 'react';
import DepartDeets from '../../components/department/departdeets/DepartDeets';
import DepartListCard from '../../components/department/departlistcard/DepartListCard';

const Root = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  useEffect(() => {
    // Fetch departments from the API
    const fetchDepartments = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/department'); // Adjust API endpoint
        const data = await res.json();
        
        const filteredDepartments = data.filter(department => department.depName !== 'Root');
        setDepartments(filteredDepartments);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div className="maincon">
      <div className="depart-topcon">
        <p className="heading">Departments</p>
        <a href="/create-department">
          <button className="mainbtn"><i className="fa-solid fa-circle-plus"></i> Create new</button>
        </a>
      </div>

      <div className="depart-comp">
        <div className="departlist">
          <div className="otherdeparts">
            <h5>All Departments</h5>
            {departments.map(department => (
              <DepartListCard
                key={department._id}
                department={department}
                onClick={() => setSelectedDepartment(department)}
              />
            ))}
          </div>
        </div>
        {selectedDepartment && <DepartDeets department={selectedDepartment} />}
      </div>
    </div>
  );
}

export default Root;
