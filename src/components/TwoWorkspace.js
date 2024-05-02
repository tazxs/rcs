import React, { useState, useEffect } from 'react';

function Workspaces({ onSelectWorkspace }) {
  const [workspaces, setWorkspaces] = useState([]);

  useEffect(() => {
    const loadedWorkspaces = JSON.parse(localStorage.getItem('workspaces')) || [];
    setWorkspaces(loadedWorkspaces);
  }, []);

  const addWorkspace = (name) => {
    const newWorkspaces = [...workspaces, name];
    localStorage.setItem('workspaces', JSON.stringify(newWorkspaces));
    setWorkspaces(newWorkspaces);
  };

  return (
    <div>
      <ul>
        {workspaces.map((workspace, index) => (
          <li key={index} onClick={() => onSelectWorkspace(workspace)}>
            {workspace}
          </li>
        ))}
      </ul>
      <button onClick={() => addWorkspace(`Workspace ${workspaces.length + 1}`)}>Add Workspace</button>
    </div>
  );
}

export default Workspaces;
