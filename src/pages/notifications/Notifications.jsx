import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Notifications.css';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/notification/pending');
                setNotifications(response.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, []);

    const handleApprove = async (id) => {
        try {
            await axios.patch(`http://localhost:3000/api/notification/update/${id}`, { status: 'Approved' });
            setNotifications(notifications.map(notification => 
                notification._id === id ? { ...notification, status: 'Approved' } : notification
            ));
        } catch (error) {
            console.error('Error approving notification:', error);
        }
    };

    const handleDecline = async (id) => {
        try {
            await axios.patch(`http://localhost:3000/api/notification/update/${id}`, { status: 'Denied' });
            setNotifications(notifications.map(notification => 
                notification._id === id ? { ...notification, status: 'Denied' } : notification
            ));
        } catch (error) {
            console.error('Error declining notification:', error);
        }
    };

    const groupedNotifications = notifications.reduce((groups, notification) => {
        const { projectId, projectName } = notification;  // Assuming projectName is available
        if (!groups[projectId]) {
            groups[projectId] = { name: projectName, notifications: [] };
        }
        groups[projectId].notifications.push(notification);
        return groups;
    }, {});

    return (
        <div className="notifcon maincon">
            <div className="notif-topcon">
                <p className="heading">Requests</p>
                <a href="/inventory">
                    <button className="mainbtn"><i className="tag-icon fa-solid fa-warehouse"></i>Inventory</button>
                </a>
            </div>

            <div className="notif-list">
                {Object.entries(groupedNotifications).map(([projectId, { name, notifications }]) => (
                    <div key={projectId} className="notif-item card">
                        <h5>By Project {name || projectId}</h5>

                        <div className="req-list-head">
                            <h6>Resources</h6>
                            <h6>Requested</h6>
                            <h6>Status</h6>
                        </div>
                        <div className="req-list">
                            {notifications.map(notification => (
                                <div key={notification._id} className={`req-list-item ${notification.status.toLowerCase()}`}>
                                    <p>{notification.name}</p>
                                    <p>{notification.quantity}</p>
                                    <p className="status">{notification.status}</p>
                                    {notification.status === 'Pending' && (
                                        <div className="req-actions">
                                            <button
                                                className="approve-btn btn btn-primary"
                                                onClick={() => handleApprove(notification._id)}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className="decline-btn btn btn-danger"
                                                onClick={() => handleDecline(notification._id)}
                                            >
                                                Decline
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notifications;
