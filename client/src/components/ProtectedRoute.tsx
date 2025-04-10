// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
interface Props {
  children: React.ReactNode;
  requiredRole?: "admin" | "user";
}

export default function ProtectedRoute({ children, requiredRole }: Props) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="text-center text-white mt-10">Cargando...</div>;
  }

  if (!user) {
    const wasLogout = localStorage.getItem("logout") === "true";
    if (wasLogout) {
      localStorage.removeItem("logout"); // 👈 limpiamos para no afectar después
      return <Navigate to="/" replace />;
    }
    return <Navigate to="/auth-required" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}

