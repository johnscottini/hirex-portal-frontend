import axios from 'axios';
import type { User } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:8080',
} );

export const getUsers = () => api.get<User[]>('api/user');

export const getUserById = (id: string) => api.get<User>(`api/user/${id}`);

export default api;