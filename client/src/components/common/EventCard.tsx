import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type EventCardProps = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: string;
  available: boolean;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("es", { month: "short" });
  const year = date.getFullYear();
  return { day, month, year };
};

const formatTime = (time: string) => {
  const [hour, minute] = time.split(":");
  return { hour, minute };
};

const EventCard = ({
  id,
  title,
  date,
  time,
  location,
  image,
  available,
}: EventCardProps) => {
  const navigate = useNavigate();
  const { day, month, year } = formatDate(date);
  const { hour, minute } = formatTime(time);

  const handleCardClick = () => {
    if (available) {
      navigate(`/comprar-entrada/${id}`, {
        state: { event: { id, title, date, time, location, image } }
      });
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className={`relative bg-white rounded-2xl overflow-hidden shadow-md transition duration-300 hover:-translate-y-1 dark:bg-gray-800 max-w-sm mx-auto ${
        available 
          ? "hover:shadow-xl cursor-pointer hover:border-2 hover:border-yellow-500" 
          : "opacity-80 cursor-not-allowed"
      }`}
    >
      {/* Sold Out etiqueta roja */}
      {!available && (
        <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold px-3 py-1 z-10 rounded-br-lg shadow-md">
          SOLD OUT
        </div>
      )}

      <img
        src={image}
        alt={title}
        className="w-full h-80 object-cover rounded-t-2xl"
      />

      <div className="p-4 flex flex-col min-h-[180px] justify-between">
        <div>
          <p className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
            <FaMapMarkerAlt />
            <span className="ml-1">{location}</span>
          </p>

          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {title}
          </h3>
        </div>

        {/* Fecha y hora */}
        <div className="flex justify-center items-center gap-6 text-center text-gray-800 dark:text-gray-100 mt-4">
          <div>
            <p className="text-2xl font-bold">{day}</p>
            <p className="text-sm uppercase">{month}</p>
            <p className="text-xs">{year}</p>
          </div>

          <div className="w-px h-10 bg-gray-300" />

          <div>
            <p className="text-2xl font-bold">{hour}</p>
            <p className="text-sm">{minute} hrs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;