import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AuthForm from '../../components/auth/AuthForm';
import './AuthPage.css';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const { signIn, signUp, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleAuth = async (email, password) => {
    try {
      clearError();
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    clearError();
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1 className="auth-title">
            <span className="logo-icon"></span>
            Asha IT
          </h1>
          <p className="auth-subtitle">
            {isSignUp 
              ? 'Create your account to get started' 
              : 'Welcome back! Sign in to continue'
            }
          </p>
        </div>

        <AuthForm
          isSignUp={isSignUp}
          onSubmit={handleAuth}
          error={error}
        />

        <div className="auth-footer">
          <p>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button 
              type="button" 
              className="toggle-mode-btn"
              onClick={toggleMode}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
