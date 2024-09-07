  import React from 'react'
  import './Notifications.css'

  const Notifications = () => {
    return (
      <div className="notifcon maincon">
        <div className="notif-topcon">
          <p className="heading">Requests</p>
          <a href="/inventory">
          <button className="mainbtn"><i className="tag-icon fa-solid fa-warehouse"></i>Inventory</button>
          </a>
    
        </div>

        <div className="notif-list">
          <div className="notif-item card">
            <h5>By Project A</h5>

            <div className="req-list-head">
                <h6>Resources</h6>
                <h6>Requested</h6>
                <h6>Available</h6>
                <h6>Alloted</h6>
              </div>
            <div className="req-list">

              <div className="req-list-item">
                <p>Nalle Engineer</p>
                <p>10</p>
                <p>23</p>
                <input
                  type="number"
                  placeholder="Quantity"
                  value={10}

                  min="1"
                />
              </div>
              <div className="req-list-item">
                <p>Nalle Engineer</p>
                <p>10</p>
                <p>23</p>
                <input
                  type="number"
                  placeholder="Quantity"
                  value={10}

                  min="1"
                />
              </div>
              <div className="req-list-item">
                <p>Nalle Engineer</p>
                <p>10</p>
                <p>23</p>
                <input
                  type="number"
                  placeholder="Quantity"
                  value={10}

                  min="1"
                />
              </div>
            </div>

            <div className="req-actions">
              <button className="approve-btn btn btn-primary">Approve</button>
              <button className="decline-btn btn btn-danger">Decline</button>
            </div>
          </div>
          <div className="notif-item card">
            <h5>By Project A</h5>

            <div className="req-list-head">
                <h6>Resources</h6>
                <h6>Requested</h6>
                <h6>Available</h6>
                <h6>Alloted</h6>
              </div>
            <div className="req-list">

              <div className="req-list-item">
                <p>Nalle Engineer</p>
                <p>10</p>
                <p>23</p>
                <input
                  type="number"
                  placeholder="Quantity"
                  value={10}

                  min="1"
                />
              </div>
              <div className="req-list-item">
                <p>Nalle Engineer</p>
                <p>10</p>
                <p>23</p>
                <input
                  type="number"
                  placeholder="Quantity"
                  value={10}

                  min="1"
                />
              </div>
              <div className="req-list-item">
                <p>Nalle Engineer</p>
                <p>10</p>
                <p>23</p>
                <input
                  type="number"
                  placeholder="Quantity"
                  value={10}

                  min="1"
                />
              </div>
            </div>

            <div className="req-actions">
              <button className="approve-btn btn btn-primary">Approve</button>
              <button className="decline-btn btn btn-danger">Decline</button>
            </div>
          </div>

        </div>
      </div>
    )
  }

  export default Notifications