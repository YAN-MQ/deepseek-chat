import React from 'react';
import Chat from './components/Chat';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>DeepSeek AI 聊天助手</h1>
      </header>
      <main>
        <Chat />
      </main>
    </div>
  );
}

export default App; 