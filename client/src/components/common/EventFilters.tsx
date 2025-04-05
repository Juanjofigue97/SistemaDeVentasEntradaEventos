import { useState } from "react";
import { FaSearch } from "react-icons/fa";

type Props = {
  onFilterChange: (category: string, search: string) => void;
};

const categories = ["Todos", "Conciertos", "Conferencias", "Festivales"];

const EventFilters = ({ onFilterChange }: Props) => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [search, setSearch] = useState("");

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    onFilterChange(cat, search);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onFilterChange(activeCategory, value);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 w-full">
      {/* Categorías - Visible solo en pantallas medianas y grandes */}
      <div className="hidden sm:flex gap-3 flex-wrap justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-2 rounded-full border text-sm transition 
              ${
                activeCategory === cat
                  ? "bg-yellow-500 text-white"
                  : "border-gray-300 dark:border-gray-600 hover:bg-yellow-500 hover:text-white dark:hover:bg-yellow-500"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Búsqueda - Visible siempre */}
      <div className="relative w-full max-w-sm">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <FaSearch />
        </div>
        <input
          type="text"
          placeholder="Buscar evento..."
          value={search}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-800 dark:text-white"
        />
      </div>
    </div>
  );
};

export default EventFilters;
