// src/services/api.js

// Base de la API (sin /api al final)
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

function getToken() {
  return localStorage.getItem('token');
}

export async function apiRequest(path, { method = 'GET', body, headers } = {}) {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {}),
    },
  };

  const token = getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }

  const resp = await fetch(`${API_BASE_URL}${path}`, config);

  let data = null;
  const text = await resp.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!resp.ok) {
    const error = new Error(data?.message || `Error HTTP ${resp.status}`);
    error.status = resp.status;
    error.data = data;
    throw error;
  }

  return data;
}

// ========= AUTH =========

export function loginApi(email, password) {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: { email, password },
  });
}

export function getMe() {
  return apiRequest('/auth/me', { method: 'GET' });
}

// ========= LIBROS PÚBLICO =========

export function fetchBooks(params = {}) {
  const qs = new URLSearchParams(params).toString();
  const url = qs ? `/api/books?${qs}` : '/api/books';
  return apiRequest(url, { method: 'GET' });
}

export function fetchBookById(id) {
  return apiRequest(`/api/books/${id}`, { method: 'GET' });
}

// ========= LIBROS ADMIN =========

export function createBook(book) {
  return apiRequest('/api/admin/books', {
    method: 'POST',
    body: book,
  });
}

export function updateBook(id, book) {
  return apiRequest(`/api/admin/books/${id}`, {
    method: 'PUT',
    body: book,
  });
}

export function deleteBook(id) {
  return apiRequest(`/api/admin/books/${id}`, {
    method: 'DELETE',
  });
}
