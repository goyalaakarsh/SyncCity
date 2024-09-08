import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Inventory.css';
import NewResource from './NewResource';

const Inventory = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/api/resource');
            setResources(response.data);
            setError('');
        } catch (error) {
            console.error('Error fetching resources:', error);
            setError('Failed to fetch resources. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddResourceClick = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleSaveResource = (newResource) => {
        setResources([...resources, newResource]);
        setIsModalVisible(false);
    };

    return (
        <div className="inventorycon maincon">
            <div className="inventory-topcon">
                <p className="heading">Inventory</p>
                <button className="mainbtn" onClick={handleAddResourceClick}>
                    <i className="tag-icon fa-solid fa-circle-plus"></i>Add resource
                </button>
            </div>

            <div className="notif-list">
                <div className="notif-item card">
                    <div className="req-list">
                        <div className="req-list-head">
                            <h6>Resources</h6>
                            <h6>Available</h6>
                        </div>
                        {loading ? (
                            <p>Loading resources...</p>
                        ) : error ? (
                            <p className="error-message">{error}</p>
                        ) : (
                            resources.map((resource) => (
                                <div key={resource._id} className="req-list-item">
                                    <p>{resource.name}</p>
                                    <p>{resource.quantity}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <NewResource 
                isVisible={isModalVisible} 
                onClose={handleCloseModal} 
                onSave={handleSaveResource} 
            />
        </div>
    );
};

export default Inventory;