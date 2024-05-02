// BotPage.js
import React, { useState, useEffect } from 'react';
import Workspaces from './Workspaces';
import './BotPage.css';

function BotPage() {
  const [currentWorkspace, setCurrentWorkspace] = useState('');
  const [apiToken, setApiToken] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (currentWorkspace) {
      const workspaceData = JSON.parse(localStorage.getItem('workspaceData')) || {};
      if (workspaceData[currentWorkspace]) {
        const { apiToken, messages } = workspaceData[currentWorkspace];
        setApiToken(apiToken);
        setMessages(messages);
      }
    }
  }, [currentWorkspace]);

  const handleWorkspaceChange = (workspace) => {
    setCurrentWorkspace(workspace);
  };

  return (
    <div className="BotPage">
      <Workspaces onWorkspaceSelect={handleWorkspaceChange} selectedWorkspace={currentWorkspace} />
      <div>
        <h2>API Token for {currentWorkspace}: {apiToken}</h2>
        <h2>Messages</h2>
        {messages.map((msg, index) => <p key={index}>{msg}</p>)}
      </div>
    </div>
  );
}

export default BotPage;
