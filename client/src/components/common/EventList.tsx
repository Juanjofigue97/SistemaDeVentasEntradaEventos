import { useState } from "react";
import EventCard from "./EventCard";
import EventFilters from "./EventFilters";

const events = [
  {
    id: 1,
    title: "Concierto de Rock",
    date: "2025-05-10",
    time: "20:00",
    location: "Estadio Nacional",
    image: "https://images.blackmagicdesign.com/images/media/releases/2020/20201207_anderson-paak-spotlight-concert/carousel/1-anderson-paak-spotlight-concert.jpg?_v=1605651980",
    category: "Conciertos",
    available: true,
  },
  {
    id: 2,
    title: "Conferencia de Tecnología",
    date: "2025-06-15",
    time: "10:00",
    location: "Centro de Convenciones",
    image: "https://images.blackmagicdesign.com/images/media/releases/2020/20201207_anderson-paak-spotlight-concert/carousel/1-anderson-paak-spotlight-concert.jpg?_v=1605651980",
    category: "Conferencias",
    available: false,
  },
  {
    id: 3,
    title: "Festival Gastronómico",
    date: "2025-07-01",
    time: "12:00",
    location: "Parque Central",
    image: "https://images.blackmagicdesign.com/images/media/releases/2020/20201207_anderson-paak-spotlight-concert/carousel/1-anderson-paak-spotlight-concert.jpg?_v=1605651980",
    category: "Festivales",
    available: false,
  },
];

const EventList = () => {
  const [categoryFilter, setCategoryFilter] = useState("Todos");
  const [searchFilter, setSearchFilter] = useState("");

  const handleFilterChange = (category: string, search: string) => {
    setCategoryFilter(category);
    setSearchFilter(search.toLowerCase());
  };

  const filteredEvents = events.filter((event) => {
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
