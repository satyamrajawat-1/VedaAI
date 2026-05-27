import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor — attach auth token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("vedaai_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        // Unauthorized — clear token and redirect to login
        if (typeof window !== "undefined") {
          localStorage.removeItem("vedaai_token");
          window.location.href = "/login";
        }
      }

      if (status === 500) {
        console.error("Server error:", error.response.data);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

// ============================================
// API Service Functions
// ============================================

// --- Assignments ---
export const assignmentApi = {
  getAll: () => api.get("/assignments"),
  getById: (id: string) => api.get(`/assignments/${id}`),
  create: (data: FormData) =>
    api.post("/assignments", data, {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 120000, // 2 min for AI generation
    }),
  update: (id: string, data: Record<string, unknown>) =>
    api.put(`/assignments/${id}`, data),
  delete: (id: string) => api.delete(`/assignments/${id}`),
  generate: (id: string) =>
    api.post(`/assignments/${id}/generate`, null, {
      timeout: 120000,
    }),
};

// --- Auth ---
export const authApi = {
  login: (data: { email: string; password: string }) =>
    api.post("/auth/login", data),
  register: (data: {
    name: string;
    email: string;
    password: string;
    schoolName: string;
    schoolLocation: string;
  }) => api.post("/auth/register", data),
  getProfile: () => api.get("/auth/profile"),
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("vedaai_token");
    }
  },
};
