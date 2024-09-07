import React, {useState} from 'react'
import './Inventory.css'
import NewResource from './NewResource';

const Inventory = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleAddResourceClick = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleSaveResource = (resources) => {
        console.log('Resources to save:', resources);
        setIsModalVisible(false);
    };

    return (
        <div className="inventorycon maincon">
            <div className="inventory-topcon">
                <p className="heading">Inventory</p>
                <button className="mainbtn" onClick={handleAddResourceClick}><i className="tag-icon fa-solid fa-circle-plus"></i>Add resource</button>
            </div>

            <div className="notif-list">
                <div className="notif-item card">
                    <div className="req-list">
                        <div className="req-list-head">
                            <h6>Resources</h6>
                            <h6>Available</h6>
                        </div>
                        <div className="req-list-item">
                            <p>Nalle Engineer</p>
                            <p>10</p>
                        </div>
                        <div className="req-list-item">
                            <p>Nalle Engineer</p>
                            <p>10</p>
                        </div>
                        <div className="req-list-item">
                            <p>Nalle Engineer</p>
                            <p>10</p>
                        </div>
                        <div className="req-list-item">
                            <p>Nalle Engineer</p>
                            <p>10</p>
                        </div>
                        <div className="req-list-item">
                            <p>Nalle Engineer</p>
                            <p>10</p>
                        </div>
                    </div>
                </div>

            </div>
            <NewResource 
                isVisible={isModalVisible} 
                onClose={handleCloseModal} 
                onSave={handleSaveResource} 
            />
        </div>
    )
}

export default Inventory