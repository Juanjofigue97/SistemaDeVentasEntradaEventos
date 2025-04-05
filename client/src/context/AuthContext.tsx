// context/AuthContext.tsx

import { createContext, useContext, ReactNode, useState } from 'react';

interface AuthContextType {
  user: any; // El tipo de usuario puede variar dependiendo de tu implementación
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>({
    email: 'testuser@example.com',
    name: 'Test User',
  }); // Aquí simulamos un usuario autenticado por defecto

  // Si necesitas simular que el usuario no está autenticado, solo pon `null` o un valor vacío aquí
  // const [user, setUser] = useState<any>(null);

  const login = () => {
    setUser({
      email: 'testuser@example.com',
      name: 'Test User',
    }); // Simula un login
  };

  const logout = () => {
    setUser(null); // Simula el logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
