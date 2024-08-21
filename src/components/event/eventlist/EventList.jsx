import React from 'react'
import './EventList.css'
import EventListCard from '../eventlistcard/EventListCard'

const EventList = () => {
    return (
        <div className="eventlist">
            <div className="upcomingevents">
                <span className="task-cat-tag y-tag">
                    <i className="tag-icon fa-regular fa-circle-dot"></i>
                    <span>Upcoming</span>
                </span>
                <EventListCard />
                <EventListCard />
                <EventListCard />
                <EventListCard />
            </div>

            <div className="conductedevents">
                <span className="task-cat-tag g-tag">
                    <i className="tag-icon fa-solid fa-circle-check"></i>
                    <span>Conducted</span>
                </span>

                <EventListCard />
                <EventListCard />
                <EventListCard />
                <EventListCard />
                <EventListCard />
            </div>

        </div>
    )
}

export default EventList