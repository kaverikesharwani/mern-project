import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Auth System</h1>
      <button onClick={() => setShowLogin(!showLogin)}>
        {showLogin ? 'Go to Register' : 'Go to Login'}
      </button>
      {showLogin ? <Login /> : <Register />}
    </div>
  );
}

export default App;
