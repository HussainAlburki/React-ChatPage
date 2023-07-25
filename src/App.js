import React, { useState, useEffect } from 'react';
import './App.css';
import jsonData from './conversation.json'; // Import the conversation JSON data

// Function to simulate bot typing delay
const simulateBotTyping = (delay) =>
  new Promise((resolve) => setTimeout(resolve, delay));

function App() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  // Function to handle user messages and bot responses
  const handleUserMessage = () => {
    if (inputText.trim() !== '') {
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'user', content: inputText },
      ]);

      // Simulate bot response after every user message
      simulateBotTyping(1000).then(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: 'assistant',
            content:
              'As an AI language model, I do not have a personal preference. However, both iOS and Android have their unique features and benefits, and the choice depends on individual preferences and needs. For example, iOS devices are known for their sleek design, user-friendly interface, and strong privacy and security measures. On the other hand, Android devices offer more device customization options, affordability, and compatibility with non-Apple devices. Ultimately, the choice between iOS and Android comes down to personal preference and specific needs.',
          },
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
    // Fetch the conversation data from the JSON file (You can replace it with API call in a real-world scenario)
    // For now, we'll use the data from the JSON file directly.
    const conversationData = jsonData.conversation;

    // Set the messages from the conversation data
    setMessages(conversationData.messages);

    // Scroll to the bottom of the chat when new messages are added
    const chatContainer = document.getElementById('chat-container');
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, []);

  return (
    <div className="chat-app">
      {/* ... Existing code for the app bar ... */}
      <div className="chat-container" id="chat-container">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`message ${message.role === 'user' ? 'user' : 'bot'}`}
          >
            <div className="message-content">
              {message.role === 'user' ? (
                <img
                  src="/user.png"
                  alt="You"
                  className="profile-photo user"
                />
              ) : (
                <img src="/bot.png" alt="Chat Bot" className="profile-photo bot" />
              )}
              <p className="message-text">{message.content}</p>
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
