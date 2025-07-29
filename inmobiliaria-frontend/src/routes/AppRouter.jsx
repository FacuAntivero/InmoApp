import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { Properties } from "../pages/Properties";
import { PropertyDetail } from "../pages/PropertyDetail";
import { AdminProperties } from "../pages/AdminProperties";
import { PropertyForm } from "../pages/PropertyForm";
import ForgotPassword from "../pages/ForgotPassword"; // Ajustá la ruta si es distinta

// Ruta privada: requiere usuario logueado
function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

// Ruta de administrador: requiere rol 'admin'
function AdminRoute({ children }) {
  const { user } = useAuth();
  return user?.role === "admin" ? (
    children
  ) : (
    <Navigate to="/properties" replace />
  );
}

// Redirección inicial según estado de autenticación
function HomeRedirect() {
  const { user } = useAuth();
  return user ? (
    <Navigate to="/properties" replace />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirige a login o propiedades según sesión */}
        <Route path="/" element={<HomeRedirect />} />

        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:id" element={<PropertyDetail />} />

        {/* Rutas de administrador */}
        <Route
          path="/admin/properties"
          element={
            <PrivateRoute>
              <AdminRoute>
                <AdminProperties />
              </AdminRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/properties/new"
          element={
            <PrivateRoute>
              <AdminRoute>
                <PropertyForm />
              </AdminRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/properties/:id/edit"
          element={
            <PrivateRoute>
              <AdminRoute>
                <PropertyForm />
              </AdminRoute>
            </PrivateRoute>
          }
        />

        {/* Redirige cualquier ruta no encontrada a la lógica inicial */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
