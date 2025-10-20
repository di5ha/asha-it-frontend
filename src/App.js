import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Layout from './components/common/Layout';

// Auth Pages
import AuthPage from './pages/auth/AuthPage';

// Applicant Pages
import OnboardingPage from './pages/onboarding/OnboardingPage';
import ResumeUploadPage from './pages/resume/ResumeUploadPage';
import ResumeComponentsPage from './pages/resume/ResumeComponentsPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import JobDetailPage from './pages/jobs/JobDetailPage';
import ApplicationsPage from './pages/applications/ApplicationsPage';

// Poster Pages
import PosterOnboardingPage from './pages/poster/onboarding/PosterOnboardingPage';
import PosterDashboardPage from './pages/poster/dashboard/PosterDashboardPage';
import CreateJobPage from './pages/poster/jobs/CreateJobPage';
import EditJobPage from './pages/poster/jobs/EditJobPage';
import JobApplicantsPage from './pages/poster/applicants/JobApplicantsPage';

// Styles
import './styles/App.css';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <div className="App">
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#4ade80',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 5000,
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
            
            <Routes>
              {/* Public Routes */}
              <Route path="/auth" element={<AuthPage />} />
              
              {/* Applicant Routes */}
              <Route path="/onboarding" element={
                <ProtectedRoute userType="applicant">
                  <OnboardingPage />
                </ProtectedRoute>
              } />
              
              <Route path="/resume/upload" element={
                <ProtectedRoute userType="applicant">
                  <ResumeUploadPage />
                </ProtectedRoute>
              } />
              
              <Route path="/resume/components" element={
                <ProtectedRoute userType="applicant">
                  <ResumeComponentsPage />
                </ProtectedRoute>
              } />
              
              <Route path="/dashboard" element={
                <ProtectedRoute userType="applicant">
                  <Layout>
                    <DashboardPage />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/jobs/:jobId" element={
                <ProtectedRoute userType="applicant">
                  <Layout>
                    <JobDetailPage />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/applications" element={
                <ProtectedRoute userType="applicant">
                  <Layout>
                    <ApplicationsPage />
                  </Layout>
                </ProtectedRoute>
              } />
              
              {/* Poster Routes */}
              <Route path="/poster/onboarding" element={
                <ProtectedRoute userType="poster">
                  <PosterOnboardingPage />
                </ProtectedRoute>
              } />
              
              <Route path="/poster/dashboard" element={
                <ProtectedRoute userType="poster">
                  <Layout>
                    <PosterDashboardPage />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/poster/jobs/new" element={
                <ProtectedRoute userType="poster">
                  <Layout>
                    <CreateJobPage />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/poster/jobs/:jobId/edit" element={
                <ProtectedRoute userType="poster">
                  <Layout>
                    <EditJobPage />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/poster/jobs/:jobId/applicants" element={
                <ProtectedRoute userType="poster">
                  <Layout>
                    <JobApplicantsPage />
                  </Layout>
                </ProtectedRoute>
              } />
              
              {/* Default redirect */}
              <Route path="/" element={<Navigate to="/auth" replace />} />
              
              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/auth" replace />} />
            </Routes>
          </div>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;