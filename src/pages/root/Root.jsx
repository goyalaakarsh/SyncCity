import React from 'react'
import DepartList from '../../components/department/departlist/DepartList'
import DepartDeets from '../../components/department/departdeets/DepartDeets'
import DepartListCard from '../../components/department/departlistcard/DepartListCard'

const Root = () => {
  return (
    <div className="maincon">
    <div className="depart-topcon">
        <p className="heading">Departments</p>
        <a href="/create-department">
            <button className="mainbtn"><i className="fa-solid fa-circle-plus"></i> Create new</button></a>

    </div>

    <div className="depart-comp">
    <div className="departlist">

            <div className="otherdeparts">
                <h5>All Departments</h5>
                <DepartListCard />
                <DepartListCard />
                <DepartListCard />
                <DepartListCard />
                <DepartListCard />
                <DepartListCard />
                <DepartListCard />
            </div>
        </div>
        <DepartDeets />
    </div>
</div>
  )
}

export default Root