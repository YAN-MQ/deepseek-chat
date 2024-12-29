import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Chat.css';

const API_URL = process.env.REACT_APP_API_URL || 'https://deepseekchat-7ion2ure4-yan-mingqis-projects.vercel.app';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/chat`, {
        messages: [...messages, userMessage]
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      const assistantMessage = response.data.choices[0].message;
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '抱歉，发生了一些错误。请稍后再试。'
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            <div className="message-content">{message.content}</div>
          </div>
        ))}
        {loading && <div className="message assistant loading">正在思考中...</div>}
      </div>
      <form onSubmit={sendMessage} className="input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入您的问题..."
          disabled={loading}
        />
        <button type="submit" disabled={loading || !input.trim()}>
          发送
        </button>
      </form>
    </div>
  );
};

export default Chat; 