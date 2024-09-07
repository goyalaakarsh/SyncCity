import React, { useState } from 'react';
import './Inventory.css';

const NewResource = ({ isVisible, onClose, onSave }) => {
    const [resourceName, setResourceName] = useState('');
    const [quantity, setQuantity] = useState('');

    if (!isVisible) return null;

    const handleSubmit = () => {
        if (resourceName.trim() && quantity > 0) {
            onSave({ name: resourceName, quantity }); // Pass both resource name and quantity to the parent
            setResourceName(''); // Clear the input after saving
            setQuantity(''); // Clear the quantity after saving
            onClose(); // Close the modal
        } else {
            alert('Please enter a valid resource name and quantity.');
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

                <div className="req-resources-actions">
                    <button onClick={handleSubmit}>Add</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default NewResource;
