import { useAuth } from '../context/AuthContext'; // Importar el contexto de autenticación
import { Navigate } from 'react-router-dom'; // Para redirigir al login si no está autenticado

const ClientView = () => {
  const { user, logout } = useAuth(); // Desestructuramos el estado de autenticación y la función logout

  if (!user) {
    // Si no hay usuario autenticado, redirigir al login
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl">Bienvenido, {user.name}</h2>
      <p>¡Este es tu dashboard de cliente!</p>
      <button
        onClick={logout}
        className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded-lg"
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default ClientView;
