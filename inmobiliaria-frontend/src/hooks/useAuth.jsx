"use client";

import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      // Verificar si el token es válido
      verifyToken();
    } else {
      setIsLoading(false);
    }
  }, [token]);

  const verifyToken = async () => {
    try {
      const response = await api.get("/auth/verify", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data.user);
    } catch (error) {
      // Token inválido, limpiar
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token: newToken, user: userData } = response.data;

      localStorage.setItem("token", newToken);
      setToken(newToken);
      setUser(userData);

      return userData;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al iniciar sesión"
      );
    }
  };

  /*const register = async (userData) => {
    try {
      const response = await api.post("/auth/register", userData);
      const { token: newToken, user: newUser } = response.data;

      localStorage.setItem("token", newToken);
      setToken(newToken);
      setUser(newUser);

      return newUser;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Error al crear la cuenta"
      );
    }
  };
  */
  // Simular respuesta sin backend
  const register = async (userData) => {
    try {
      const fakeToken = "fake-jwt-token";
      const fakeUser = { ...userData, id: Date.now(), role: "user" };

      localStorage.setItem("token", fakeToken);
      setToken(fakeToken);
      setUser(fakeUser);

      return fakeUser;
    } catch (error) {
      throw new Error("Error simulado al crear la cuenta");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
