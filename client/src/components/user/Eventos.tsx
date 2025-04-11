import { useAuth } from "../../context/AuthContext";
import EventList from "../common/EventList";

const Eventos = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="text-gray-700 dark:text-white">
        <h2 className="text-2xl font-bold mb-1">¿Qué vas a comprar hoy?</h2>
        <p className="text-sm text-gray-500">
          Bienvenido, <strong>{user?.email}</strong>
        </p>
      </div>

      <EventList />
    </div>
  );
};

export default Eventos;
