import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../UserContext'; // Adjust path as necessary


const Join = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { state, dispatch } = useUser(); // Get state and dispatch from context
  
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
      const res = await fetch('http://localhost:3000/api/department/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',  // Make sure cookies are sent with the request
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      const { user } = data;

      if (user && user.depId) {
        // Update user depId in context
        dispatch({
          type: 'UPDATE_USER',
          payload: { depId: user.depId }
        });
  
        console.log('Dispatched depId:', user.depId);  // Now this should log the correct depId
      }

    } catch (error) {
      console.error('Join error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

    // Use useEffect to navigate when the user's depId is updated
  useEffect(() => {

    console.log('Updated state:', state.user?.depId); // Debug state changes

    if (state.user?.depId) {
      navigate('/dashboard');
    }
  }, [state.user?.depId, navigate]);

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
