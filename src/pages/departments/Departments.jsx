import React from 'react'
import './Departments.css'
import DepartList from '../../components/department/departlist/DepartList'
import DepartDeets from '../../components/department/departdeets/DepartDeets'

const Departments = () => {
    return (
        <div className="maincon">
            <div className="depart-topcon">
                <p className="heading">Departments</p>
            </div>

            <div className="depart-comp">
                <DepartList />
                <DepartDeets/>
            </div>
        </div>

    )
}

export default Departments