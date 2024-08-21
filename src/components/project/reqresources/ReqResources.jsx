import React, { useState } from 'react';
import './ReqResources.css';

const ReqResources = ({ isVisible, onClose, onSave }) => {
    if (!isVisible) return null;

    // Dummy inventory list (machinery and human resources)
    const inventory = [
        { id: 1, name: 'Excavator (Machinery)' },
        { id: 2, name: 'Bulldozer (Machinery)' },
        { id: 3, name: 'Crane Operator (Human Resource)' },
        { id: 4, name: 'Electrician (Human Resource)' },
        { id: 5, name: 'Concrete Mixer (Machinery)' },
        { id: 6, name: 'Plumber (Human Resource)' }
    ];

    const [selectedResources, setSelectedResources] = useState(
        inventory.map(item => ({ ...item, isSelected: false, quantity: '1' }))
    );

    const [searchQuery, setSearchQuery] = useState('');

    const handleResourceChange = (id, key, value) => {
        setSelectedResources(prevResources =>
            prevResources.map(res =>
                res.id === id ? { ...res, [key]: value } : res
            )
        );
    };

    const handleSubmit = () => {
        const requestedResources = selectedResources.filter(res => res.isSelected && res.quantity);
        onSave(requestedResources);
    };

    const filteredResources = selectedResources.filter(resource =>
        resource.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="maincon req-resources-overlay">
            <div className="req-resources-content">
                <h3>Request Resources</h3>

                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="res-search-bar"
                />

                <label>Select Resources:</label>
                <div className="resource-list">
                    {filteredResources
                        .sort((a, b) => b.isSelected - a.isSelected)
                        .map((resource) => (
                            <div key={resource.id} className="resource-item">
                                <div className="resources-con">
                                    <input
                                        type="checkbox"
                                        checked={resource.isSelected}
                                        onChange={(e) =>
                                            handleResourceChange(resource.id, 'isSelected', e.target.checked)
                                        }
                                    />
                                    <span className="resourcename">{resource.name}</span>
                                </div>
                                {resource.isSelected && (
                                    <input
                                        type="number"
                                        placeholder="Quantity"
                                        value={resource.quantity}
                                        onChange={(e) =>
                                            handleResourceChange(resource.id, 'quantity', e.target.value)
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
