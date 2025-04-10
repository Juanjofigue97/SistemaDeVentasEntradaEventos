// src/pages/AuthRequired.tsx
import { useNavigate } from "react-router-dom";

export default function AuthRequired() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <h1 className="text-2xl font-bold mb-4">🔒 Acceso restringido</h1>
      <p className="mb-6">Debes registrarte o iniciar sesión para acceder a esta sección.</p>
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/register")}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded"
        >
          Registrarse
        </button>
        <button
          onClick={() => navigate("/login")}
          className="bg-gray-800 hover:bg-gray-900 text-white font-semibold px-4 py-2 rounded"
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  );
}
