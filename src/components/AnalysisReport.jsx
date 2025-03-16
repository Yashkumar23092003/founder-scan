import React from 'react';

const AnalysisReport = ({ data }) => {
  const { 
    name, 
    profileImage, 
    overallScore, 
    recommendation, 
    summary, 
    strengths, 
    weaknesses, 
    recommendations 
  } = data;

  const getScoreColor = (score) => {
    if (score >= 80) return 'var(--green)';
    if (score >= 60) return 'var(--yellow)';
    return 'var(--red)';
  };

  return (
    <div className="analysis-report card">
      <div className="profile-header">
        <div className="profile-image">
          <img src={profileImage} alt={name} />
        </div>
        <div className="profile-info">
          <h2>{name}</h2>
          <div className="score-container">
            <div 
              className="score-circle" 
              style={{ 
                background: `conic-gradient(
                  ${getScoreColor(overallScore)} ${overallScore * 3.6}deg, 
                  #f0f0f0 ${overallScore * 3.6}deg 360deg
                )` 
              }}
            >
              <div className="score-value">{overallScore}</div>
            </div>
            <div className="score-label">
              <h3>Founder Potential</h3>
              <p className="recommendation">{recommendation}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="report-section">
        <h3>Executive Summary</h3>
        <p>{summary}</p>
      </div>

      <div className="report-section">
        <h3>Key Strengths</h3>
        <ul className="strengths-list">
          {strengths.map((strength, index) => (
            <li key={index}>{strength}</li>
          ))}
        </ul>
      </div>

      <div className="report-section">
        <h3>Areas for Improvement</h3>
        <ul className="weaknesses-list">
          {weaknesses.map((weakness, index) => (
            <li key={index}>{weakness}</li>
          ))}
        </ul>
      </div>

      <div className="report-section">
        <h3>Recommendations</h3>
        <ul className="recommendations-list">
          {recommendations.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AnalysisReport; 