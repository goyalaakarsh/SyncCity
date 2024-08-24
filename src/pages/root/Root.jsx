import React from 'react'
import DepartList from '../../components/department/departlist/DepartList'
import DepartDeets from '../../components/department/departdeets/DepartDeets'

const Root = () => {
  return (
    <div className="maincon">
    <div className="depart-topcon">
        <p className="heading">Departments</p>
        <a href="/create-department">
            <button className="mainbtn"><i className="fa-solid fa-circle-plus"></i> Create new</button></a>

    </div>

    <div className="depart-comp">
        <DepartList />
        <DepartDeets />
    </div>
</div>
  )
}

export default Root