import React from 'react'
import './Signup.css'
import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import OAuth from '../../components/oauth/OAuth';

const Signup = () => {

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
      console.log(data);
      
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/dashboard');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  
  };

  return (

    <div className="onboardmaincon">
       <div className="onboardcon maincon">
        <div className="projects-topcon">
            <p className="heading">Signup</p>
        </div>

        <form onSubmit={handleSubmit} className=" new-proj-form">
            {/* <div className="input-component card">
                <label>
                    Profile Picture
                </label>
                <input type="file" placeholder="Enter your name" />
            </div> */}
            <div className="input-component card">
                <label>
                    Name
                </label>
                <input type="text" placeholder="Enter your name" id='name' onChange={handleChange}/>
            </div>
            <div className="input-component card">
                <label>
                    Email
                </label>
                <input type="email" placeholder="example@email.com" id='email' onChange={handleChange}/>
            </div>
            <div className="input-component card">
                <label>
                    Password
                </label>
                <input type="password" placeholder="Create a passowrd" id='password' onChange={handleChange}/>
            </div>

            <button disabled={loading} className="btn btn-primary"> {loading ? 'Loading...' : 'Sign-Up'} </button>
        </form>

        <div className="using-google">
            <p>or</p>

            <OAuth/>
            
        </div>

        <div className="divider"></div>
        
        <p className="login-text">Already have an account? <Link to={'/login'}><span className='text-blue-700'> Login </span> </Link> </p>
        
    </div>
    </div>
   

  )
}

export default Signup