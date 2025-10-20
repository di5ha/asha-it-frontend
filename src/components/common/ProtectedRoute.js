import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';

const ProtectedRoute = ({ children, userType }) => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { userType: currentUserType, loading: appLoading } = useApp();
  const location = useLocation();

  // Show loading while checking authentication
  if (authLoading || appLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // Redirect to auth if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Check user type if specified
  if (userType && currentUserType !== userType) {
    // Redirect to appropriate dashboard based on user type
    const redirectPath = currentUserType === 'applicant' ? '/dashboard' : '/poster/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
