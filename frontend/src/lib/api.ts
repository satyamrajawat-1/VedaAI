import axios from "axios";

const PRODUCTION_API = "https://vedaai-v3me.onrender.com/api/v1";
const LOCAL_API = "http://localhost:8000/api/v1";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://vedaai-v3me.onrender.com/api/v1",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
     
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


export const assignmentApi = {
  getAll: () => api.get("/assignments"),
  getById: (id: string) => api.get(`/assignments/${id}`),
  create: (data: FormData) =>
    api.post("/assignments", data, {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 120000, 
    }),
  update: (id: string, data: Record<string, unknown>) =>
    api.put(`/assignments/${id}`, data),
  delete: (id: string) => api.delete(`/assignments/${id}`),
  generate: (id: string) =>
    api.post(`/assignments/${id}/generate`, null, {
      timeout: 120000,
    }),
};


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
