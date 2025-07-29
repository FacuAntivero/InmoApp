"use client";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../utils/validators";
import "../styles/Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    country: "Argentina",
    acceptUpdates: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const countries = [
    "Argentina",
    "México",
    "España",
    "Colombia",
    "Chile",
    "Perú",
    "Venezuela",
    "Ecuador",
    "Uruguay",
    "Paraguay",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    const usernameError = validateUsername(formData.username);
    if (usernameError) newErrors.username = usernameError;

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
      await register({
        email: formData.email,
        password: formData.password,
        username: formData.username,
        country: formData.country,
        acceptUpdates: formData.acceptUpdates,
      });
      navigate("/properties");
    } catch (error) {
      setErrors({
        general:
          error.message || "Error al crear la cuenta. Inténtalo de nuevo.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      {/* Panel izquierdo */}
      <div className="register-left-panel">
        <div className="register-decorative-elements">
          <div className="register-decoration register-decoration-1"></div>
          <div className="register-decoration register-decoration-2"></div>
          <div className="register-decoration register-decoration-3"></div>
        </div>

        <div className="register-left-content">
          <h1 className="register-left-title">Crea tu cuenta gratuita</h1>
          <p className="register-left-subtitle">
            Explora las mejores propiedades inmobiliarias y encuentra tu hogar
            ideal.
          </p>

          <div className="register-features">
            <div className="register-feature">
              <div className="register-feature-dot"></div>
              <span>Acceso a miles de propiedades</span>
            </div>
            <div className="register-feature">
              <div className="register-feature-dot"></div>
              <span>Herramientas de búsqueda avanzada</span>
            </div>
            <div className="register-feature">
              <div className="register-feature-dot"></div>
              <span>Contacto directo con agentes</span>
            </div>
            <div className="register-feature">
              <div className="register-feature-dot"></div>
              <span>Alertas personalizadas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Panel derecho */}
      <div className="register-right-panel">
        <div className="register-form-container">
          <div className="register-header-link">
            <span className="register-header-text">
              ¿Ya tienes una cuenta?{" "}
            </span>
            <Link to="/login" className="register-header-link-text">
              Iniciar sesión →
            </Link>
          </div>

          <h2 className="register-title">Regístrate en InmoApp</h2>

          <form className="register-form" onSubmit={handleSubmit}>
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
                Correo electrónico <span className="required-asterisk">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Correo electrónico"
                className={`form-input ${errors.email ? "error" : ""}`}
                disabled={isLoading}
                autoComplete="email"
              />
              {errors.email && (
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
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Contraseña <span className="required-asterisk">*</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••••"
                className={`form-input ${errors.password ? "error" : ""}`}
                disabled={isLoading}
                autoComplete="new-password"
              />
              <p className="form-help-text">
                La contraseña debe tener al menos 15 caracteres O al menos 8
                caracteres, incluido un número y una letra minúscula.
              </p>
              {errors.password && (
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
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Nombre de usuario <span className="required-asterisk">*</span>
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="usuario123"
                className={`form-input ${errors.username ? "error" : ""}`}
                disabled={isLoading}
                autoComplete="username"
              />
              <p className="form-help-text">
                El nombre de usuario solo puede contener caracteres
                alfanuméricos o guiones simples, y no puede comenzar ni terminar
                con un guión.
              </p>
              {errors.username && (
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
                  <span>{errors.username}</span>
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="country" className="form-label">
                Su país/región <span className="required-asterisk">*</span>
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="form-select"
                disabled={isLoading}
              >
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <p className="form-help-text">
                Por razones de cumplimiento, estamos obligados a recopilar
                información del país para enviarle actualizaciones y anuncios
                ocasionales.
              </p>
            </div>

            <div className="form-group">
              <h3 className="form-label">Preferencias de correo electrónico</h3>
              <div className="form-checkbox-group">
                <label className="form-checkbox-label">
                  <input
                    id="acceptUpdates"
                    name="acceptUpdates"
                    type="checkbox"
                    checked={formData.acceptUpdates}
                    onChange={handleChange}
                    className="form-checkbox"
                    disabled={isLoading}
                  />
                  <span>
                    Reciba actualizaciones y anuncios ocasionales de productos.
                  </span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="register-button"
              disabled={isLoading}
            >
              {isLoading ? <div className="loader"></div> : "Crear una cuenta"}
              {!isLoading && <span>→</span>}
            </button>
          </form>

          <div className="register-footer">
            <p>
              Al crear una cuenta, aceptas las{" "}
              <Link to="/terms" className="register-footer-link">
                Condiciones del Servicio
              </Link>
              . Para obtener más información sobre las prácticas de privacidad
              de InmoApp, consulta la{" "}
              <Link to="/privacy" className="register-footer-link">
                Declaración de Privacidad de InmoApp
              </Link>
              . Ocasionalmente, te enviaremos correos electrónicos relacionados
              con tu cuenta.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
