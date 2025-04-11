import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Event } from "../../types/event";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("es", { month: "short" });
  const year = date.getFullYear();
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  return { day, month, year, hour, minute };
};

const EventCard = ({
  id,
  name,
  date,
  location,
  image,
  estado,
  capacity,
  tickets_sold,
}: Event) => {
  const navigate = useNavigate();
  const { day, month, year, hour, minute } = formatDate(date);

  const available = estado === "activo" && tickets_sold < capacity;

  const handleCardClick = () => {
    if (available) {
      navigate(`/comprar-entrada/${id}`, {
        state: { event: { id, name, date, location, image } },
      });
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`relative bg-white rounded-2xl overflow-hidden shadow-md transition duration-300 hover:-translate-y-1 dark:bg-gray-800 w-full max-w-[280px] mx-auto flex flex-col ${
        available
          ? "hover:shadow-xl cursor-pointer hover:border-2 hover:border-yellow-500"
          : "opacity-80 cursor-not-allowed"
      }`}
      style={{ height: "100%" }}
    >
      {!available && (
        <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold px-3 py-1 z-10 rounded-br-lg shadow-md">
          SOLD OUT
        </div>
      )}

      <img
        src={image}
        alt={name}
        className="w-full h-56 object-cover rounded-t-2xl"
      />

      <div className="flex flex-col justify-between flex-grow p-4">
        <div>
          <p className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
            <FaMapMarkerAlt />
            <span className="ml-1">{location}</span>
          </p>

          <h3 className="text-lg font-semibold text-gray-800 dark:text-white line-clamp-2">
            {name}
          </h3>
        </div>

        <div className="flex justify-center items-center gap-6 text-center text-gray-800 dark:text-gray-100 mt-4">
          {/* Fecha */}
          <div>
            <p className="text-2xl font-bold">{day}</p>
            <p className="text-sm uppercase">{month}</p>
            <p className="text-xs">{year}</p>
          </div>

          {/* Separador */}
          <div className="w-px h-10 bg-gray-300 dark:bg-gray-600" />

          {/* Hora */}
          <div>
            <p className="text-2xl uppercase font-bold">{hour}:{minute}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
