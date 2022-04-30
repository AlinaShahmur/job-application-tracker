import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function App() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  useEffect(() => {
    if (!isAuthenticated) loginWithRedirect()
  })
  return (
    <div className="App">
        <h1>Job application tracker</h1>
        <Link to = '/applications'>My Applications</Link>
    </div>
  );
}

export default App;
