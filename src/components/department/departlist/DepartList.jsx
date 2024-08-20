import React from 'react'
import './DepartList.css'
import DepartListCard from '../departlistcard/DepartListCard'

const DepartList = () => {
    return (
        <div className="departlist">
            <div className="yourdepart">
                <h5>Your Department</h5>
                <DepartListCard />
            </div>

            <div className="otherdeparts">
                <h5>Other Departments</h5>
                <DepartListCard />
                <DepartListCard />
                <DepartListCard />
                <DepartListCard />
                <DepartListCard />
                <DepartListCard />
                <DepartListCard />
            </div>
        </div>
    )
}

export default DepartList