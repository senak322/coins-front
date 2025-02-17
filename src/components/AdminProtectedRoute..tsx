import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const user = useSelector((state: RootState) => state.user);
  // Если пользователь не авторизован или не админ, перенаправляем на главную
  if (!user || !user.user || user.user.role_id !== 2) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default AdminProtectedRoute;
