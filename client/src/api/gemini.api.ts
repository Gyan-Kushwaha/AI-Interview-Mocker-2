import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API_URL = `${API_BASE_URL}/ai`;

interface GenerateRequest {
  jobRole: string;
  company: string;
  experienceLevel: string;
  skills: string[];
}

// Function to generate DSA questions
export const generateDSA = async (data: GenerateRequest): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(`${API_URL}/generatedsa`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response;
  } catch (error) {
    throw new Error(`Failed to generate DSA: ${error}`);
  }
};

// Function to generate tech stack questions
export const generateTechStack = async (data: GenerateRequest): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(`${API_URL}/generatedsa`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response;
  } catch (error) {
    throw new Error(`Failed to generate Tech Stack: ${error}`);
  }
};

// Function to generate core subject questions
export const generateCore = async (data: GenerateRequest): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(`${API_URL}/generatecore`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response;
  } catch (error) {
    throw new Error(`Failed to generate Core Questions: ${error}`);
  }
};

// Function to generate review
export const generateReview = async (data: GenerateRequest): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(`${API_URL}/generatecore`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response;
  } catch (error) {
    throw new Error(`Failed to generate Review: ${error}`);
  }
};
