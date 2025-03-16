import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import { getCurrentUser } from '../services/authService';
import AnalysisReport from '../components/AnalysisReport';
import AnalysisMetrics from '../components/AnalysisMetrics';

const Analysis = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const currentUser = getCurrentUser();

  useEffect(() => {
    // Retrieve analysis data from localStorage
    const storedData = localStorage.getItem(`analysis_${id}`);
    
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      
      // Check if this analysis belongs to the current user
      if (parsedData.userId && parsedData.userId !== currentUser?.id) {
        setError('You do not have permission to view this analysis');
        setLoading(false);
        return;
      }
      
      setAnalysisData(parsedData);
      setLoading(false);
    } else {
      setError('Analysis data not found');
      setLoading(false);
    }
  }, [id, currentUser]);

  const handleDownloadReport = () => {
    const reportElement = document.getElementById('analysis-report');
    
    if (!reportElement) {
      alert('Report content not found');
      return;
    }
    
    const opt = {
      margin: 10,
      filename: `founder_analysis_${analysisData.name.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(reportElement).save();
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading analysis results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="analysis-page">
      <div className="container">
        <div className="analysis-header">
          <h1>Founder Potential Analysis</h1>
          <button 
            className="btn btn-primary download-btn"
            onClick={handleDownloadReport}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
            </svg>
            Download Report
          </button>
        </div>

        <div className="analysis-content" id="analysis-report">
          <AnalysisReport data={analysisData} />
          <AnalysisMetrics metrics={analysisData.metrics} />
        </div>
      </div>
    </div>
  );
};

export default Analysis; 