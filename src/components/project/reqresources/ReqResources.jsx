import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReqResources.css';

const ReqResources = ({ isVisible, onClose, onSave }) => {
    const [inventory, setInventory] = useState([]);
    const [selectedResources, setSelectedResources] = useState({});
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/resource');
                setInventory(response.data);
            } catch (error) {
                console.error('Error fetching resources:', error);
            }
        };

        fetchResources();
    }, []);

    if (!isVisible) return null;

    const handleResourceChange = (id, isSelected) => {
        setSelectedResources(prev => {
            if (isSelected) {
                return { ...prev, [id]: { quantity: 1 } };
            } else {
                const { [id]: _, ...rest } = prev;
                return rest;
            }
        });
    };

    const handleQuantityChange = (id, quantity) => {
        setSelectedResources(prev => ({
            ...prev,
            [id]: { ...prev[id], quantity: parseInt(quantity) || 1 }
        }));
    };

    const handleSubmit = async () => {
        const requestedResources = Object.entries(selectedResources)
            .map(([id, { quantity }]) => {
                const resource = inventory.find(item => item._id === id);
                if (!resource) {
                    console.error(`Resource with id ${id} not found in inventory`);
                    return null;
                }
                return { id, name: resource.name, quantity };
            })
            .filter(Boolean);

        console.log("Requested resources", requestedResources);

        try {
            const response = await axios.post('http://localhost:3000/api/resource/specific', { resources: requestedResources });
            console.log("Response resources", response);

            onSave(response.data);
        } catch (error) {
            console.error('Error sending resource request:', error);
        }
    };

    const filteredResources = inventory.filter(resource =>
        resource.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="req-resources-overlay">
            <div className="req-resources-content">
                <h2>Request Resources</h2>
                <input
                    type="text"
                    placeholder="Search resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="res-search-bar"
                />
                <h3>Select Resources:</h3>
                <div className="resource-list">
                    {filteredResources
                        .sort((a, b) => (selectedResources[b._id] ? 1 : 0) - (selectedResources[a._id] ? 1 : 0))
                        .map((resource) => (
                            <div key={resource._id} className="resource-item">
                                <label className="resourcename">
                                    <input
                                        type="checkbox"
                                        checked={!!selectedResources[resource._id]}
                                        onChange={(e) =>
                                            handleResourceChange(resource._id, e.target.checked)
                                        }
                                    />
                                    {resource.name}
                                </label>
                                {selectedResources[resource._id] && (
                                    <input
                                        type="number"
                                        value={selectedResources[resource._id].quantity}
                                        onChange={(e) =>
                                            handleQuantityChange(resource._id, e.target.value)
                                        }
                                        min="1"
                                    />
                                )}
                            </div>
                        ))}
                </div>
                <div className="req-resources-actions">
                    <button onClick={handleSubmit}>Send Request</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ReqResources;