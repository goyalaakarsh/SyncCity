import React from 'react'
import './Login.css'

const Login = () => {
    return (
        <div className="onboardcon maincon">
            <div className="projects-topcon">
                <p className="heading">Login</p>
            </div>

            <form className=" new-proj-form">
                <div className="input-component card">
                    <label>
                        Email
                    </label>
                    <input type="email" placeholder="example@email.com" />
                </div>
                <div className="input-component card">
                    <label>
                        Password
                    </label>
                    <input type="password" placeholder="Enter your passowrd" />
                </div>

                <button className="btn btn-primary">Login</button>

                <div className="using-google">
                    <p>or</p>

                    <p className='mainbtn googlebtn'><i className="fa-brands fa-google tag-icon"></i> Login with Google </p>
                </div>

                <div className="divider"></div>

                <p className="login-text">Didn't have an account? <a href="/signup">Signup</a></p>
            </form>

        </div>
    )
}

export default Login