import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../../components/oauth/OAuth';
import { useUser } from '../../UserContext'; // Update the path as needed

const Login = () => {
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
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      const data = await res.json();
      console.log(data);

      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      
      // Update global user state
      const normalizedUserData = {
        id: data._id || data.id,
        name: data.name,
        email: data.email,
        role: data.role,
        depId: data.depId,
        avatar: data.avatar,
        // Add any other fields you need
      };

      console.log(normalizedUserData);

      dispatch({ type: 'LOGIN', payload: normalizedUserData });


      setLoading(false);
      if (data.role === 0) {
        navigate('/root');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className='onboardmaincon'>
      <div className="onboardcon maincon">
        <div className="projects-topcon">
          <p className="heading">Login</p>
        </div>

        <form onSubmit={handleSubmit} className="new-proj-form">
          <div className="input-component card">
            <label>Email</label>
            <input type="email" placeholder="example@email.com" id='email' onChange={handleChange}/>
          </div>
          <div className="input-component card">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" id='password' onChange={handleChange}/>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button className="btn btn-primary" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>

          <div className="using-google">
            <p>or</p>
            <OAuth/>
          </div>

          <div className="divider"></div>

          <p className="login-text">Don't have an account? <Link to={'/signup'}><span className='text-blue-700'>Signup</span></Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;