import React from 'react'
import './Signup.css'

const Signup = () => {
    return (
        <div className="onboardcon maincon">
            <div className="projects-topcon">
                <p className="heading">Signup</p>
            </div>

            <form className=" new-proj-form">
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
                    <input type="text" placeholder="Enter your name" />
                </div>
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
                    <input type="password" placeholder="Choose a passowrd" />
                </div>

                <button className="btn btn-primary">Signup</button>
            </form>

            <div className="using-google">
                <p>or</p>

                <p className='mainbtn googlebtn'><i className="fa-brands fa-google tag-icon"></i> Signup with Google </p>
            </div>

            <div className="divider"></div>

            <p className="login-text">Already have an account? <a href="/login">Login</a></p>

        </div>

    )
}

export default Signup