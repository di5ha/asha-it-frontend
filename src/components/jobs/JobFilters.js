import React, { useState } from 'react';
import './JobFilters.css';

const JobFilters = ({ filters, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const experienceLevels = [
    { value: '', label: 'All Levels' },
    { value: 'Entry', label: 'Entry Level' },
    { value: 'Junior', label: 'Junior' },
    { value: 'Mid-level', label: 'Mid-level' },
    { value: 'Senior', label: 'Senior' },
    { value: 'Lead', label: 'Lead' },
    { value: 'Principal', label: 'Principal' }
  ];

  const commonTags = [
    'react', 'javascript', 'python', 'java', 'typescript', 'node.js',
    'aws', 'docker', 'kubernetes', 'postgresql', 'mongodb', 'redis',
    'git', 'ci-cd', 'microservices', 'api', 'frontend', 'backend',
    'full-stack', 'devops', 'machine-learning', 'data-science'
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleTagToggle = (tag) => {
    const currentTags = localFilters.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    
    handleFilterChange('tags', newTags);
  };

  const clearFilters = () => {
    const clearedFilters = {
      location: '',
      experience_level: '',
      visa_sponsorship: undefined,
      tags: []
    };
    setLocalFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = () => {
    return localFilters.location || 
           localFilters.experience_level || 
           localFilters.visa_sponsorship !== undefined ||
           (localFilters.tags && localFilters.tags.length > 0);
  };

  return (
    <div className="job-filters">
      <div className="filters-header">
        <h3>Filters</h3>
        {hasActiveFilters() && (
          <button onClick={clearFilters} className="clear-filters-btn">
            Clear All
          </button>
        )}
      </div>

      <div className="filter-section">
        <label className="filter-label">Location</label>
        <input
          type="text"
          value={localFilters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
          placeholder="City, State, or Remote"
          className="filter-input"
        />
      </div>

      <div className="filter-section">
        <label className="filter-label">Experience Level</label>
        <select
          value={localFilters.experience_level}
          onChange={(e) => handleFilterChange('experience_level', e.target.value)}
          className="filter-select"
        >
          {experienceLevels.map(level => (
            <option key={level.value} value={level.value}>
              {level.label}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <label className="filter-label">Visa Sponsorship</label>
        <div className="radio-group">
          <label className="radio-option">
            <input
              type="radio"
              name="visa_sponsorship"
              checked={localFilters.visa_sponsorship === undefined}
              onChange={() => handleFilterChange('visa_sponsorship', undefined)}
            />
            <span>Any</span>
          </label>
          <label className="radio-option">
            <input
              type="radio"
              name="visa_sponsorship"
              checked={localFilters.visa_sponsorship === true}
              onChange={() => handleFilterChange('visa_sponsorship', true)}
            />
            <span>Required</span>
          </label>
          <label className="radio-option">
            <input
              type="radio"
              name="visa_sponsorship"
              checked={localFilters.visa_sponsorship === false}
              onChange={() => handleFilterChange('visa_sponsorship', false)}
            />
            <span>Not Required</span>
          </label>
        </div>
      </div>

      <div className="filter-section">
        <label className="filter-label">Skills & Technologies</label>
        <div className="tags-container">
          {commonTags.map(tag => (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={`tag-button ${
                localFilters.tags?.includes(tag) ? 'selected' : ''
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        {localFilters.tags && localFilters.tags.length > 0 && (
          <div className="selected-tags">
            <p>Selected: {localFilters.tags.join(', ')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobFilters;
