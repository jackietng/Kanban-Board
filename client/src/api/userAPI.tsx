import { API_URL } from '../config';
import Auth from '../utils/auth';
import { UserData } from '../interfaces/UserData';
import { ApiMessage } from '../interfaces/ApiMessage';

const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${Auth.getToken()}`
});

export const retrieveUsers = async (): Promise<UserData[]> => {
  try {
    const response = await fetch(`${API_URL}/api/users`, {
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getUser = async (id: number): Promise<UserData> => {
  try {
    const response = await fetch(`${API_URL}/api/users/${id}`, {
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const updateUser = async (id: number, userData: UserData): Promise<ApiMessage> => {
  try {
    const response = await fetch(`${API_URL}/api/users/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error('Failed to update user');
    }

    return response.json();
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};