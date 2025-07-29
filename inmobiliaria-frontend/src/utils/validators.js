export const validateEmail = (email) => {
  if (!email.trim()) {
    return "El correo electrónico es requerido";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "El correo electrónico no es válido";
  }

  return null;
};

export const validatePassword = (password) => {
  if (!password) {
    return "La contraseña es requerida";
  }

  // Opción 1: Al menos 15 caracteres
  if (password.length >= 15) {
    return null;
  }

  // Opción 2: Al menos 8 caracteres con número y letra minúscula
  if (password.length >= 8) {
    const hasNumber = /\d/.test(password);
    const hasLowercase = /[a-z]/.test(password);

    if (hasNumber && hasLowercase) {
      return null;
    }
  }

  return "La contraseña debe tener al menos 15 caracteres O al menos 8 caracteres con un número y una letra minúscula";
};

export const validateUsername = (username) => {
  if (!username.trim()) {
    return "El nombre de usuario es requerido";
  }

  // Solo caracteres alfanuméricos y guiones
  const usernameRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?$/;
  if (!usernameRegex.test(username)) {
    return "El nombre de usuario solo puede contener caracteres alfanuméricos o guiones simples, y no puede comenzar ni terminar con un guión";
  }

  if (username.length < 3) {
    return "El nombre de usuario debe tener al menos 3 caracteres";
  }

  return null;
};

export const validateRequired = (value, fieldName) => {
  if (!value || !value.toString().trim()) {
    return `${fieldName} es requerido`;
  }
  return null;
};
