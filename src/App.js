import React from 'react';
import Chat from './components/Chat';
import './styles/Chat.css';

function App() {
  return (
    <div className="App">
      <h1 style={{textAlign: 'center'}}>DeepSeek AI 聊天助手</h1>
      <Chat />
    </div>
  );
}

export default App; 