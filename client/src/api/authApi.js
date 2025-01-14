import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1';

// Register API
export const registerApi = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, { username, email, password });
    if (response.status === 200) {
      // Return token if registration is successful
      return response.data.token;
    } else {
      throw new Error('Registration failed');
    }
  } catch (error) {
    console.error('Error during registration:', error.response?.data || error.message);
    throw error; // rethrow error after logging
  }
}

// Login API
export const loginApi = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { username, password });
    if (response.status === 200) {
      // Save token to localStorage
      localStorage.setItem('token', response.data.token);
      return response.data.token;
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    console.error('Error during login:', error.response?.data || error.message);
    throw error; // rethrow error after logging
  }
};

// Fetch Menu API
export const fetchMenu = async () => {
  try {
    const response = await axios.get(`${API_URL}/menu`,);
    if (response.status === 200) {
      console.log(response.data.menuItems)
      return response.data.menuItems;
    } else {
      throw new Error('Failed to fetch menu');
    }
  } catch (error) {
    console.error('Error during fetchMenu:', error.response?.data || error.message);
    throw error; // rethrow error after logging
  }
};

// Place Order API
export const placeOrder = async (cart) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found, please log in');
  }

  try {
    const response = await axios.post(
      `${API_URL}/order`,
      { items: cart },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to place order');
    }
  } catch (error) {
    console.error('Error during placeOrder:', error.response?.data || error.message);
    throw error; // rethrow error after logging
  }
};
