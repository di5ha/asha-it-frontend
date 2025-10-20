import axios from 'axios';
import { 
  getJobs, 
  getJobById, 
  getApplications, 
  getResumeComponents, 
  getCompanyJobs, 
  getJobApplicants 
} from './demoData';

// For demo purposes, we'll simulate API calls with delays
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('firebase_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('firebase_token');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

// Simulate network delay for demo
const simulateDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Auth API
export const authAPI = {
  // In a real app, these would call Firebase Auth
  signIn: async (email, password) => {
    await simulateDelay(800);
    // Simulate successful login
    const token = `demo_token_${Date.now()}`;
    localStorage.setItem('firebase_token', token);
    return { token, user: { email, uid: 'demo_user_001' } };
  },
  
  signUp: async (email, password) => {
    await simulateDelay(1000);
    // Simulate successful registration
    const token = `demo_token_${Date.now()}`;
    localStorage.setItem('firebase_token', token);
    return { token, user: { email, uid: 'demo_user_001' } };
  },
  
  signOut: async () => {
    await simulateDelay(300);
    localStorage.removeItem('firebase_token');
    return true;
  },
  
  getCurrentUser: () => {
    const token = localStorage.getItem('firebase_token');
    return token ? { uid: 'demo_user_001', email: 'demo@example.com' } : null;
  }
};

// Profile API
export const profileAPI = {
  getProfile: async (userId) => {
    await simulateDelay(400);
    // Return demo profile data
    return {
      user_id: userId,
      email: 'demo@example.com',
      user_type: 'applicant',
      profile: {
        first_name: 'John',
        last_name: 'Doe',
        phone: '+1-555-0123',
        location: 'San Francisco, CA',
        work_auth: 'US Citizen',
        status_enum: 'authorized',
        eligible_start: '2025-02-01',
        expiry: '2025-12-31'
      }
    };
  },
  
  updateProfile: async (userId, profileData) => {
    await simulateDelay(600);
    // Simulate profile update
    return { success: true, profile: profileData };
  },
  
  updateResumeComponents: async (userId, components) => {
    await simulateDelay(500);
    // Simulate resume components update
    return { success: true, components };
  }
};

// Resume API
export const resumeAPI = {
  getResumeUploadUrl: async (filename, mimeType) => {
    await simulateDelay(300);
    // Simulate pre-signed URL generation
    const resumeId = `res_${Date.now()}`;
    return {
      resume_id: resumeId,
      upload_url: `https://demo-s3-bucket.s3.amazonaws.com/resumes/${resumeId}`,
      s3_key: `resumes/${resumeId}`
    };
  },
  
  confirmResumeUpload: async (resumeId, s3Key) => {
    await simulateDelay(400);
    // Simulate resume confirmation and parsing start
    return { success: true, status: 'parsing' };
  },
  
  getResumeStatus: async (resumeId) => {
    await simulateDelay(200);
    // Simulate resume parsing status check
    const components = getResumeComponents(resumeId);
    if (components) {
      return { status: 'parsed', components: components.components };
    }
    return { status: 'parsing' };
  },
  
  getResumeComponents: async (resumeId) => {
    await simulateDelay(300);
    const components = getResumeComponents(resumeId);
    return components ? components.components : null;
  }
};

// Jobs API
export const jobsAPI = {
  getJobs: async (filters = {}) => {
    await simulateDelay(400);
    return getJobs(filters);
  },
  
  getJobById: async (jobId) => {
    await simulateDelay(300);
    const job = getJobById(jobId);
    if (!job) {
      throw new Error('Job not found');
    }
    return job;
  },
  
  createJob: async (jobData) => {
    await simulateDelay(800);
    // Simulate job creation
    const newJob = {
      job_id: `job_${Date.now()}`,
      ...jobData,
      posted_at: new Date().toISOString(),
      status: 'open'
    };
    return { success: true, job: newJob };
  },
  
  updateJob: async (jobId, jobData) => {
    await simulateDelay(600);
    // Simulate job update
    return { success: true, job: { job_id: jobId, ...jobData } };
  },
  
  getCompanyJobs: async (companyId) => {
    await simulateDelay(300);
    return getCompanyJobs(companyId);
  }
};

// Applications API
export const applicationsAPI = {
  getApplications: async (userId) => {
    await simulateDelay(400);
    return getApplications(userId);
  },
  
  createApplication: async (applicationData) => {
    await simulateDelay(600);
    // Simulate application creation
    const newApplication = {
      application_id: `app_${Date.now()}`,
      ...applicationData,
      status: 'submitted',
      applied_at: new Date().toISOString()
    };
    return { success: true, application: newApplication };
  },
  
  getJobApplicants: async (jobId) => {
    await simulateDelay(400);
    return getJobApplicants(jobId);
  }
};

// Company API
export const companyAPI = {
  createCompany: async (companyData) => {
    await simulateDelay(800);
    // Simulate company creation
    const newCompany = {
      company_id: `comp_${Date.now()}`,
      ...companyData
    };
    return { success: true, company: newCompany };
  },
  
  updateCompany: async (companyId, companyData) => {
    await simulateDelay(600);
    // Simulate company update
    return { success: true, company: { company_id: companyId, ...companyData } };
  }
};

// Poster API
export const posterAPI = {
  getPosterProfile: async (userId) => {
    await simulateDelay(400);
    // Return demo poster profile
    return {
      user_id: userId,
      email: 'recruiter@example.com',
      user_type: 'poster',
      profile: {
        first_name: 'Sarah',
        last_name: 'Johnson',
        title: 'Senior Recruiter',
        company_id: 'comp_001'
      }
    };
  },
  
  updatePosterProfile: async (userId, profileData) => {
    await simulateDelay(600);
    // Simulate poster profile update
    return { success: true, profile: profileData };
  }
};

export default api;
