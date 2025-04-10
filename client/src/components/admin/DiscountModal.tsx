import { useState, useEffect } from "react";
import { Discount } from "../../types/discount";
import { createDiscount, updateDiscount } from "../../services/discountService";

interface Props {
  type: "create" | "edit" | "detail";
  discount: Discount | null;
  onClose: () => void;
}

export default function DiscountModal({ type, discount, onClose }: Props) {
  const isView = type === "detail";

  const [form, setForm] = useState<Discount>({
    id: 0,
    code: "",
    percentage: 0,
    is_active: true,
  });

  useEffect(() => {
    if (discount) {
      setForm(discount);
    }
  }, [discount]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
  
    let newValue: string | number | boolean = value;
  
    // Para checkbox
    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      newValue = e.target.checked;
    }
  
    // Para campos numéricos
    if (e.target instanceof HTMLInputElement && e.target.type === "number") {
      newValue = parseFloat(e.target.value);
    }
  
    setForm((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = async () => {
    try {
      if (type === "edit" && discount) {
        await updateDiscount(discount.id, form);
      } else if (type === "create") {
        await createDiscount(form);
      }
      onClose();
    } catch (error) {
      console.error("Error al enviar el formulario de descuento:", error);
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
          {type === "create" && "Crear Descuento"}
          {type === "edit" && "Editar Descuento"}
          {type === "detail" && "Detalles del Descuento"}
        </h2>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Código</label>
            <input
              name="code"
              value={form.code}
              onChange={handleChange}
              disabled={isView}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Porcentaje (%)</label>
            <input
              type="number"
              name="percentage"
              value={form.percentage}
              onChange={handleChange}
              disabled={isView}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Estado</label>
            <select
              name="is_active"
              value={form.is_active ? "true" : "false"}
              onChange={(e) => handleChange({
                ...e,
                target: { ...e.target, value: e.target.value === "true", name: "is_active" }
              } as any)}
              disabled={isView}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-yellow-400"
            >
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
          </div>
        </div>

        {!isView && (
          <button
            onClick={handleSubmit}
            className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 rounded-xl transition duration-300"
          >
            {type === "edit" ? "Actualizar Descuento" : "Crear Descuento"}
          </button>
        )}
      </div>
    </div>
  );
}
