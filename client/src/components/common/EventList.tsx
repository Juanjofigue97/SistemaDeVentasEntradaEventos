import { useState } from "react";
import EventCard from "./EventCard";
import EventFilters from "./EventFilters";
import { events as mockEvents } from "../../data/events";

const EventList = () => {
  const [categoryFilter, setCategoryFilter] = useState("Todos");
  const [searchFilter, setSearchFilter] = useState("");

  const handleFilterChange = (category: string, search: string) => {
    setCategoryFilter(category);
    setSearchFilter(search.toLowerCase());
  };

  const filteredEvents = mockEvents.filter((event) => {
    const matchesCategory =
      categoryFilter === "Todos" || event.category === categoryFilter;
    const matchesSearch = event.title.toLowerCase().includes(searchFilter);
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="px-4 md:px-12 py-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        Próximos Eventos
      </h2>

      <EventFilters onFilterChange={handleFilterChange} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </section>
  );
};

export default EventList;
