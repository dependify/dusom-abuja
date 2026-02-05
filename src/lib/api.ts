// DUSOM API Client
// Replaces Supabase with direct API calls to the backend

// Use relative API URL for Vercel monolithic deployment
// In production, API routes are at /api/* via serverless functions
const API_URL = import.meta.env.VITE_API_URL || '/api';

// Storage keys
const ACCESS_TOKEN_KEY = 'dusom_access_token';
const REFRESH_TOKEN_KEY = 'dusom_refresh_token';

export interface ApiError {
  error: string;
  message?: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    role: string;
  };
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// Helper to get stored tokens
export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const setTokens = (accessToken: string, refreshToken: string): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const clearTokens = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

// Base API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers as Record<string, string>,
  };

  // Add auth token if available
  const token = getAccessToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Handle token refresh on 401
  if (response.status === 401 && token) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      // Retry the request with new token
      headers['Authorization'] = `Bearer ${getAccessToken()}`;
      const retryResponse = await fetch(url, {
        ...options,
        headers,
      });
      
      if (!retryResponse.ok) {
        const error = await retryResponse.json();
        throw new Error(error.error || 'Request failed');
      }
      
      return retryResponse.json();
    } else {
      clearTokens();
      window.location.href = '/admin/login';
      throw new Error('Session expired');
    }
  }

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Request failed');
  }

  return response.json();
}

// Refresh access token
async function refreshAccessToken(): Promise<boolean> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  try {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) return false;

    const data = await response.json();
    setTokens(data.accessToken, data.refreshToken);
    return true;
  } catch {
    return false;
  }
}

// =====================
// Auth API
// =====================
export const authApi = {
  signUp: (email: string, password: string) =>
    apiRequest<{ message: string; user: { id: string; email: string } }>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  signIn: async (email: string, password: string) => {
    const data = await apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setTokens(data.accessToken, data.refreshToken);
    return data;
  },

  signOut: async () => {
    const refreshToken = getRefreshToken();
    try {
      await apiRequest('/auth/logout', {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
      });
    } finally {
      clearTokens();
    }
  },

  getSession: () => {
    const token = getAccessToken();
    if (!token) return null;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        user: {
          id: payload.userId,
          email: payload.email,
          role: payload.role,
        },
        expires_at: payload.exp * 1000,
      };
    } catch {
      return null;
    }
  },

  getUser: () =>
    apiRequest<{ id: string; email: string; role: string; created_at: string; last_sign_in_at: string }>('/auth/me'),

  onAuthStateChange: (callback: (event: 'SIGNED_IN' | 'SIGNED_OUT', session: any) => void) => {
    // Simple implementation - in production you might want to use a more robust solution
    const checkAuth = () => {
      const session = authApi.getSession();
      callback(session ? 'SIGNED_IN' : 'SIGNED_OUT', session);
    };
    
    checkAuth();
    
    return {
      subscription: {
        unsubscribe: () => {},
      },
    };
  },

  changePassword: (currentPassword: string, newPassword: string) =>
    apiRequest<{ message: string }>('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    }),
};

// =====================
// Applications API
// =====================
export const applicationsApi = {
  create: () =>
    apiRequest<{ id: string; resume_token: string; status: string; current_step: number; created_at: string }>('/applications', {
      method: 'POST',
    }),

  getByToken: (token: string) =>
    apiRequest<any>(`/applications/token/${token}`),

  update: (token: string, data: any) =>
    apiRequest<any>(`/applications/token/${token}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  submit: (token: string) =>
    apiRequest<any>(`/applications/token/${token}/submit`, {
      method: 'POST',
    }),

  // Admin endpoints
  list: (params?: { status?: string; search?: string; page?: number; limit?: number }) =>
    apiRequest<{ data: any[]; total: number; page: number; limit: number }>(`/applications?${new URLSearchParams(params as any).toString()}`),

  getById: (id: string) =>
    apiRequest<any>(`/applications/${id}`),

  updateStatus: (id: string, status: string) =>
    apiRequest<any>(`/applications/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
};

// =====================
// Gallery API
// =====================
export const galleryApi = {
  list: (category?: string) =>
    apiRequest<any[]>(`/gallery?${category ? `category=${category}` : ''}`),

  listAdmin: () =>
    apiRequest<any[]>('/gallery/admin'),

  upload: (file: File, data: { title: string; alt_text?: string; category?: string; display_order?: number }) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', data.title);
    if (data.alt_text) formData.append('alt_text', data.alt_text);
    if (data.category) formData.append('category', data.category);
    if (data.display_order !== undefined) formData.append('display_order', String(data.display_order));

    return apiRequest<any>('/gallery', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set content-type for FormData
    });
  },

  update: (id: string, data: any) =>
    apiRequest<any>(`/gallery/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiRequest<{ message: string }>(`/gallery/${id}`, {
      method: 'DELETE',
    }),
};

// =====================
// Contact API
// =====================
export const contactApi = {
  submit: (data: { name: string; email: string; phone?: string; message: string; source?: string }) =>
    apiRequest<any>('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Admin endpoints
  list: (params?: { is_read?: boolean; page?: number; limit?: number }) =>
    apiRequest<{ data: any[]; total: number; page: number; limit: number }>(`/contact?${new URLSearchParams(params as any).toString()}`),

  markAsRead: (id: string, isRead: boolean) =>
    apiRequest<any>(`/contact/${id}/read`, {
      method: 'PATCH',
      body: JSON.stringify({ is_read: isRead }),
    }),

  delete: (id: string) =>
    apiRequest<{ message: string }>(`/contact/${id}`, {
      method: 'DELETE',
    }),
};

// =====================
// Newsletter API
// =====================
export const newsletterApi = {
  subscribe: (email: string) =>
    apiRequest<any>('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  unsubscribe: (email: string) =>
    apiRequest<any>('/newsletter/unsubscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  // Admin endpoints
  list: (params?: { is_active?: boolean; page?: number; limit?: number }) =>
    apiRequest<{ data: any[]; total: number; page: number; limit: number }>(`/newsletter?${new URLSearchParams(params as any).toString()}`),

  delete: (id: string) =>
    apiRequest<{ message: string }>(`/newsletter/${id}`, {
      method: 'DELETE',
    }),
};

// =====================
// Settings API
// =====================
export const settingsApi = {
  getAll: () =>
    apiRequest<{ data: any[]; settings: Record<string, string> }>('/settings'),

  getAllAdmin: () =>
    apiRequest<any[]>('/settings/admin'),

  get: (key: string) =>
    apiRequest<any>(`/settings/${key}`),

  update: (key: string, data: { setting_value?: string; description?: string }) =>
    apiRequest<any>(`/settings/${key}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  create: (data: { setting_key: string; setting_value?: string; description?: string }) =>
    apiRequest<any>('/settings', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  delete: (key: string) =>
    apiRequest<{ message: string }>(`/settings/${key}`, {
      method: 'DELETE',
    }),
};

// =====================
// Uploads API
// =====================
export const uploadsApi = {
  uploadDocument: (token: string, file: File, field: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('field', field);

    return apiRequest<{ url: string; filename: string; originalName: string }>(`/uploads/application/${token}`, {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set content-type for FormData
    });
  },
};
