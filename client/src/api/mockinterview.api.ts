import axios from 'axios';
import { MockInterview } from '@/vite-env';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API_URL = `${API_BASE_URL}/mockinterview`;

const getAuthHeaders = (token: string) => ({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

// Create Interview
export const createInterview = async (interviewData: MockInterview, token: string) => {
  try {
    const response = await axios.post(`${API_URL}/create`, interviewData, getAuthHeaders(token));
    return response.data;
  } catch (error) {
    console.error('Error creating interview:', error);
    throw error;
  }
};

// Get All Interviews
export const getAllInterviews = async (id: string, token: string) => {
  try {
    const response = await axios.get(`${API_URL}/`, {
      params: { id },
      ...getAuthHeaders(token),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching interviews:', error);
    throw error;
  }
};

// Get Interview by ID
export const getInterviewByID = async (id: string, token: string) => {
  try {
    const response = await axios.get(`${API_URL}/`, {
      params: { id },
      ...getAuthHeaders(token),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching interview by ID:', error);
    throw error;
  }
};

// Edit Interview
export const editInterview = async (id: string, interviewData: MockInterview, token: string) => {
  try {
    const response = await axios.put(`${API_URL}/`, interviewData, {
      params: { id },
      ...getAuthHeaders(token),
    });
    return response.data;
  } catch (error) {
    console.error('Error editing interview:', error);
    throw error;
  }
};

// Delete Interview
export const deleteInterview = async (id: string, token: string) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${id}`, getAuthHeaders(token));
    return response.data;
  } catch (error) {
    console.error('Error deleting interview:', error);
    throw error;
  }
};
