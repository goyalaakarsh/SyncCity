import React from 'react';
import './Login.css';
import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import OAuth from '../../components/oauth/OAuth';

const Login = () => {

    const [formData, setFormData] = useState({});
    // const {loading, error} = useSelector((state) => state.user);
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
          console.error('Login failed:', data.message);
          return;
        }
    
        if (data.role === 0) {
          navigate('/root');
        } else {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    };
    
    
    return (
      <div className='onboardmaincon'>
                <div className="onboardcon maincon">
            <div className="projects-topcon">
                <p className="heading">Login</p>
            </div>

            <form onSubmit={handleSubmit} className=" new-proj-form">
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
                    <input type="password" placeholder="Enter your passowrd" id='password' onChange={handleChange}/>
                </div>

                <button className="btn btn-primary"> Login </button>

                <div className="using-google">
                    <p>or</p>

                    <OAuth/>
                </div>

                <div className="divider"></div>

                {/* <p className="login-text">Didn't have an account? <a href="/signup">Signup</a></p> */}
                <p className="login-text">Didn't have an account? <Link to={'/signup'}> <span className='text-blue-700'> Signup </span> </Link> </p>

            </form>

        </div>
      </div>
    )
}

export default Login