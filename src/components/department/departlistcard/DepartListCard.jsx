import React from 'react'
import './DepartListCard.css'

const DepartListCard = () => {
    return (

        <div className='departlistcard card'>
            <h6 className="depart-name">Name of your Department</h6>
            <div className="departcard-tags">
                <span className='p-tag'>Admin: Aakarsh Goyal</span>
                <span className='g-tag'>Projects: 5</span>
                <span className='b-tag'>Members: 100</span>
            </div>
        </div>


    )
}

export default DepartListCard