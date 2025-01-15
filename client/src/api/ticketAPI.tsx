import { API_URL } from '../config';
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';

export const retrieveTickets = async (): Promise<TicketData[]> => {
  try {
    const response = await fetch(`${API_URL}/api/tickets`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch tickets');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching tickets:', error);
    throw error;
  }
};

export const retrieveTicket = async (id: number): Promise<TicketData> => {
  try {
    const response = await fetch(`${API_URL}/api/tickets/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch ticket');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching ticket:', error);
    throw error;
  }
};

export const createTicket = async (ticketData: Partial<TicketData>): Promise<ApiMessage> => {
  const response = await fetch(`${API_URL}/api/tickets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(ticketData)
  });
  return response.json();
};

export const updateTicket = async (id: number, ticketData: Partial<TicketData>): Promise<ApiMessage> => {
  const response = await fetch(`${API_URL}/api/tickets/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(ticketData)
  });
  return response.json();
};

export const deleteTicket = async (id: number): Promise<ApiMessage> => {
  const response = await fetch(`${API_URL}/api/tickets/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.json();
};