import React, { useState } from 'react';
import './ChatModal.css'; 

const ChatModal = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { type: 'user', text: input }]);
      setInput('');
      
      // Simulate bot response
      setTimeout(() => {
        setMessages([...messages, { type: 'user', text: input }, { type: 'bot', text: `You said: ${input}` }]);
      }, 1000);
    }
  };

  return (
    <div className="chat-modal">
      <div className="chat-header">
        <h3>Chat with us!</h3>
        <button onClick={onClose}>X</button>
      </div>
      <div className="chat-body">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.type}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatModal;
