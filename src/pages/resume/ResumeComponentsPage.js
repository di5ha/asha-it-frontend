import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { resumeAPI } from '../../services/api';
import { getResumeComponents } from '../../services/demoData';
import toast from 'react-hot-toast';
import ResumeComponentEditor from '../../components/resume/ResumeComponentEditor';
import './ResumeComponentsPage.css';

const ResumeComponentsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateResumeComponents, loading } = useApp();
  
  const [components, setComponents] = useState(null);
  const [loadingComponents, setLoadingComponents] = useState(true);
  const [editingComponent, setEditingComponent] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadResumeComponents();
  }, []);

  const loadResumeComponents = async () => {
    try {
      setLoadingComponents(true);
      
      // Get resume ID from location state or use demo data
      const resumeId = location.state?.resumeId || 'res_001';
      
      // In a real app, this would call the API
      const resumeData = getResumeComponents(resumeId);
      
      if (resumeData && resumeData.components) {
        setComponents(resumeData.components);
      } else {
        // Fallback to demo data
        setComponents({
          contact: {
            name: 'John Doe',
            email: 'john.doe@email.com',
            phone: '+1-555-0123',
            location: 'San Francisco, CA',
            linkedin: 'https://linkedin.com/in/johndoe',
            github: 'https://github.com/johndoe'
          },
          education: [
            {
              degree: 'Bachelor of Science in Computer Science',
              school: 'University of California, Berkeley',
              graduation_year: 2020,
              gpa: '3.8',
              relevant_courses: ['Data Structures', 'Algorithms', 'Software Engineering']
            }
          ],
          experience: [
            {
              title: 'Frontend Developer',
              company: 'Previous Company',
              duration: '2020-2023',
              description: 'Developed React applications and maintained frontend systems. Led a team of 3 developers.',
              achievements: ['Improved page load time by 40%', 'Implemented responsive design']
            }
          ],
          skills: {
            technical: ['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML', 'Node.js', 'Git'],
            soft: ['Leadership', 'Problem Solving', 'Communication', 'Teamwork']
          },
          projects: [
            {
              name: 'E-commerce Platform',
              description: 'Built a full-stack e-commerce platform using React and Node.js with payment integration',
              technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
              url: 'https://github.com/johndoe/ecommerce-platform'
            }
          ]
        });
      }
    } catch (error) {
      console.error('Error loading resume components:', error);
      toast.error('Failed to load resume components');
    } finally {
      setLoadingComponents(false);
    }
  };

  const handleComponentEdit = (componentType) => {
    setEditingComponent(componentType);
  };

  const handleComponentSave = async (componentType, updatedData) => {
    try {
      setSaving(true);
      
      const updatedComponents = {
        ...components,
        [componentType]: updatedData
      };
      
      setComponents(updatedComponents);
      setEditingComponent(null);
      
      // Save to profile
      await updateResumeComponents(updatedComponents);
      
      toast.success('Resume components updated successfully!');
    } catch (error) {
      console.error('Error saving components:', error);
      toast.error('Failed to save resume components');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAll = async () => {
    try {
      setSaving(true);
      await updateResumeComponents(components);
      toast.success('All resume components saved successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving all components:', error);
      toast.error('Failed to save resume components');
    } finally {
      setSaving(false);
    }
  };

  if (loadingComponents) {
    return (
      <div className="resume-components-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading resume components...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="resume-components-page">
      <div className="resume-components-container">
        <div className="components-header">
          <h1>Review & Edit Resume Components</h1>
          <p>Review the parsed information and make any necessary edits before saving</p>
        </div>

        <div className="components-content">
          {components && (
            <>
              {/* Contact Information */}
              <div className="component-section">
                <div className="component-header">
                  <h2>Contact Information</h2>
                  <button 
                    onClick={() => handleComponentEdit('contact')}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                </div>
                <div className="component-content">
                  <div className="contact-info">
                    <p><strong>Name:</strong> {components.contact?.name || 'Not provided'}</p>
                    <p><strong>Email:</strong> {components.contact?.email || 'Not provided'}</p>
                    <p><strong>Phone:</strong> {components.contact?.phone || 'Not provided'}</p>
                    <p><strong>Location:</strong> {components.contact?.location || 'Not provided'}</p>
                    {components.contact?.linkedin && (
                      <p><strong>LinkedIn:</strong> <a href={components.contact.linkedin} target="_blank" rel="noopener noreferrer">{components.contact.linkedin}</a></p>
                    )}
                    {components.contact?.github && (
                      <p><strong>GitHub:</strong> <a href={components.contact.github} target="_blank" rel="noopener noreferrer">{components.contact.github}</a></p>
                    )}
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="component-section">
                <div className="component-header">
                  <h2>Education</h2>
                  <button 
                    onClick={() => handleComponentEdit('education')}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                </div>
                <div className="component-content">
                  {components.education?.length > 0 ? (
                    <div className="education-list">
                      {components.education.map((edu, index) => (
                        <div key={index} className="education-item">
                          <h3>{edu.degree}</h3>
                          <p><strong>School:</strong> {edu.school}</p>
                          <p><strong>Graduation Year:</strong> {edu.graduation_year}</p>
                          {edu.gpa && <p><strong>GPA:</strong> {edu.gpa}</p>}
                          {edu.relevant_courses && (
                            <p><strong>Relevant Courses:</strong> {edu.relevant_courses.join(', ')}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No education information found</p>
                  )}
                </div>
              </div>

              {/* Experience */}
              <div className="component-section">
                <div className="component-header">
                  <h2>Work Experience</h2>
                  <button 
                    onClick={() => handleComponentEdit('experience')}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                </div>
                <div className="component-content">
                  {components.experience?.length > 0 ? (
                    <div className="experience-list">
                      {components.experience.map((exp, index) => (
                        <div key={index} className="experience-item">
                          <h3>{exp.title}</h3>
                          <p><strong>Company:</strong> {exp.company}</p>
                          <p><strong>Duration:</strong> {exp.duration}</p>
                          <p><strong>Description:</strong> {exp.description}</p>
                          {exp.achievements && exp.achievements.length > 0 && (
                            <div>
                              <strong>Achievements:</strong>
                              <ul>
                                {exp.achievements.map((achievement, i) => (
                                  <li key={i}>{achievement}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No work experience found</p>
                  )}
                </div>
              </div>

              {/* Skills */}
              <div className="component-section">
                <div className="component-header">
                  <h2>Skills</h2>
                  <button 
                    onClick={() => handleComponentEdit('skills')}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                </div>
                <div className="component-content">
                  {components.skills ? (
                    <div className="skills-content">
                      {components.skills.technical && (
                        <div>
                          <h4>Technical Skills:</h4>
                          <div className="skills-tags">
                            {components.skills.technical.map((skill, index) => (
                              <span key={index} className="skill-tag">{skill}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {components.skills.soft && (
                        <div>
                          <h4>Soft Skills:</h4>
                          <div className="skills-tags">
                            {components.skills.soft.map((skill, index) => (
                              <span key={index} className="skill-tag soft-skill">{skill}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p>No skills information found</p>
                  )}
                </div>
              </div>

              {/* Projects */}
              <div className="component-section">
                <div className="component-header">
                  <h2>Projects</h2>
                  <button 
                    onClick={() => handleComponentEdit('projects')}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                </div>
                <div className="component-content">
                  {components.projects?.length > 0 ? (
                    <div className="projects-list">
                      {components.projects.map((project, index) => (
                        <div key={index} className="project-item">
                          <h3>{project.name}</h3>
                          <p><strong>Description:</strong> {project.description}</p>
                          <p><strong>Technologies:</strong> {project.technologies?.join(', ')}</p>
                          {project.url && (
                            <p><strong>URL:</strong> <a href={project.url} target="_blank" rel="noopener noreferrer">{project.url}</a></p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No projects found</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="components-actions">
          <button 
            onClick={() => navigate('/resume/upload')}
            className="back-btn"
            disabled={saving}
          >
            Back to Upload
          </button>
          <button 
            onClick={handleSaveAll}
            className="save-btn"
            disabled={saving || loading}
          >
            {saving ? 'Saving...' : 'Save & Continue to Dashboard'}
          </button>
        </div>
      </div>

      {/* Component Editor Modal */}
      {editingComponent && (
        <ResumeComponentEditor
          componentType={editingComponent}
          componentData={components[editingComponent]}
          onSave={(data) => handleComponentSave(editingComponent, data)}
          onCancel={() => setEditingComponent(null)}
        />
      )}
    </div>
  );
};

export default ResumeComponentsPage;
