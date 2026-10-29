import React, { useState } from 'react';
import '../CSS/Auth.css';
import { Dashboard, UserProfile } from './Dashboard';

export interface User {
  name: string;
  email: string;
  password: string;
}

interface AuthProps {
  onLoginSuccess?: (user: UserProfile) => void;
}

//// Pre-seeded demo user in the list
const DEFAULT_USERS: User[] = [
  {
    name: 'Demo User',
    email: 'user@example.com',
    password: 'Secret123',
  },
];

//// Component
export const Auth: React.FC<AuthProps> = ({ onLoginSuccess }) => {
  //// Parameters
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [internalUser, setInternalUser] = useState<UserProfile | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  
  //// Password visibility toggles
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  //// Registered users stored as a list
  const [userList, setUserList] = useState<User[]>(() => {
    const saved = localStorage.getItem('assignment_user_list');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_USERS;
      }
    }
    return DEFAULT_USERS;
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  //// Password validation helper
  const passwordConditions = {
    hasUpper: /[A-Z]/.test(formData.password),
    hasLower: /[a-z]/.test(formData.password),
    hasNumber: /[0-9]/.test(formData.password),
    hasMinLength: formData.password.length >= 6,
  };

  const validatePassword = (password: string): string | null => {
    if (password.length < 6) {
      return 'Password must be at least 6 characters long.';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter (A-Z).';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter (a-z).';
    }
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one number (0-9).';
    }
    return null;
  };

  //// Functions
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage('');
    if (successMessage) setSuccessMessage('');
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setShowPassword(false);
    setShowConfirmPassword(false);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleLogout = () => {
    setInternalUser(null);
    setShowPassword(false);
    setShowConfirmPassword(false);
    setSuccessMessage('You have logged out successfully.');
    setFormData((prev) => ({
      ...prev,
      password: '',
      confirmPassword: '',
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    //// Validation
    if (!formData.email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    if (!formData.password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    //// Password criteria check (uppercase, lowercase, number, 6+ characters)
    const pwdError = validatePassword(formData.password);
    if (pwdError) {
      setErrorMessage(pwdError);
      return;
    }

    if (isLogin) {
      //// Look for the user in the user list
      const existingUser = userList.find(
        (u) => u.email.toLowerCase() === formData.email.trim().toLowerCase()
      );

      if (!existingUser) {
        setErrorMessage('User not found. Please register first.');
        return;
      }

      if (existingUser.password !== formData.password) {
        setErrorMessage('Incorrect password. Please try again.');
        return;
      }

      const loggedUser: UserProfile = {
        email: existingUser.email,
        name: existingUser.name,
      };

      if (onLoginSuccess) {
        onLoginSuccess(loggedUser);
      } else {
        setInternalUser(loggedUser);
      }
    } else {
      //// Registration mode
      if (!formData.name.trim()) {
        setErrorMessage('Please enter your full name.');
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setErrorMessage('Passwords do not match!');
        return;
      }

      //// Check if email is already taken in the user list
      const isEmailTaken = userList.some(
        (u) => u.email.toLowerCase() === formData.email.trim().toLowerCase()
      );
      if (isEmailTaken) {
        setErrorMessage('This email is already registered. Please sign in or use another email.');
        return;
      }

      //// Add new user to the user list
      const newUser: User = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      };

      const updatedList = [...userList, newUser];
      setUserList(updatedList);
      localStorage.setItem('assignment_user_list', JSON.stringify(updatedList));

      setSuccessMessage('Registration successful! Please sign in with your credentials.');
      setIsLogin(true);
      setFormData((prev) => ({
        ...prev,
        password: '',
        confirmPassword: '',
      }));
    }
  };

  //// Standalone mode: navigate to Dashboard upon login
  if (!onLoginSuccess && internalUser) {
    return <Dashboard user={internalUser} onLogout={handleLogout} />;
  }

  //// HTML
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? 'Login to Your Account' : 'Create an Account'}</h2>

        {/* Unified feedback area (no alert popups) */}
        {errorMessage && (
          <div className="auth-message auth-error" id="auth-error-message" role="alert">
            <span className="message-icon">⚠️</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="auth-message auth-success" id="auth-success-message" role="status">
            <span className="message-icon">✓</span>
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="auth-name">Full Name</label>
              <input
                id="auth-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="auth-email">Email Address</label>
            <input
              id="auth-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@mail.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="auth-password">Password</label>
            <div className="password-input-wrapper">
              <input
                id="auth-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="toggle-password-btn"
                id="toggle-password-visibility"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                title={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>

            {/* Password conditions guide */}
            <div className="password-rules">
              <span className="rules-title">Password requirements:</span>
              <div className="rule-tags">
                <span className={`rule-tag ${passwordConditions.hasUpper ? 'valid' : ''}`}>
                  {passwordConditions.hasUpper ? '✓' : '•'} Uppercase (A-Z)
                </span>
                <span className={`rule-tag ${passwordConditions.hasLower ? 'valid' : ''}`}>
                  {passwordConditions.hasLower ? '✓' : '•'} Lowercase (a-z)
                </span>
                <span className={`rule-tag ${passwordConditions.hasNumber ? 'valid' : ''}`}>
                  {passwordConditions.hasNumber ? '✓' : '•'} Number (0-9)
                </span>
                <span className={`rule-tag ${passwordConditions.hasMinLength ? 'valid' : ''}`}>
                  {passwordConditions.hasMinLength ? '✓' : '•'} 6+ characters
                </span>
              </div>
            </div>
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="auth-confirm-password">Confirm Password</label>
              <div className="password-input-wrapper">
                <input
                  id="auth-confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  id="toggle-confirm-password-visibility"
                  aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                  title={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          )}

          <button type="submit" className="btn-primary" id="auth-submit-btn">
            {isLogin ? 'Sign In' : 'Register'}
          </button>
        </form>

        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button
            type="button"
            className="btn-link"
            id="toggle-auth-mode-btn"
            onClick={handleToggleMode}
          >
            {isLogin ? 'Register here' : 'Sign in here'}
          </button>
        </p>
      </div>
    </div>
  );
};
