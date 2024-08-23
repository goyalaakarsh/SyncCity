import React from 'react'
import './DiscussCard.css'

export const DiscussCard = () => {
    return (
        <div className="discuss-card card">

            <div className="discusscard-pfp">
                <img
                    className='discuss-pfp'
                    src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
                    alt="Profile"
                />
            </div>


            <div className="discusscard-name">
                <h6 className='discuss-name'>Name</h6>
                <span className="b-tag">One-to-One</span>
            </div>


        </div>
    )
}
