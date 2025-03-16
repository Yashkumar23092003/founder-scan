import React from 'react';
import { Link } from 'react-router-dom';
import UploadForm from '../components/UploadForm';
import { isAuthenticated } from '../services/authService';

const Home = () => {
  const authenticated = isAuthenticated();

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>Identify Successful Founders Before They Launch</h1>
            <p>
              Upload a LinkedIn profile PDF to analyze founder potential using our
              proprietary algorithm developed from studying successful venture-backed
              entrepreneurs.
            </p>
          </div>
        </div>
      </section>

      <section className="upload-section">
        <div className="container">
          <div className="section-header">
            <h2>Analyze Founder Potential</h2>
            <p>Upload a LinkedIn profile PDF to get started</p>
          </div>
          
          {authenticated ? (
            <>
              <UploadForm />
              <div className="upload-instructions">
                <h3>How to use:</h3>
                <ol>
                  <li>Save a LinkedIn profile as PDF (from browser: Print → Save as PDF)</li>
                  <li>Upload the PDF using the form above</li>
                  <li>Our algorithm will analyze the profile for founder potential</li>
                  <li>Review the detailed analysis and download the report</li>
                </ol>
              </div>
            </>
          ) : (
            <div className="login-prompt" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
              <div className="card" style={{ padding: '30px' }}>
                <h3 style={{ marginBottom: '15px', color: 'var(--primary-red)' }}>Authentication Required</h3>
                <p style={{ marginBottom: '20px' }}>
                  Please log in or create an account to analyze LinkedIn profiles.
                </p>
                <div>
                  <Link to="/login" className="btn btn-primary" style={{ marginRight: '10px' }}>
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-secondary">
                    Register
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why FounderScan?</h2>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Data-Driven Insights</h3>
              <p>
                Our algorithm is trained on profiles of successful founders backed by
                top VCs like Antler, EF, and Kalari.
              </p>
            </div>
            <div className="feature-card">
              <h3>Comprehensive Analysis</h3>
              <p>
                We evaluate experience, education, skills, and career trajectory to
                identify founder potential.
              </p>
            </div>
            <div className="feature-card">
              <h3>Save Time</h3>
              <p>
                Quickly screen potential founders before investing your valuable time
                in meetings.
              </p>
            </div>
            <div className="feature-card">
              <h3>Detailed Reports</h3>
              <p>
                Get downloadable reports with actionable insights and founder potential
                scores.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 