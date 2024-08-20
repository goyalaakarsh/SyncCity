import React from 'react'
import './ProjTasks.css'

const ProjTasks = () => {
    return (
        <div className="ProjTasks">
            <div className='proj-tasks'>
                <span>Tasks</span>
                <button className="mainbtn"><i className="fa-solid fa-circle-plus"></i> Create new</button>
            </div>

            <div className="projtasks-cats">
                <div className='projtasks-cat completed'>
                    <div className='projtasks-label g-tag'></div>
                    <span className="task-label-info">Completed: 5</span>
                </div>
                <div className='projtasks-cat In Progress'>
                    <div className='projtasks-label b-tag'></div>
                    <span className="task-label-info">In Progress: 5</span>
                </div>
                <div className='projtasks-cat Pending'>
                    <div className='projtasks-label y-tag'></div>
                    <span className="task-label-info">Pending: 5</span>
                </div>
            </div>

            <div className="tasks-cat-list">
                <div className="task-category">
                    <span className="task-cat-tag b-tag">
                        <i className="fa-regular fa-circle-dot"></i>
                        <span>In Progress</span>
                    </span>
                    <div className="tasks-list">
                        <div className="task-item">
                            <i className="fa-regular fa-circle-dot"></i>
                            <span>Tasks</span>
                        </div>
                        <div className="task-item">
                            <i className="fa-regular fa-circle-dot"></i>
                            <span>Tasks</span>
                        </div>
                        <div className="task-item">
                            <i className="fa-regular fa-circle-dot"></i>
                            <span>Tasks</span>
                        </div>
                        <div className="task-item">
                            <i className="fa-regular fa-circle-dot"></i>
                            <span>Tasks</span>
                        </div>
                        <div className="task-item">
                            <i className="fa-regular fa-circle-dot"></i>
                            <span>Tasks</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="tasks-cat-list">
                <div className="task-category">
                    <span className="task-cat-tag y-tag">
                        <i className="fa-solid fa-circle-exclamation"></i>
                        <span>Pending</span>
                    </span>
                    <div className="tasks-list">
                        <div className="task-item">
                            <i className="fa-solid fa-circle-exclamation"></i>
                            <span>Tasks</span>
                        </div>
                        <div className="task-item">
                            <i className="fa-solid fa-circle-exclamation"></i>
                            <span>Tasks</span>
                        </div>
                        <div className="task-item">
                            <i className="fa-solid fa-circle-exclamation"></i>
                            <span>Tasks</span>
                        </div>
                        <div className="task-item">
                            <i className="fa-solid fa-circle-exclamation"></i>
                            <span>Tasks</span>
                        </div>
                        <div className="task-item">
                            <i className="fa-solid fa-circle-exclamation"></i>
                            <span>Tasks</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="tasks-cat-list">
                <div className="task-category">
                    <span className="task-cat-tag g-tag">
                        <i className="fa-solid fa-circle-check"></i>
                        <span>Completed</span>
                    </span>
                    <div className="tasks-list">
                        <div className="task-item">
                            <i className="fa-solid fa-circle-check"></i>
                            <span>Tasks</span>
                        </div>
                        <div className="task-item">
                            <i className="fa-solid fa-circle-check"></i>
                            <span>Tasks</span>
                        </div>
                        <div className="task-item">
                            <i className="fa-solid fa-circle-check"></i>
                            <span>Tasks</span>
                        </div>
                        <div className="task-item">
                            <i className="fa-solid fa-circle-check"></i>
                            <span>Tasks</span>
                        </div>
                        <div className="task-item">
                            <i className="fa-solid fa-circle-check"></i>
                            <span>Tasks</span>
                        </div>
                    </div>
                </div>
            </div>




        </div>

    )
}

export default ProjTasks