import React, { useState, useEffect } from 'react';

function Workspaces({ onWorkspaceSelect, selectedWorkspace }) {
  const [workspaces, setWorkspaces] = useState([]);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');

  useEffect(() => {
    const loadedWorkspaces = JSON.parse(localStorage.getItem('workspaceData')) || {};
    setWorkspaces(Object.keys(loadedWorkspaces));
  }, []);

  const addWorkspace = () => {
    if (newWorkspaceName && !workspaces.includes(newWorkspaceName)) {
      const newToken = Math.random().toString(36).substring(2, 15); // Generate a random token
      const updatedWorkspaces = {
        ...JSON.parse(localStorage.getItem('workspaceData') || '{}'),
        [newWorkspaceName]: { apiToken: newToken, messages: [] }
      };
      localStorage.setItem('workspaceData', JSON.stringify(updatedWorkspaces));
      setWorkspaces(Object.keys(updatedWorkspaces));
      onWorkspaceSelect(newWorkspaceName);  // Notify parent component
      setNewWorkspaceName('');
    }
  };

  return (
    <div>
      <input
        value={newWorkspaceName}
        onChange={(e) => setNewWorkspaceName(e.target.value)}
        placeholder="Enter new workspace name"
      />
      <button onClick={addWorkspace}>Add Workspace</button>
      <ul>
        {workspaces.map((workspace, index) => (
          <li key={index} className={workspace === selectedWorkspace ? "selected" : ""}
              onClick={() => onWorkspaceSelect(workspace)}>
            {workspace}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Workspaces;
