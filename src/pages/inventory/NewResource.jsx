import React, { useState } from 'react';
import axios from 'axios';
import './Inventory.css';

const NewResource = ({ isVisible, onClose, onSave }) => {
    const [resourceName, setResourceName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [error, setError] = useState('');

    if (!isVisible) return null;

    const handleSubmit = async () => {
        if (resourceName.trim() && quantity > 0) {
            try {
                const response = await axios.post('http://localhost:3000/api/resource/add', {
                    name: resourceName,
                    quantity: parseInt(quantity)
                });
                onSave(response.data.resource); // Pass the saved resource to the parent
                setResourceName('');
                setQuantity('');
                setError('');
                onClose();
            } catch (error) {
                setError('Failed to add resource. Please try again.');
                console.error('Error adding resource:', error);
            }
        } else {
            setError('Please enter a valid resource name and quantity.');
        }
    };

    return (
        <div className="maincon req-resources-overlay">
            <div className="req-resources-content">
                <h3>Add Resource</h3>

                <div className="inventory-list">
                    <label htmlFor="resource-name">
                        Name/Article
                    </label>
                    <textarea
                        id="resource-name"
                        value={resourceName}
                        onChange={(e) => setResourceName(e.target.value)}
                        placeholder="Enter resource name"
                    />
                    <label htmlFor="resource-qnt">
                        Quantity
                    </label>
                    <input
                        id="resource-qnt"
                        type='number'
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Enter quantity"
                    />
                </div>

                {error && <p className="error-message">{error}</p>}

                <div className="req-resources-actions">
                    <button onClick={handleSubmit}>Add</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default NewResource;