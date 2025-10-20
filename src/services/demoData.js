// Demo data service for development
export const demoJobs = [
  {
    job_id: "job_001",
    company_id: "comp_001",
    title: "Senior Frontend Engineer",
    description: "We're looking for a passionate Senior Frontend Engineer to join our team. You'll work with React, TypeScript, and modern web technologies to build amazing user experiences.",
    location: "San Francisco, CA",
    employment_type: "Full-time",
    salary_min: 120000,
    salary_max: 160000,
    currency: "USD",
    visa_sponsorship: true,
    experience_level: "Senior",
    tags: ["react", "typescript", "javascript", "css", "html"],
    posted_at: "2025-01-15T10:00:00Z",
    status: "open"
  },
  {
    job_id: "job_002",
    company_id: "comp_002",
    title: "Full Stack Developer",
    description: "Join our growing team as a Full Stack Developer. You'll work on both frontend and backend systems using modern technologies.",
    location: "Remote",
    employment_type: "Full-time",
    salary_min: 90000,
    salary_max: 130000,
    currency: "USD",
    visa_sponsorship: false,
    experience_level: "Mid-level",
    tags: ["react", "node.js", "python", "postgresql", "aws"],
    posted_at: "2025-01-14T14:30:00Z",
    status: "open"
  },
  {
    job_id: "job_003",
    company_id: "comp_003",
    title: "UI/UX Designer",
    description: "We're seeking a creative UI/UX Designer to help shape our product design. Experience with Figma and user research is essential.",
    location: "New York, NY",
    employment_type: "Full-time",
    salary_min: 80000,
    salary_max: 110000,
    currency: "USD",
    visa_sponsorship: true,
    experience_level: "Mid-level",
    tags: ["figma", "sketch", "adobe", "user-research", "prototyping"],
    posted_at: "2025-01-13T09:15:00Z",
    status: "open"
  },
  {
    job_id: "job_004",
    company_id: "comp_001",
    title: "Backend Engineer",
    description: "Looking for a Backend Engineer to work on our API and database systems. Experience with microservices architecture preferred.",
    location: "Austin, TX",
    employment_type: "Full-time",
    salary_min: 100000,
    salary_max: 140000,
    currency: "USD",
    visa_sponsorship: true,
    experience_level: "Senior",
    tags: ["python", "django", "postgresql", "redis", "docker"],
    posted_at: "2025-01-12T16:45:00Z",
    status: "open"
  },
  {
    job_id: "job_005",
    company_id: "comp_004",
    title: "DevOps Engineer",
    description: "Join our DevOps team to manage our cloud infrastructure and deployment pipelines. AWS and Kubernetes experience required.",
    location: "Seattle, WA",
    employment_type: "Full-time",
    salary_min: 110000,
    salary_max: 150000,
    currency: "USD",
    visa_sponsorship: false,
    experience_level: "Senior",
    tags: ["aws", "kubernetes", "docker", "terraform", "ci-cd"],
    posted_at: "2025-01-11T11:20:00Z",
    status: "open"
  }
];

export const demoCompanies = [
  {
    company_id: "comp_001",
    name: "TechCorp Inc.",
    description: "Leading technology company focused on innovative solutions",
    website: "https://techcorp.com",
    logo_url: "https://via.placeholder.com/100x100/4F46E5/FFFFFF?text=TC",
    location: "San Francisco, CA",
    size: "500-1000",
    industry: "Technology"
  },
  {
    company_id: "comp_002",
    name: "StartupXYZ",
    description: "Fast-growing startup in the fintech space",
    website: "https://startupxyz.com",
    logo_url: "https://via.placeholder.com/100x100/10B981/FFFFFF?text=SX",
    location: "Remote",
    size: "50-200",
    industry: "Fintech"
  },
  {
    company_id: "comp_003",
    name: "DesignStudio",
    description: "Creative agency specializing in digital experiences",
    website: "https://designstudio.com",
    logo_url: "https://via.placeholder.com/100x100/F59E0B/FFFFFF?text=DS",
    location: "New York, NY",
    size: "20-50",
    industry: "Design"
  },
  {
    company_id: "comp_004",
    name: "CloudTech Solutions",
    description: "Cloud infrastructure and DevOps consulting",
    website: "https://cloudtech.com",
    logo_url: "https://via.placeholder.com/100x100/EF4444/FFFFFF?text=CT",
    location: "Seattle, WA",
    size: "100-500",
    industry: "Cloud Services"
  }
];

export const demoApplications = [
  {
    application_id: "app_001",
    job_id: "job_001",
    applicant_user_id: "uid_001",
    resume_id: "res_001",
    selected_components: {
      contact: {
        name: "John Doe",
        email: "john.doe@email.com",
        phone: "+1-555-0123",
        location: "San Francisco, CA"
      },
      education: [
        {
          degree: "Bachelor of Science in Computer Science",
          school: "University of California, Berkeley",
          graduation_year: 2020,
          gpa: "3.8"
        }
      ],
      experience: [
        {
          title: "Frontend Developer",
          company: "Previous Company",
          duration: "2020-2023",
          description: "Developed React applications and maintained frontend systems"
        }
      ],
      skills: ["React", "TypeScript", "JavaScript", "CSS", "HTML"],
      projects: [
        {
          name: "E-commerce Platform",
          description: "Built a full-stack e-commerce platform using React and Node.js",
          technologies: ["React", "Node.js", "MongoDB"]
        }
      ]
    },
    status: "submitted",
    applied_at: "2025-01-16T10:00:00Z"
  },
  {
    application_id: "app_002",
    job_id: "job_002",
    applicant_user_id: "uid_002",
    resume_id: "res_002",
    selected_components: {
      contact: {
        name: "Jane Smith",
        email: "jane.smith@email.com",
        phone: "+1-555-0456",
        location: "Austin, TX"
      },
      education: [
        {
          degree: "Master of Science in Software Engineering",
          school: "University of Texas at Austin",
          graduation_year: 2021,
          gpa: "3.9"
        }
      ],
      experience: [
        {
          title: "Full Stack Developer",
          company: "Tech Startup",
          duration: "2021-2024",
          description: "Developed both frontend and backend systems using modern technologies"
        }
      ],
      skills: ["React", "Node.js", "Python", "PostgreSQL", "AWS"],
      projects: [
        {
          name: "Social Media API",
          description: "Built a scalable social media API with real-time features",
          technologies: ["Node.js", "Socket.io", "MongoDB", "Redis"]
        }
      ]
    },
    status: "reviewed",
    applied_at: "2025-01-15T14:30:00Z"
  }
];

export const demoResumeComponents = {
  res_001: {
    resume_id: "res_001",
    status: "parsed",
    parsed_at: "2025-01-15T15:30:00Z",
    components: {
      contact: {
        name: "John Doe",
        email: "john.doe@email.com",
        phone: "+1-555-0123",
        location: "San Francisco, CA",
        linkedin: "https://linkedin.com/in/johndoe",
        github: "https://github.com/johndoe"
      },
      education: [
        {
          degree: "Bachelor of Science in Computer Science",
          school: "University of California, Berkeley",
          graduation_year: 2020,
          gpa: "3.8",
          relevant_courses: ["Data Structures", "Algorithms", "Software Engineering"]
        }
      ],
      experience: [
        {
          title: "Frontend Developer",
          company: "Previous Company",
          duration: "2020-2023",
          description: "Developed React applications and maintained frontend systems. Led a team of 3 developers.",
          achievements: ["Improved page load time by 40%", "Implemented responsive design"]
        },
        {
          title: "Junior Developer",
          company: "Startup Inc.",
          duration: "2019-2020",
          description: "Worked on various web applications using modern JavaScript frameworks"
        }
      ],
      skills: {
        technical: ["React", "TypeScript", "JavaScript", "CSS", "HTML", "Node.js", "Git"],
        soft: ["Leadership", "Problem Solving", "Communication", "Teamwork"]
      },
      projects: [
        {
          name: "E-commerce Platform",
          description: "Built a full-stack e-commerce platform using React and Node.js with payment integration",
          technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
          url: "https://github.com/johndoe/ecommerce-platform"
        },
        {
          name: "Task Management App",
          description: "Created a collaborative task management application with real-time updates",
          technologies: ["React", "Socket.io", "Express", "PostgreSQL"],
          url: "https://github.com/johndoe/task-manager"
        }
      ]
    }
  },
  res_002: {
    resume_id: "res_002",
    status: "parsed",
    parsed_at: "2025-01-14T16:45:00Z",
    components: {
      contact: {
        name: "Jane Smith",
        email: "jane.smith@email.com",
        phone: "+1-555-0456",
        location: "Austin, TX",
        linkedin: "https://linkedin.com/in/janesmith",
        github: "https://github.com/janesmith"
      },
      education: [
        {
          degree: "Master of Science in Software Engineering",
          school: "University of Texas at Austin",
          graduation_year: 2021,
          gpa: "3.9",
          relevant_courses: ["Advanced Algorithms", "Database Systems", "Machine Learning"]
        }
      ],
      experience: [
        {
          title: "Full Stack Developer",
          company: "Tech Startup",
          duration: "2021-2024",
          description: "Developed both frontend and backend systems using modern technologies. Mentored junior developers.",
          achievements: ["Scaled application to handle 100k+ users", "Reduced server costs by 30%"]
        }
      ],
      skills: {
        technical: ["React", "Node.js", "Python", "PostgreSQL", "AWS", "Docker", "Kubernetes"],
        soft: ["Mentoring", "Project Management", "Agile Development", "Problem Solving"]
      },
      projects: [
        {
          name: "Social Media API",
          description: "Built a scalable social media API with real-time features and microservices architecture",
          technologies: ["Node.js", "Socket.io", "MongoDB", "Redis", "Docker"],
          url: "https://github.com/janesmith/social-api"
        }
      ]
    }
  }
};

export const demoUserProfile = {
  user_id: "uid_001",
  email: "john.doe@email.com",
  user_type: "applicant", // or "poster"
  profile: {
    first_name: "John",
    last_name: "Doe",
    phone: "+1-555-0123",
    location: "San Francisco, CA",
    work_auth: "US Citizen",
    status_enum: "authorized",
    eligible_start: "2025-02-01",
    expiry: "2025-12-31",
    resume_components: {
      contact: {},
      education: [],
      experience: [],
      skills: [],
      projects: []
    }
  }
};

export const demoPosterProfile = {
  user_id: "uid_poster_001",
  email: "recruiter@techcorp.com",
  user_type: "poster",
  profile: {
    first_name: "Sarah",
    last_name: "Johnson",
    title: "Senior Recruiter",
    company_id: "comp_001",
    company: {
      name: "TechCorp Inc.",
      description: "Leading technology company focused on innovative solutions",
      website: "https://techcorp.com",
      industry: "Technology",
      size: "500-1000"
    }
  }
};

// Helper functions to simulate API responses
export const getJobs = (filters = {}) => {
  let filteredJobs = [...demoJobs];
  
  if (filters.location) {
    filteredJobs = filteredJobs.filter(job => 
      job.location.toLowerCase().includes(filters.location.toLowerCase())
    );
  }
  
  if (filters.experience_level) {
    filteredJobs = filteredJobs.filter(job => 
      job.experience_level === filters.experience_level
    );
  }
  
  if (filters.visa_sponsorship !== undefined) {
    filteredJobs = filteredJobs.filter(job => 
      job.visa_sponsorship === filters.visa_sponsorship
    );
  }
  
  if (filters.tags && filters.tags.length > 0) {
    filteredJobs = filteredJobs.filter(job => 
      filters.tags.some(tag => job.tags.includes(tag))
    );
  }
  
  return {
    jobs: filteredJobs,
    total: filteredJobs.length,
    page: filters.page || 1,
    limit: filters.limit || 10
  };
};

export const getJobById = (jobId) => {
  const job = demoJobs.find(j => j.job_id === jobId);
  if (!job) return null;
  
  const company = demoCompanies.find(c => c.company_id === job.company_id);
  return { ...job, company };
};

export const getApplications = (userId) => {
  return demoApplications.filter(app => app.applicant_user_id === userId);
};

export const getResumeComponents = (resumeId) => {
  return demoResumeComponents[resumeId] || null;
};

export const getCompanyJobs = (companyId) => {
  return demoJobs.filter(job => job.company_id === companyId);
};

export const getJobApplicants = (jobId) => {
  return demoApplications.filter(app => app.job_id === jobId);
};
