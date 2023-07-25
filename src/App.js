import React, { useState, useEffect } from 'react';
import './App.css';

// Function to simulate bot typing delay
const simulateBotTyping = (delay) =>
  new Promise((resolve) => setTimeout(resolve, delay));

function App() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  // Function to handle user messages and bot responses
  // I noticed in the figma interface that bot will respond to the user messages with the same message sent.
  //in the sample I noticed the bot will respond to the messages in recerse order. but i just could make the bot reply what the user send.
  const handleUserMessage = () => {
    if (inputText.trim() !== '') {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputText, from: 'user' },
      ]);
      // Simulate bot response after every user message
      simulateBotTyping(1000).then(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: inputText, from: 'bot' },
        ]);
      });
      setInputText('');
    }
  };
  // Listen for Enter key press to send messages
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleUserMessage();
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the chat when new messages are added
    const chatContainer = document.getElementById('chat-container');
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [messages]);

  return (
    <div className="chat-app">
      <div className="app-bar">
        <div className="app-bar-left">
            {/* I used  the Unicdoe character for the icons*/}
        <span className="icon">&#9993;</span>
        </div>

        <div className="app-bar-moddle"> 
          <h1>Chat</h1>
        </div>
              {/* I used  the Unicdoe character for the icons*/}
        <div className="app-bar-right"> 
        <span className="icon">&#9728;</span> 
        </div>
        
      </div>

<div>
     
    <hr
        style={{
            color: 'white',
            backgroundColor: 'white',
            height: 1
        }}
    />
</div>
      <div className="chat-container" id="chat-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.from === 'user' ? 'user' : 'bot'}`}
          >

            <div className="message-content">
              <img
                src={
                  message.from === 'user'
                    ? '/user.png' 
                    : '/bot.png' 
                }
                alt={
                  message.from === 'user' ? 'You' : 'Chat Bot' 
                }
                className={`profile-photo ${message.from === 'user' ? 'user' : 'bot'}`}
              />
              <p className="message-text">{message.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a new message..."
        />
        <button onClick={handleUserMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
