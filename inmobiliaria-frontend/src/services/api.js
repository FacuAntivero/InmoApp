import axios from "axios";
const api = axios.create({ baseURL: "http://localhost:4000/api" });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Interceptor para agregar el token a las requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Si el token expiró, redirigir al login
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

// Funciones específicas para autenticación
export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
  verify: () => api.get("/auth/verify"),
  logout: () => api.post("/auth/logout"),
  forgotPassword: (email) => api.post("/auth/forgot-password", { email }),
  resetPassword: (token, password) =>
    api.post("/auth/reset-password", { token, password }),
};

// Funciones para propiedades
export const propertiesAPI = {
  getAll: (params) => api.get("/properties", { params }),
  getById: (id) => api.get(`/properties/${id}`),
  create: (propertyData) => api.post("/properties", propertyData),
  update: (id, propertyData) => api.put(`/properties/${id}`, propertyData),
  delete: (id) => api.delete(`/properties/${id}`),
  search: (searchParams) =>
    api.get("/properties/search", { params: searchParams }),
};

// Funciones para usuarios
export const usersAPI = {
  getProfile: () => api.get("/users/profile"),
  updateProfile: (userData) => api.put("/users/profile", userData),
  getFavorites: () => api.get("/users/favorites"),
  addFavorite: (propertyId) => api.post(`/users/favorites/${propertyId}`),
  removeFavorite: (propertyId) => api.delete(`/users/favorites/${propertyId}`),
};
export default api;
