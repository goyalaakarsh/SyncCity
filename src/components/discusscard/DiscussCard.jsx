import React from 'react';
import './DiscussCard.css';

export const DiscussCard = ({ channel, onClick }) => {
    return (
        <div className="discuss-card card" onClick={() => onClick(channel.channel_url)}>
            <div className="discusscard-pfp">
                <img
                    className='discuss-pfp'
                    src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
                    alt="Profile"
                />
            </div>

            <div className="discusscard-name">
                <h6 className='discuss-name'>{channel.name}</h6> {/* Display the channel name */}
                {/* <span className="b-tag">{channel.isGroupChannel() ? 'Group' : 'One-to-One'}</span> Display channel type */}
            </div>
        </div>
    );
};
