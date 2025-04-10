import { useState, useEffect } from "react";
import { Event } from "../../types/event";
import { uploadImage, createEvent, updateEvent } from "../../services/eventService";

interface Props {
  type: "create" | "edit" | "detail";
  event: Event | null;
  onClose: () => void;
}

export default function EventModal({ type, event, onClose }: Props) {
  const isView = type === "detail";

  const [form, setForm] = useState<Event>({
    id: 0,
    name: "",
    description: "",
    date: new Date().toISOString(),
    location: "",
    price: 0,
    capacity: 0,
    tickets_sold: 0,
    image: "",
    estado: "activo",
  });

  useEffect(() => {
    if (event) {
      setForm(event);
    }
  }, [event]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      try {
        const uploadedImageUrl = await uploadImage(file);
        setForm((prev) => ({ ...prev, image: uploadedImageUrl }));
      } catch (error) {
        console.error("Error subiendo imagen:", error);
      }
    }
  };

  const handleSubmit = async () => {
    const dataToSend = { ...form, estado: "activo" };

    if (type === "edit" && event) {
      await updateEvent(event.id, dataToSend);
    } else if (type === "create") {
      await createEvent(dataToSend);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-8 relative animate-fade-in">
        <button
          className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {type === "create" && "Crear Evento"}
          {type === "edit" && "Editar Evento"}
          {type === "detail" && "Detalles del Evento"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              disabled={isView}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Lugar</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              disabled={isView}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Fecha</label>
            <input
              type="datetime-local"
              name="date"
              value={form.date.slice(0, 16)}
              onChange={handleChange}
              disabled={isView}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Precio</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              disabled={isView}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Capacidad</label>
            <input
              type="number"
              name="capacity"
              value={form.capacity}
              onChange={handleChange}
              disabled={isView}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Imagen</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={isView}
              className="w-full p-2 border border-gray-300 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-yellow-500 file:text-white hover:file:bg-yellow-600"
            />
            {form.image && (type === "edit" || type === "detail") && (
              <img
                src={form.image}
                alt="Imagen del evento"
                className="mt-2 w-full h-40 object-cover rounded-xl border"
              />
            )}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Descripción</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            disabled={isView}
            className="w-full border border-gray-300 p-3 rounded-xl resize-none h-28 focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {!isView && (
          <button
            onClick={handleSubmit}
            className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 rounded-xl transition duration-300"
          >
            {type === "edit" ? "Actualizar Evento" : "Crear Evento"}
          </button>
        )}
      </div>
    </div>
  );
}
