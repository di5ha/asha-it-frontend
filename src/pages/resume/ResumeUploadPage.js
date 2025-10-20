import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { resumeAPI } from '../../services/api';
import toast from 'react-hot-toast';
import './ResumeUploadPage.css';

const ResumeUploadPage = () => {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [resumeId, setResumeId] = useState(null);
  const [parsingStatus, setParsingStatus] = useState(null);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a PDF, DOC, or DOCX file');
      return;
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      toast.error('File size must be less than 10MB');
      return;
    }

    try {
      setUploading(true);
      setUploadProgress(0);

      // Step 1: Get pre-signed URL
      const uploadData = await resumeAPI.getResumeUploadUrl(file.name, file.type);
      setResumeId(uploadData.resume_id);

      // Step 2: Upload file to S3 (simulated)
      await simulateS3Upload(file, uploadData.upload_url);

      // Step 3: Confirm upload
      await resumeAPI.confirmResumeUpload(uploadData.resume_id, uploadData.s3_key);

      toast.success('Resume uploaded successfully! Starting parsing...');
      
      // Step 4: Start polling for parsing status
      pollParsingStatus(uploadData.resume_id);

    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload resume. Please try again.');
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const simulateS3Upload = async (file, uploadUrl) => {
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setUploadProgress(i);
    }
  };

  const pollParsingStatus = async (resumeId) => {
    const pollInterval = setInterval(async () => {
      try {
        const status = await resumeAPI.getResumeStatus(resumeId);
        setParsingStatus(status.status);

        if (status.status === 'parsed') {
          clearInterval(pollInterval);
          setUploading(false);
          toast.success('Resume parsed successfully!');
          navigate('/resume/components', { state: { resumeId } });
        } else if (status.status === 'failed') {
          clearInterval(pollInterval);
          setUploading(false);
          toast.error('Failed to parse resume. Please try uploading again.');
        }
      } catch (error) {
        console.error('Error checking parsing status:', error);
      }
    }, 2000);

    // Stop polling after 2 minutes
    setTimeout(() => {
      clearInterval(pollInterval);
      if (parsingStatus !== 'parsed') {
        setUploading(false);
        toast.error('Parsing timed out. Please try again.');
      }
    }, 120000);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    disabled: uploading
  });

  return (
    <div className="resume-upload-page">
      <div className="resume-upload-container">
        <div className="upload-header">
          <h1>Upload Your Resume</h1>
          <p>Upload your resume to get started with job applications</p>
        </div>

        <div className="upload-section">
          <div 
            {...getRootProps()} 
            className={`dropzone ${isDragActive ? 'active' : ''} ${uploading ? 'uploading' : ''}`}
          >
            <input {...getInputProps()} />
            
            {uploading ? (
              <div className="upload-progress">
                <div className="progress-icon">📤</div>
                <h3>Uploading Resume...</h3>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p>{uploadProgress}% complete</p>
                {parsingStatus && (
                  <p className="parsing-status">
                    Status: {parsingStatus === 'parsing' ? 'Parsing resume...' : parsingStatus}
                  </p>
                )}
              </div>
            ) : (
              <div className="dropzone-content">
                <div className="upload-icon">📄</div>
                <h3>
                  {isDragActive 
                    ? 'Drop your resume here' 
                    : 'Drag & drop your resume here'
                  }
                </h3>
                <p>or click to browse files</p>
                <div className="file-requirements">
                  <p>Supported formats: PDF, DOC, DOCX</p>
                  <p>Maximum file size: 10MB</p>
                </div>
              </div>
            )}
          </div>

          <div className="upload-tips">
            <h4>Tips for better parsing:</h4>
            <ul>
              <li>Use a clear, well-formatted resume</li>
              <li>Include your contact information</li>
              <li>List your work experience with dates</li>
              <li>Include your education background</li>
              <li>Add relevant skills and projects</li>
            </ul>
          </div>
        </div>

        <div className="upload-actions">
          <button 
            onClick={() => navigate('/onboarding')}
            className="back-btn"
            disabled={uploading}
          >
            Back to Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeUploadPage;
