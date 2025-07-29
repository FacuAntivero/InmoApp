"use client";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "../styles/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Google login success:", decoded);
      setUser(decoded);
      navigate("/properties");
    } catch (error) {
      console.error("Error decoding token", error);
    }
  };

  const handleGoogleError = () => {
    console.error("Google login failed");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El correo electrónico no es válido";
    }

    if (!formData.password.trim()) {
      newErrors.password = "La contraseña es requerida";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await login(formData.email, formData.password);
      navigate("/properties");
    } catch (error) {
      setErrors({
        general:
          error.message ||
          "Error al iniciar sesión. Verifica tus credenciales.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <svg className="login-logo" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
        <h1 className="login-title">Iniciar sesión en InmoApp</h1>
      </div>

      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          {errors.general && (
            <div className="form-error">
              <svg
                className="form-error-icon"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{errors.general}</span>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Correo electrónico o nombre de usuario
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? "error" : ""}`}
              disabled={isLoading}
              autoComplete="username"
            />
            {errors.email && (
              <div className="form-error">
                <span>{errors.email}</span>
              </div>
            )}
          </div>

          <div className="form-group">
            <div className="password-header">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <Link to="/forgotpassword" className="forgot-password">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={`form-input ${errors.password ? "error" : ""}`}
              disabled={isLoading}
              autoComplete="current-password"
            />
            {errors.password && (
              <div className="form-error">
                <span>{errors.password}</span>
              </div>
            )}
          </div>
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? <div className="loader"></div> : "Iniciar sesión"}
          </button>

          <div className="divider">
            <span className="divider-text">o</span>
          </div>

          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />
        </form>

        <div className="login-footer">
          <p className="login-footer-text">
            ¿Nuevo en InmoApp?{" "}
            <Link to="/register" className="login-footer-link">
              Crear una cuenta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
