import React from 'react';

const AnalysisMetrics = ({ metrics }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'var(--green)';
    if (score >= 60) return 'var(--yellow)';
    return 'var(--red)';
  };

  return (
    <div className="analysis-metrics card">
      <h3>Detailed Metrics</h3>
      
      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <div key={index} className="metric-item">
            <div className="metric-header">
              <h4>{metric.name}</h4>
              <div 
                className="metric-score" 
                style={{ backgroundColor: getScoreColor(metric.score) }}
              >
                {metric.score}
              </div>
            </div>
            <p className="metric-description">{metric.description}</p>
            <div className="metric-bar-container">
              <div 
                className="metric-bar" 
                style={{ 
                  width: `${metric.score}%`,
                  backgroundColor: getScoreColor(metric.score)
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalysisMetrics; 