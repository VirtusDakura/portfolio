/**
 * API Utilities
 * 
 * Centralized API handling with error management, retries, and loading states.
 * Ready for backend integration with standardized request/response patterns.
 */

import { useState } from 'react';
import { API_CONFIG, ERROR_MESSAGES } from '../config/app.config.js';

/**
 * Custom fetch wrapper with error handling and retries
 * @param {string} url - API endpoint URL
 * @param {object} options - Fetch options
 * @param {number} retryCount - Current retry attempt
 * @returns {Promise} - Response data or error
 */
const fetchWithRetry = async (url, options = {}, retryCount = 0) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    if (retryCount < API_CONFIG.retryAttempts && !error.name === 'AbortError') {
      console.warn(`API request failed, retrying... (${retryCount + 1}/${API_CONFIG.retryAttempts})`);
      return fetchWithRetry(url, options, retryCount + 1);
    }
    throw error;
  }
};

/**
 * API service class for handling all backend communications
 */
export class ApiService {
  constructor() {
    this.baseUrl = API_CONFIG.baseUrl;
  }

  /**
   * Send contact form data
   * @param {object} formData - Contact form data
   * @returns {Promise} - API response
   */
  async sendContactForm(formData) {
    try {
      const response = await fetchWithRetry(
        `${this.baseUrl}${API_CONFIG.endpoints.contact}`,
        {
          method: 'POST',
          body: JSON.stringify(formData)
        }
      );
      return { success: true, data: response };
    } catch (error) {
      console.error('Contact form submission failed:', error);
      return { 
        success: false, 
        error: error.message || ERROR_MESSAGES.network 
      };
    }
  }

  /**
   * Fetch projects data
   * @returns {Promise} - Projects data
   */
  async getProjects() {
    try {
      const response = await fetchWithRetry(
        `${this.baseUrl}${API_CONFIG.endpoints.projects}`
      );
      return { success: true, data: response };
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      return { 
        success: false, 
        error: error.message || ERROR_MESSAGES.network 
      };
    }
  }

  /**
   * Fetch skills data
   * @returns {Promise} - Skills data
   */
  async getSkills() {
    try {
      const response = await fetchWithRetry(
        `${this.baseUrl}${API_CONFIG.endpoints.skills}`
      );
      return { success: true, data: response };
    } catch (error) {
      console.error('Failed to fetch skills:', error);
      return { 
        success: false, 
        error: error.message || ERROR_MESSAGES.network 
      };
    }
  }

  /**
   * Fetch experience data
   * @returns {Promise} - Experience data
   */
  async getExperience() {
    try {
      const response = await fetchWithRetry(
        `${this.baseUrl}${API_CONFIG.endpoints.experience}`
      );
      return { success: true, data: response };
    } catch (error) {
      console.error('Failed to fetch experience:', error);
      return { 
        success: false, 
        error: error.message || ERROR_MESSAGES.network 
      };
    }
  }
}

// Create singleton instance
export const apiService = new ApiService();

/**
 * Custom hook for API calls with loading and error states
 * @param {Function} apiCall - API function to call
 * @returns {object} - Loading state, data, error, and refetch function
 */
export const useApi = (apiCall) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall(...args);
      
      if (result.success) {
        setData(result.data);
      } else {
        setError(result.error);
      }
      
      return result;
    } catch (err) {
      setError(err.message || ERROR_MESSAGES.generic);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, execute };
};

export default apiService;
