import React from 'react'
import DataCard from '../../components/datacard/DataCard'
import './ShareData.css'

const ShareData = () => {
  return (
    <div className="maincon">
      <div className="data-topcon">
        <p className="heading">Share Data</p>
        <a href="/upload-data">
          <button className="mainbtn"><i className="fa-solid fa-folder-plus tag-icon"></i> Upload new</button>
        </a>
      </div>

      <div className="datacon">
        <DataCard/>
        <DataCard/>
        <DataCard/>
        <DataCard/>
        <DataCard/>
        <DataCard/>
        <DataCard/>
        <DataCard/>
      </div>
    </div>
  )
}

export default ShareData