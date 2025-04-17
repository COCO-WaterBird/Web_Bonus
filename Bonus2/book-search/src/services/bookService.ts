import axios from 'axios';
import { BookSearchResponse } from '../types/book';

const API_BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

export const searchBooks = async (query: string): Promise<BookSearchResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}?q=${encodeURIComponent(query)}&maxResults=20`);
    return response.data;
  } catch (error) {
    console.error('Error searching books:', error);
    throw error;
  }
};

export const getBookDetails = async (bookId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${bookId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching book details:', error);
    throw error;
  }
}; 