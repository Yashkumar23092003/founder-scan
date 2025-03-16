import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, getCurrentUser, logout } from '../services/authService';

const Header = () => {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();
  const currentUser = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <Link to="/">
            <h1>FounderScan</h1>
          </Link>
        </div>
        <nav className="nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            {authenticated ? (
              <>
                <li>
                  <Link to="/profile">{currentUser?.name || 'Profile'}</Link>
                </li>
                <li>
                  <button 
                    onClick={handleLogout}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'white',
                      cursor: 'pointer',
                      fontWeight: '500'
                    }}
                    className="nav-link"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 