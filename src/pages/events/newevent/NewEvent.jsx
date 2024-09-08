import React, { useState } from 'react';
import './NewEvent.css';

const NewEvent = () => {
    const [location, setLocation] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedMode, setSelectedMode] = useState('');

    const handleInputChange = async (e) => {
        const query = e.target.value;
        setLocation(query);

        if (query.length < 3) {
            setSuggestions([]);
            return;
        }

        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&countrycodes=IN&format=json&addressdetails=1`);
            const data = await response.json();
            setSuggestions(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setLocation(suggestion.display_name);
        setSelectedLocation(suggestion);
        setSuggestions([]);
    };

    const handleModeChange = (e) => {
        const mode = e.target.value;
        setSelectedMode(mode);
        if (mode === 'online') {
            setLocation(''); // Clear location if mode is online
        }
    };

    return (
        <div className="maincon">
            <div className="newevent-topcon">
                <p className="heading">Create new event</p>
            </div>

            <form className="new-proj-form">
                <div className="input-component card">
                    <label>
                        Title
                    </label>
                    <input type="text" placeholder="Enter event title" />
                </div>
                <div className="input-component card">
                    <label>
                        Description
                    </label>
                    <textarea placeholder="Enter event description" rows={5} />
                </div>

                <div className="loc-date-con row">
                    <div className="input-component card col">
                        <label>
                            {selectedMode === 'online' ? 'Join link' : 'Location'}
                        </label>
                        <input
                            type="text"
                            placeholder={selectedMode === 'online' ? 'Enter join link' : 'Enter location'}
                            value={location}
                            onChange={handleInputChange}
                        />
                        {suggestions.length > 0 && (
                            <div className="autocomplete-suggestions">
                                {suggestions.map((suggestion) => (
                                    <div
                                        key={suggestion.place_id}
                                        className="autocomplete-suggestion"
                                        onClick={() => handleSuggestionClick(suggestion)}
                                    >
                                        {suggestion.display_name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="input-component card col">
                        <label>
                            Mode
                        </label>
                        <select onChange={handleModeChange} value={selectedMode}>
                            <option value="" disabled>Select mode</option>
                            <option value="online">Online</option>
                            <option value="offline">Offline</option>
                        </select>
                    </div>
                </div>

                <div className="input-component card col">
                    <div className="row">
                        <div className="col">
                            <label htmlFor="start-datetime">
                                Start Date & Time
                            </label>
                            <input
                                type="datetime-local"
                                id="start-datetime"
                                name="start-datetime"
                                placeholder="Start Date & Time"
                            />
                        </div>

                        <div className="col">
                            <label htmlFor="end-datetime">
                                End Date & Time
                            </label>
                            <input
                                type="datetime-local"
                                id="end-datetime"
                                name="end-datetime"
                                placeholder="End Date & Time"
                            />
                        </div>
                    </div>
                </div>

                {/* The commented-out code for project manager and members can be added back if needed */}

                <button className="creatproj btn btn-primary">Create event</button>
            </form>
        </div>
    );
}

export default NewEvent;
