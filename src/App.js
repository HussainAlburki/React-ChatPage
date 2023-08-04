import React, { useState, useEffect } from 'react';
import './App.css';
import jsonData from './conversation.json';

const simulateBotTyping = (delay) =>
  new Promise((resolve) => setTimeout(resolve, delay));

function App() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false); // New state for bot typing indicator

  const handleUserMessage = () => {
    if (inputText.trim() !== '') {
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'user', content: inputText },
      ]);

      setIsBotTyping(true); // Set bot typing to true before the reply

      simulateBotTyping(500).then(() => {
        // Simulate bot typing
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: 'bot', content: 'Typing...' },
        ]);
        simulateBotTyping(1000).then(() => {
          // Simulate bot reply
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              role: 'assistant',
              content:
                'As an AI language model, I do not have a personal preference. However, both iOS and Android have their unique features and benefits, and the choice depends on individual preferences and needs. For example, iOS devices are known for their sleek design, user-friendly interface, and strong privacy and security measures. On the other hand, Android devices offer more device customization options, affordability, and compatibility with non-Apple devices. Ultimately, the choice between iOS and Android comes down to personal preference and specific needs.',
            },
          ]);
          setIsBotTyping(false); // Set bot typing to false after the reply
        });
      });

      setInputText('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleUserMessage();
    }
  };

  useEffect(() => {
    const conversationData = jsonData.conversation;
    setMessages(conversationData.messages);

    const chatContainer = document.getElementById('chat-container');
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, []);

  return (
    <div className="chat-app">
      <div className="app-bar">
        <div className="app-bar-left">
          <span className="icon">&#9993;</span>
        </div>

        <div className="app-bar-moddle">
          <h1>Chat</h1>
        </div>

        <div className="app-bar-right">
          <span className="icon">&#9728;</span>
        </div>
      </div>

      <div>
        <hr
          style={{
            color: 'white',
            backgroundColor: 'white',
            height: 1,
          }}
        />
      </div>

      <div className="chat-container" id="chat-container">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`message ${
              message.role === 'user' ? 'user' : 'bot'
            }`}
            style={{
              justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
              textAlign: message.role === 'user' ? 'right' : 'left',
            }}
          >
            {message.role === 'user' ? (
              <div className="profile-photoU">
                <img
                  src="/user.png"
                  alt="You"
                  className="profile-photo user"
                />
                
              </div>
            ) : (
              <div className="profile-photB">
                <img src="/bot.png" alt="Chat Bot" className="profile-photo bot" />
              </div>
            )}
            <div className="message-content">
              {message.content === 'Typing...' && isBotTyping ? ( // Show typing indicator when bot is typing
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              ) : null} {/* Do not show anything in the message-content when the bot is typing */}
              {message.content !== 'Typing...' && !isBotTyping ? ( // Show the message content when the bot is not typing
                <p className="message-text">{message.content}</p>
              ) : null}
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
