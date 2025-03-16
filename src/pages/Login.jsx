import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="card" style={{ maxWidth: '500px', margin: '80px auto' }}>
          <h1 style={{ marginBottom: '30px', color: 'var(--primary-red)', textAlign: 'center' }}>Login</h1>
          
          {error && <div className="error-message" style={{ marginBottom: '20px' }}>{error}</div>}
          
          <form onSubmit={handleSubmit}>
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
            
            <div className="form-group" style={{ marginBottom: '30px' }}>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '8px' }}>Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
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
            
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ width: '100%' }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            Don't have an account? <Link to="/register" style={{ color: 'var(--primary-red)' }}>Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 