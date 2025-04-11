import { useEffect, useState } from "react";
import TicketHistoryList from "./TicketHistoryList";

const Historial = () => {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserId(parsedUser.id);
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">🎟️ Historial de Compras</h2>
      {userId && <TicketHistoryList userId={userId} />}
    </div>
  );
};

export default Historial;
