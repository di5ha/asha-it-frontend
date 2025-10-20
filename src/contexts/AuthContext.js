import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = authAPI.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const result = await authAPI.signIn(email, password);
      setUser(result.user);
      return result;
    } catch (err) {
      setError(err.message || 'Failed to sign in');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const result = await authAPI.signUp(email, password);
      setUser(result.user);
      return result;
    } catch (err) {
      setError(err.message || 'Failed to sign up');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await authAPI.signOut();
      setUser(null);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to sign out');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    clearError,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
