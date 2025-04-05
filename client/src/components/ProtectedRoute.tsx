// components/ProtectedRoute.tsx
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuth();

  // Aquí se simula que el usuario está autenticado siempre, y si el estado de `user` es null, se redirige al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>; // Si está autenticado, mostramos el contenido
};

export default ProtectedRoute;
