import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
  children: React.ReactNode;
  requiredAdmin?: boolean;
}

export default function ProtectedRoute({ children, requiredAdmin = false }: Props) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="text-center text-white mt-10">Cargando...</div>;
  }

  if (!user) {
    const wasLogout = localStorage.getItem("logout") === "true";
    if (wasLogout) {
      localStorage.removeItem("logout");
      return <Navigate to="/" replace />;
    }
    return <Navigate to="/auth-required" replace />;
  }

  if (requiredAdmin && !user.is_admin) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
