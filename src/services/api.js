const API_BASE_URL = "http://biblioteca-backend-env.eba-y69gtg3a.us-east-1.elasticbeanstalk.com/api/books";

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

  const res = await fetch(`${API_BASE_URL}${path}`, config);
  const isJson = res.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await res.json() : null;

  if (!res.ok) {
    const message = data?.message || data?.error || res?.statusText || 'Error en la petición';
    throw new Error(message);
  }

  return data;
}

// ========================
// AUTH
// ========================

export function loginApi(email, password) {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: { email, password },
  });
}

export function getMe() {
  return apiRequest('/auth/me', { method: 'GET' });
}

export function registerUser({ name, email, password }) {
  return apiRequest('/auth/register', {
    method: 'POST',
    body: { name, email, password },
  });
}

export function changePassword({ currentPassword, newPassword }) {
  return apiRequest('/api/users/me/change-password', {
    method: 'POST',
    body: { currentPassword, newPassword },
  });
}

// ========================
// LIBROS PÚBLICOS
// ========================

export function fetchBooks({ page = 0, size = 100, q, category, priceMin, priceMax } = {}) {
  const params = new URLSearchParams();
  params.set('page', page);
  params.set('size', size);

  if (q) params.set('q', q);
  if (category && category !== 'Todas') params.set('category', category);
  if (priceMin != null) params.set('priceMin', priceMin);
  if (priceMax != null) params.set('priceMax', priceMax);

  const qs = params.toString();
  return apiRequest(`/api/books${qs ? `?${qs}` : ''}`);
}

export function fetchBookById(id) {
  return apiRequest(`/api/books/${id}`);
}

// ========================
// ADMIN LIBROS
// ========================

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
