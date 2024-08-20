import React from 'react'
import './EventListCard.css'

const EventListCard = () => {
    return (
        <div className='eventlistcard card'>
            <h6 className="event-name">Name of the event</h6>
            <div className="eventcard-tags">
                <span className='p-tag'>
                    <i className="tag-icon far fa-calendar-alt"></i>
                    <span>20/08/2024 - 23/09/2027</span>
                </span>
            </div>
        </div>
    )
}

export default EventListCard