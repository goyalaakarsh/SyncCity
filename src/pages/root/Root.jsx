import React, { useEffect, useState } from 'react';
import DepartDeets from '../../components/department/departdeets/DepartDeets';
import DepartListCard from '../../components/department/departlistcard/DepartListCard';

const Root = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  // Function to fetch departments
  const fetchDepartments = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/department');
      const data = await res.json();
      setDepartments(data.filter(department => department.depName !== 'Root')); // Filter out 'Root'
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

    // Initial fetch when component mounts  
  useEffect(() => {
    fetchDepartments();
  }, []);

  // Function to handle department deletion
  const handleDeleteDepartment = async (deletedId) => {
    try {
      // Optionally, trigger a re-fetch of departments after deletion
      await fetchDepartments();
      setSelectedDepartment(null); // Clear the details view after deletion
    } catch (error) {
      console.error('Error updating departments after deletion:', error);
    }
  };

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
        {selectedDepartment && (
          <DepartDeets
            department={selectedDepartment}
            onDelete={handleDeleteDepartment}
          />
        )}
      </div>
    </div>
  );
}

export default Root;
