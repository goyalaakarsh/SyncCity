import React, { useState } from 'react';
import './Chatbot.css'; 

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`chatbot-icon ${isOpen ? 'open' : ''}`} onClick={toggleChat}>
        <img src="https://static.vecteezy.com/system/resources/previews/007/225/199/non_2x/robot-chat-bot-concept-illustration-vector.jpg" alt="Chatbot" />
      </div>

      {isOpen && <ChatModal onClose={toggleChat} />}
    </>
  );
};

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
        <h5>Chat with us!</h5>
        <button className='chatmod-close' onClick={onClose}><i className="fa-solid fa-x"></i></button>
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

export default Chatbot;
