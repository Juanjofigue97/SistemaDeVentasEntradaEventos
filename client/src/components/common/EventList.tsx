import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { getEvents } from "../../services/eventService";
import { Event } from "../../types/event";

const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (err: any) {
        setError(err.message || "Error al cargar eventos");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleSearchChange = (search: string) => {
    setSearchFilter(search.toLowerCase());
  };

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchFilter)
  );

  if (loading) {
    return <p className="text-center text-gray-600">Cargando eventos...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <section className="px-4 md:px-12 py-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        Próximos Eventos
      </h2>

      {/* Reemplaza esto con un input de búsqueda directamente */}
      <div className="mb-6 text-center">
        <input
          type="text"
          placeholder="Buscar eventos..."
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 w-full max-w-md"
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </section>
  );
};

export default EventList;
