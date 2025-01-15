import { UserLogin } from "../interfaces/UserLogin";
import { API_URL } from '../config';

const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo)
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Invalid username or password');
    }

    return data;
  } catch (error: any) {
    if (error.message) {
      throw new Error(error.message);
    }
    throw new Error('An error occurred during login. Please try again.');
  }
};

export { login };