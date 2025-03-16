import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, logout } from '../services/authService';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();
        setProfileData(response.user);
      } catch (err) {
        setError('Failed to load profile data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading profile data...</p>
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
    <div className="profile-page">
      <div className="container">
        <div className="card" style={{ maxWidth: '700px', margin: '80px auto' }}>
          <h1 style={{ marginBottom: '30px', color: 'var(--primary-red)' }}>User Profile</h1>
          
          <div className="profile-details">
            <div className="detail-item" style={{ marginBottom: '15px' }}>
              <strong>Name:</strong> {profileData?.name}
            </div>
            <div className="detail-item" style={{ marginBottom: '15px' }}>
              <strong>Email:</strong> {profileData?.email}
            </div>
            <div className="detail-item" style={{ marginBottom: '15px' }}>
              <strong>Company:</strong> {profileData?.company || 'Not specified'}
            </div>
            <div className="detail-item" style={{ marginBottom: '15px' }}>
              <strong>Role:</strong> {profileData?.role}
            </div>
          </div>
          
          <div style={{ marginTop: '30px' }}>
            <button 
              className="btn btn-primary"
              onClick={handleLogout}
              style={{ marginRight: '10px' }}
            >
              Logout
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => navigate('/')}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 