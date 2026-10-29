import React from 'react';
import '../CSS/Auth.css';

export interface UserProfile {
  name?: string;
  email: string;
}

interface DashboardProps {
  user: UserProfile;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const displayName = user.name && user.name.trim() !== '' 
    ? user.name 
    : user.email.split('@')[0];

  return (
    <div className="auth-container">
      <div className="auth-card dashboard-card">
        <div className="dashboard-avatar">
          {displayName.charAt(0).toUpperCase()}
        </div>

        <h2>Welcome Back!</h2>
        <p className="dashboard-subtitle">You have successfully logged in.</p>

        <div className="dashboard-info">
          <div className="info-row">
            <span className="info-label">Name:</span>
            <span className="info-value">{displayName}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Email:</span>
            <span className="info-value">{user.email}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Status:</span>
            <span className="info-badge">Authenticated</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="btn-primary btn-logout"
          id="logout-button"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};
