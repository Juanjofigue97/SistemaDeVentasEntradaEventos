// src/pages/Logout.tsx
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

const Logout = () => {
  const { setUser } = useAuth();

  useEffect(() => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.setItem("logout", "true");
  
    Swal.fire({
      icon: "info",
      title: "Cerrando sesión...",
      text: "Serás redirigido a la página principal",
      showConfirmButton: false,
      timer: 1500, 
      timerProgressBar: true,
      background: "#fff",
    });
  
    const timeout = setTimeout(() => {
      window.location.href = "/";
    }, 1500); 
  
    return () => clearTimeout(timeout); 
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <p className="text-gray-500 text-lg">Saliendo...</p>
    </div>
  );
};

export default Logout;
