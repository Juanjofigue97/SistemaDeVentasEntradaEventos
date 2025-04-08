// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";

type Role = "admin" | "user";

interface User {
  email: string;
  role: Role;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (token: string, email: string) => void;
  logout: () => void;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (token: string, email: string) => {
    try {
      const decoded: any = jwtDecode(token);
      const role: Role = decoded.is_admin ? "admin" : "user";
      const userData: User = {
        email,
        role,
        token,
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Error al decodificar el token", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.setItem("logout", "true");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
  
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
