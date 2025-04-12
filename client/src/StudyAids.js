import React, { useState } from 'react';
import axios from 'axios';
import './StudyAids.css';

function StudyAids() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'patient' };
      setMessages((prev) => [...prev, userMessage]);
      setInput('');

      const systemMessage =
        'You are a supportive and empathetic mental health assistant. ' +
        'You provide helpful guidance by inquiring about the causes of their symptoms while ' +
        'prioritizing the emotional well-being and safety of the user. ' +
        'You are not a licensed therapist but can offer general mental health support and guidance. ' +
        'However, before giving any advice, ask at least 3 clarifying questions to the user, one question at a time. ' +
        'Each question can build off of the previous or relate to the user’s described symptoms. ' +
        'After that, offer advice that builds off the user’s responses.';

      try {
        const response = await axios.post(
          'https://openrouter.ai/api/v1/chat/completions',  // OpenRouter API endpoint
          {
            model: "deepseek/deepseek-chat",  // OpenRouter model
            messages: [
              { role: 'system', content: systemMessage },
              ...messages.map((msg) => ({
                role: msg.sender === 'patient' ? 'user' : 'assistant',
                content: msg.text,
              })),
              { role: 'user', content: `Mental health context: ${input}` },
            ],
          },
          {
            headers: {
              Authorization: `Bearer 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`,  // Your OpenRouter API key
              'Content-Type': 'application/json',
            },
          }
        );

        const botMessage = {
          text: response.data.choices[0].message.content,
          sender: 'bot',
        };

        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Error calling OpenRouter API:', error);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: 'Error: Unable to get a response from the chatbot.',
            sender: 'bot',
          },
        ]);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chatbot-page">
      <div className="container">
        <div className="conversations-list">
          <h3>Previous Conversations</h3>
          <ul>
            <li>Conversation 1</li>
            <li>Conversation 2</li>
            <li>Conversation 3</li>
          </ul>
          <button className="new-conversation-btn">Start New Conversation</button>
        </div>

        <div className="chatbox">
          <div className="chatbox-messages">
            {messages.length === 0 && (
              <p>No conversations yet. Start by typing a message below.</p>
            )}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender === 'patient' ? 'sent' : 'received'}`}
              >
                <p>{msg.text}</p>
              </div>
            ))}
          </div>
          <div className="chatbox-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message here..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudyAids;
