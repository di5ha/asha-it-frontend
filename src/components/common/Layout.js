import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import './Layout.css';

const Layout = ({ children }) => {
  const { user, signOut } = useAuth();
  const { userType, isApplicant, isPoster } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getNavItems = () => {
    if (isApplicant) {
      return [
        { path: '/dashboard', label: 'Dashboard', icon: '📊' },
        { path: '/applications', label: 'My Applications', icon: '📝' },
        { path: '/resume/components', label: 'Resume', icon: '📄' },
      ];
    } else if (isPoster) {
      return [
        { path: '/poster/dashboard', label: 'Dashboard', icon: '📊' },
        { path: '/poster/jobs/new', label: 'Post Job', icon: '➕' },
      ];
    }
    return [];
  };

  const navItems = getNavItems();

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <Link to={isApplicant ? '/dashboard' : '/poster/dashboard'} className="logo">
            <span className="logo-icon"></span>
            <span className="logo-text">Asha IT</span>
          </Link>
          
          <nav className="nav">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            ))}
          </nav>
          
          <div className="user-menu">
            <div className="user-info">
              <span className="user-email">{user?.email}</span>
              <span className="user-type">{userType}</span>
            </div>
            <button onClick={handleSignOut} className="sign-out-btn">
              Sign Out
            </button>
          </div>
        </div>
      </header>
      
      <main className="main-content">
        {children}
      </main>
      
      <footer className="footer">
        <p>&copy; 2025 Asha IT. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
