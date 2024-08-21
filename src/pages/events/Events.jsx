import React from 'react'
import './Events.css'
import EventList from '../../components/event/eventlist/EventList'
import EventDeets from '../../components/event/eventdeets/EventDeets'

const Events = () => {
  return (
    <div className="maincon">
    <div className="events-topcon">
        <p className="heading">Events</p>
        <button className="mainbtn"><i className="fa-solid fa-circle-plus"></i> Create new</button>
    </div>

    <div className="events-comp">
        <EventList />
        <EventDeets/>
    </div>
</div>
  )
}

export default Events