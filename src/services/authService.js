import axios from 'axios';

// Use relative path for API requests in production
const API_URL = '/api/auth';

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} - Registration response
 */
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Server error');
  }
};

/**
 * Login user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} - Login response
 */
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Server error');
  }
};

/**
 * Logout user
 */
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

/**
 * Get current user from localStorage
 * @returns {Object|null} - User data or null if not logged in
 */
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  return null;
};

/**
 * Get JWT token
 * @returns {string|null} - JWT token or null if not logged in
 */
export const getToken = () => {
  return localStorage.getItem('token');
};

/**
 * Check if user is authenticated
 * @returns {boolean} - True if user is authenticated
 */
export const isAuthenticated = () => {
  return getToken() !== null;
};

/**
 * Get user profile from server
 * @returns {Promise<Object>} - User profile data
 */
export const getUserProfile = async () => {
  try {
    const token = getToken();
    if (!token) throw new Error('No authentication token');
    
    const response = await axios.get(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Server error');
  }
};

// Other functions remain the same... 