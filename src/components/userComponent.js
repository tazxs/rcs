// UserComponent.js

import React, { useState } from 'react';
import { fetchData } from './api';

function UserComponent() {
  const [error, setError] = useState('');

  const handleFetch = async () => {
    try {
      const data = await fetchData('https://your-api-url.com/data', 'your-api-token');
      console.log('Data received:', data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setError(error.message);
    }
  };

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <button onClick={handleFetch}>Fetch Data</button>
    </div>
  );
}

export default UserComponent;
