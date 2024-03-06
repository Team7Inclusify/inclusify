// MessageInbox.js

import React, { useState } from 'react';
import './MessageInbox.css';

const MessageInbox = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleMessageSend = () => {
    if (message.trim() !== '') {
      setMessages([...messages, message]);
      setMessage('');
    }
  };

  return (
    <div className="message-container">
      {messages.map((msg, index) => (
        <div key={index} className="message">
          <span className="sender">Sender:</span> {msg}
        </div>
      ))}
      <div className="input-container">
        <textarea
          className="message-input"
          placeholder="Type your message..."
          value={message}
          onChange={handleMessageChange}
        />
        <button className="send-button" onClick={handleMessageSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageInbox;
