import React, { createContext, useContext, useState, useEffect } from 'react';
import { profileAPI } from '../services/api';
import { useAuth } from './AuthContext';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      loadUserProfile();
    } else {
      setUserProfile(null);
      setUserType(null);
    }
  }, [isAuthenticated, user]);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const profile = await profileAPI.getProfile(user.uid);
      setUserProfile(profile);
      setUserType(profile.user_type);
    } catch (err) {
      setError(err.message || 'Failed to load profile');
      console.error('Error loading profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      setError(null);
      const result = await profileAPI.updateProfile(user.uid, profileData);
      if (result.success) {
        setUserProfile(prev => ({ ...prev, profile: { ...prev.profile, ...profileData } }));
      }
      return result;
    } catch (err) {
      setError(err.message || 'Failed to update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateResumeComponents = async (components) => {
    try {
      setLoading(true);
      setError(null);
      const result = await profileAPI.updateResumeComponents(user.uid, components);
      if (result.success) {
        setUserProfile(prev => ({
          ...prev,
          profile: {
            ...prev.profile,
            resume_components: components
          }
        }));
      }
      return result;
    } catch (err) {
      setError(err.message || 'Failed to update resume components');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    userProfile,
    userType,
    loading,
    error,
    updateProfile,
    updateResumeComponents,
    loadUserProfile,
    clearError,
    isApplicant: userType === 'applicant',
    isPoster: userType === 'poster'
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
