import React, { useState } from 'react';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../../components/oauth/OAuth';
import { useUser } from '../../UserContext'; // Update the path as needed

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useUser();
  
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
      const res = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
      
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }

      // // Update global user state
      // dispatch({ type: 'LOGIN', payload: data });

      setLoading(false);
      // navigate('/dashboard');
      navigate('/login');
    } catch (error) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="onboardmaincon">
      <div className="onboardcon maincon">
        <div className="projects-topcon">
          <p className="heading">Signup</p>
        </div>

        <form onSubmit={handleSubmit} className="new-proj-form">
          <div className="input-component card">
            <label>Name</label>
            <input type="text" placeholder="Enter your name" id='name' onChange={handleChange}/>
          </div>
          <div className="input-component card">
            <label>Email</label>
            <input type="email" placeholder="example@email.com" id='email' onChange={handleChange}/>
          </div>
          <div className="input-component card">
            <label>Password</label>
            <input type="password" placeholder="Create a password" id='password' onChange={handleChange}/>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button disabled={loading} className="btn btn-primary">
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
        </form>

        <div className="using-google">
          <p>or</p>
          <OAuth/>
        </div>

        <div className="divider"></div>
        
        <p className="login-text">Already have an account? <Link to={'/login'}><span className='text-blue-700'>Login</span></Link></p>
      </div>
    </div>
  );
};

export default Signup;