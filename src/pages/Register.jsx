import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/authService';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { name, email, password, confirmPassword, company } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate password match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);

    try {
      const userData = { name, email, password, company };
      await register(userData);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="container">
        <div className="card" style={{ maxWidth: '500px', margin: '80px auto' }}>
          <h1 style={{ marginBottom: '30px', color: 'var(--primary-red)', textAlign: 'center' }}>Register</h1>
          
          {error && <div className="error-message" style={{ marginBottom: '20px' }}>{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label htmlFor="name" style={{ display: 'block', marginBottom: '8px' }}>Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid var(--gray)',
                  borderRadius: '4px'
                }}
              />
            </div>
            
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '8px' }}>Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid var(--gray)',
                  borderRadius: '4px'
                }}
              />
            </div>
            
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label htmlFor="company" style={{ display: 'block', marginBottom: '8px' }}>Company (Optional)</label>
              <input
                type="text"
                id="company"
                name="company"
                value={company}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid var(--gray)',
                  borderRadius: '4px'
                }}
              />
            </div>
            
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '8px' }}>Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                required
                minLength="6"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid var(--gray)',
                  borderRadius: '4px'
                }}
              />
            </div>
            
            <div className="form-group" style={{ marginBottom: '30px' }}>
              <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '8px' }}>Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                required
                minLength="6"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid var(--gray)',
                  borderRadius: '4px'
                }}
              />
            </div>
            
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ width: '100%' }}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
          
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--primary-red)' }}>Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 