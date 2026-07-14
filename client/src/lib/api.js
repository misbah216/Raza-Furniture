import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('raza_admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getProducts = (params) => api.get('/products', { params }).then((r) => r.data);
export const getProduct = (id) => api.get(`/products/${id}`).then((r) => r.data);
export const getCategories = () => api.get('/products/categories/all').then((r) => r.data);

export const createProduct = (data) => api.post('/products', data).then((r) => r.data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data).then((r) => r.data);
export const deleteProduct = (id) => api.delete(`/products/${id}`).then((r) => r.data);

export const submitInquiry = (data) => api.post('/inquiries', data).then((r) => r.data);
export const getInquiries = () => api.get('/inquiries').then((r) => r.data);

export const submitBooking = (data) => api.post('/bookings', data).then((r) => r.data);
export const getBookings = () => api.get('/bookings').then((r) => r.data);
export const updateBookingStatus = (id, status) =>
  api.put(`/bookings/${id}`, { status }).then((r) => r.data);

export const getWork = () => api.get('/work').then((r) => r.data);
export const createWork = (data) => api.post('/work', data).then((r) => r.data);
export const deleteWork = (id) => api.delete(`/work/${id}`).then((r) => r.data);

export const adminLogin = (email, password) =>
  api.post('/auth/login', { email, password }).then((r) => r.data);
