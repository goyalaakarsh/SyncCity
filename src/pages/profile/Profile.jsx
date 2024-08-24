import React from 'react'
import './Profile.css'

const Profile = () => {
  return (
    <div className="maincon">
      <div className="profile-topcon">
        <p className="heading">Profile</p>

      </div>

      <div className="profile-deets">
        <div className="departinfo">
          <img className='departlogo' src="https://media.istockphoto.com/id/866715034/vector/entrepreneurs-and-business-people-conference-in-modern-meeting-room.jpg?s=612x612&w=0&k=20&c=HViAYHb_7ZXDuoWEM113lHzShRMBFShmHw2LbuwhNJA=" alt="" />
          <h5 className="departname">Name</h5>
          <button className="discussbtn mainbtn"><i className="fa-solid fa-envelope"></i>example@syncity.com</button>

          <div className="prof-actions ">
            <button className="btn btn-primary "> Edit</button>
            <button className="btn btn-danger "> Log out</button>
          </div>



        </div>

      </div>
    </div>
  )
}

export default Profile