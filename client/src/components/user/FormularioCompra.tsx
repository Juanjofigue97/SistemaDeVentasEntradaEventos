import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EntryType } from "../../types/entryType";
import { buyTicket, getEntryTypesByEvent, validateDiscount } from "../../services/ticketService";
import { TicketCreate } from "../../types/ticket";
import Swal from "sweetalert2";

interface Props {
  eventId: number;
}

const FormularioCompra = ({ eventId }: Props) => {
  const [entryTypes, setEntryTypes] = useState<EntryType[]>([]);
  const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [discountCode, setDiscountCode] = useState("");
  const [price, setPrice] = useState<number | null>(null);
  const [finalPrice, setFinalPrice] = useState<number | null>(null);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const formatMoney = (amount: number | null) => {
    if (amount === null) return "";
    return amount.toLocaleString("es-CO", { style: "currency", currency: "COP" });
  };

  useEffect(() => {
    const fetchTypes = async () => {
      const data = await getEntryTypesByEvent(eventId);
      setEntryTypes(data);
    };
    fetchTypes();
  }, [eventId]);

  useEffect(() => {
    if (selectedTypeId !== null) {
      const type = entryTypes.find((et) => et.id === selectedTypeId);
      if (type) {
        const basePrice = type.price * quantity;
        setPrice(basePrice);
        setFinalPrice(basePrice);
        setDiscountApplied(false);
      }
    }
  }, [selectedTypeId, quantity]);

  const handleApplyDiscount = async () => {
    if (!selectedTypeId) {
      Swal.fire({
        icon: "warning",
        title: "Tipo de entrada no seleccionado",
        text: "Debes seleccionar un tipo de entrada.",
      });
      return;
    }
    if (!discountCode.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Código no válido",
        text: "Debes ingresar un código de descuento.",
      });
      return;
    }
  
    setLoading(true);
    try {
      const result = await validateDiscount({
        event_id: eventId,
        entry_type_id: selectedTypeId,
        quantity,
        discount_code: discountCode.trim(),
      });
  
      setFinalPrice(result.final_price);
      setDiscountApplied(true);
  
      Swal.fire({
        icon: "success",
        title: "Descuento aplicado",
        html: `
          <p><strong>Código:</strong> ${discountCode.toUpperCase()}</p>
          <p><strong>Descuento:</strong> ${result.discount_percentage}%</p>
          <p><strong>Precio por entrada:</strong> $${result.price_per_ticket}</p>
          <p><strong>Cantidad:</strong> ${result.quantity}</p>
          <p><strong>Precio final:</strong> <strong>$${result.final_price}</strong></p>
        `,
      });
  
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Código inválido",
        text: "Código de descuento inválido o error al aplicar.",
      });
      setDiscountApplied(false);
      setFinalPrice(price);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedTypeId) {
      Swal.fire({
        icon: "warning",
        title: "Campo obligatorio",
        text: "Debes seleccionar un tipo de entrada.",
      });
      return;
    }
  
    setLoading(true);
    try {
      const ticket: TicketCreate = {
        event_id: eventId,
        entry_type_id: selectedTypeId,
        quantity,
        discount_code: discountCode.trim() || undefined,
      };
  
      await buyTicket(ticket);
  
      Swal.fire({
        icon: "success",
        title: "Compra realizada con éxito",
        html: discountApplied
          ? `Se aplicó un <strong>${discountCode.toUpperCase()}</strong> con <strong>${((price! - finalPrice!) / price! * 100).toFixed(0)}%</strong> de descuento.`
          : "Gracias por tu compra.",
      }).then(() => {
        navigate("/dashboard");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al procesar la compra.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Tipo de entrada</label>
        <select
          value={selectedTypeId ?? ""}
          onChange={(e) => setSelectedTypeId(Number(e.target.value))}
          className="mt-1 w-full border border-gray-300 rounded-md p-2"
        >
          <option value="" disabled>Selecciona un tipo</option>
          {entryTypes.map((et) => (
            <option key={et.id} value={et.id}>
              {et.name} – {formatMoney(et.price)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Cantidad</label>
        <input
          type="number"
          value={quantity}
          min={1}
          className="mt-1 w-full border border-gray-300 rounded-md p-2"
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Código de descuento</label>
        <div className="flex gap-2 mt-1">
          <input
            type="text"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md p-2"
            placeholder="Ingresa el código"
          />
          <button
            onClick={handleApplyDiscount}
            className="bg-yellow-500 text-white px-4 rounded hover:bg-yellow-600"
            disabled={loading}
          >
            Aplicar
          </button>
        </div>
      </div>

      {price !== null && (
        <div className="mt-4">
          <p className="text-lg">
            Precio total:{" "}
            {discountApplied ? (
              <>
                <span className="line-through text-gray-500">{formatMoney(price)}</span>{" "}
                <span className="text-green-600 font-bold">{formatMoney(finalPrice)}</span>
              </>
            ) : (
              <span className="font-semibold text-gray-800">{formatMoney(price)}</span>
            )}
          </p>
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        disabled={loading || !selectedTypeId}
      >
        Comprar
      </button>
    </div>
  );
};

export default FormularioCompra;
