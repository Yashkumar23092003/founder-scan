import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { extractTextFromPDF } from '../utils/pdfParser';
import { analyzeFounderPotential } from '../utils/founderAnalysis';
import { getToken, getCurrentUser } from '../services/authService';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
    } else {
      setFile(null);
      setError('Please select a valid PDF file');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a PDF file to upload');
      return;
    }

    setLoading(true);
    
    try {
      // Extract text from PDF
      const extractedText = await extractTextFromPDF(file);
      
      // Analyze the extracted text
      const analysisResults = analyzeFounderPotential(extractedText);
      
      // Store analysis results in localStorage with user ID
      const analysisId = Date.now().toString();
      localStorage.setItem(`analysis_${analysisId}`, JSON.stringify({
        ...analysisResults,
        userId: currentUser?.id,
        timestamp: new Date().toISOString()
      }));
      
      // Redirect to the analysis page
      navigate(`/analysis/${analysisId}`);
    } catch (err) {
      console.error('Error processing PDF:', err);
      setError('An error occurred while analyzing the file. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="upload-form-container">
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="file-input-container">
          <label htmlFor="pdf-upload" className="file-input-label">
            {file ? file.name : 'Choose LinkedIn PDF'}
          </label>
          <input
            type="file"
            id="pdf-upload"
            accept=".pdf"
            onChange={handleFileChange}
            className="file-input"
          />
        </div>
        
        {error && <p className="error-message">{error}</p>}
        
        <button 
          type="submit" 
          className="btn btn-primary upload-btn"
          disabled={loading || !file}
        >
          {loading ? 'Analyzing...' : 'Analyze Profile'}
        </button>
        
        {loading && (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <p>Analyzing profile data...</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default UploadForm; 