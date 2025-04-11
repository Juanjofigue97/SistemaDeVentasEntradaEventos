import { useState, useEffect } from "react";
import { EntryType, EntryTypeCreate } from "../../types/entryType";
import { createEntryType, updateEntryType } from "../../services/entryTypeService";

interface Props {
  type: "create" | "edit" | "detail";
  entryType: EntryType | null;
  onClose: () => void;
}

export default function EntryTypeModal({ type, entryType, onClose }: Props) {
  const isView = type === "detail";

  const [form, setForm] = useState<EntryTypeCreate>({
    event_id: 0,
    name: "",
    price: 0,
    capacity: 0,
  });

  useEffect(() => {
    if (entryType) {
      const { id, ...rest } = entryType;
      setForm(rest);
    }
  }, [entryType]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let newValue: string | number = value;

    if (e.target instanceof HTMLInputElement && e.target.type === "number") {
      newValue = parseFloat(e.target.value);
    }

    setForm((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = async () => {
    try {
      if (type === "edit" && entryType) {
        await updateEntryType(entryType.id, form);
      } else if (type === "create") {
        await createEntryType(form);
      }
      onClose();
    } catch (error) {
      console.error("Error al enviar el formulario de tipo de entrada:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-xl p-8 relative animate-fade-in">
        <button
          className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {type === "create" && "Crear Tipo de Entrada"}
          {type === "edit" && "Editar Tipo de Entrada"}
          {type === "detail" && "Detalles del Tipo de Entrada"}
        </h2>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Evento ID</label>
            <input
              type="number"
              name="event_id"
              value={form.event_id}
              onChange={handleChange}
              disabled={isView}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-yellow-400"
            />
          </div>
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
        </div>

        {!isView && (
          <button
            onClick={handleSubmit}
            className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 rounded-xl transition duration-300"
          >
            {type === "edit" ? "Actualizar Tipo" : "Crear Tipo"}
          </button>
        )}
      </div>
    </div>
  );
}
