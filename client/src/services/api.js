// API Service for backend communication
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Helper function to make API requests with cookies
const apiCall = async (endpoint, options = {}) => {
  const { method = 'GET', body = null, headers = {} } = options;
  
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    credentials: 'include', // Include cookies in requests
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'API request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Authentication APIs
export const authAPI = {
  login: (email, password) =>
    apiCall('/auth/login', {
      method: 'POST',
      body: { email, password },
    }),

  signup: (email, name, password) =>
    apiCall('/auth/signup', {
      method: 'POST',
      body: { email, name, password },
    }),

  logout: () =>
    apiCall('/auth/signout', {
      method: 'POST',
    }),
};

// User APIs
export const userAPI = {
  getProfile: () =>
    apiCall('/user/', {
      method: 'GET',
    }),

  getTranscripts: () =>
    apiCall('/user/transcripts', {
      method: 'GET',
    }),

  getFolders: () =>
    apiCall('/user/folder', {
      method: 'GET',
    }),

  createTranscript: (data) =>
    apiCall('/user/transcript', {
      method: 'POST',
      body: data,
    }),

  createFolder: (data) =>
    apiCall('/user/folder', {
      method: 'POST',
      body: data,
    }),

  deleteTranscript: (transcriptId) =>
    apiCall(`/user/transcript/${transcriptId}`, {
      method: 'DELETE',
    }),

  deleteFolder: (folderId) =>
    apiCall(`/user/folder/${folderId}`, {
      method: 'DELETE',
    }),
  chatWithTranscript: (transcriptId, question) =>
    apiCall(`/user/transcript/${transcriptId}/chat`, {
      method: 'POST',
      body: { question },
    }),
};

// Extension APIs
export const extensionAPI = {
  createTranscript: (data) =>
    apiCall('/extension/create', {
      method: 'POST',
      body: data,
    }),

  processAudio: (audioFile) => {
    const formData = new FormData();
    formData.append('file', audioFile);
    
    return fetch(`${API_BASE_URL}/extension/audio`, {
      method: 'POST',
      body: audioFile, // Send raw audio bytes
      credentials: 'include',
    }).then(res => {
      if (!res.ok) throw new Error('Audio processing failed');
      return res.json();
    });
  },
};

export default apiCall;
