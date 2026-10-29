import React, { useState } from 'react';
import { Auth } from './Components/Auth';
import { Dashboard, UserProfile } from './Components/Dashboard';

function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div className="App">
      {currentUser ? (
        <Dashboard user={currentUser} onLogout={handleLogout} />
      ) : (
        <Auth onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;
