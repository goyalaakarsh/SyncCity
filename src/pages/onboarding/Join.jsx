import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Join = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch('http://localhost:3000/api/departments/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Navigate to the dashboard on successful join
      navigate('/dashboard');
    } catch (error) {
      console.error('Join error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='onboardmaincon'>
      <div className="maincon joincon onboardcon ">
        <div className="projects-topcon">
          <p className="heading">Join a Department</p>
        </div>

        <form onSubmit={handleSubmit} className="new-proj-form">
          <div className="input-component card">
            <label>
              Department Code
            </label>
            <input 
              type="text" 
              placeholder="Enter the code of your department" 
              id='departmentCode' 
              onChange={handleChange} 
              required 
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button className="btn btn-primary" disabled={loading}>
            {loading ? 'Joining...' : 'Join'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Join;
