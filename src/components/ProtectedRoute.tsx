import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;