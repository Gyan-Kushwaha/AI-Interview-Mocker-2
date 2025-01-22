import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API_URL = `${API_BASE_URL}/users`;

interface RegisterUserPayload {
  name: string;
  email: string;
  password: string;
  firebaseUID: string;
}

interface LoginUserPayload {
  email: string;
  password: string;
}

interface EditUserPayload {
  name?: string;
  email?: string;
}

// Register User
export const registerUser = async (userData: RegisterUserPayload) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Login User
export const loginUser = async (userData: LoginUserPayload) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

// Edit User
export const editUser = async (userData: EditUserPayload) => {
  try {
    const response = await axios.put(`${API_URL}/edit`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error editing user:", error);
    throw error;
  }
};
