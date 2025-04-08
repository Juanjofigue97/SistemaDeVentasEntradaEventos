import { FormEvent, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaTicketAlt, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaMoneyBillWave, FaUser, FaCreditCard } from 'react-icons/fa';

// Tipos basados en tu estructura
type Evento = {
  id: string | number;
  nombre: string;
  descripcion: string;
  fecha: string;
  hora: string;
  lugar: string;
  cupo_total: number;
  precio_base: number;
  estado: string;
  image?: string;
};

type CompraData = {
  evento_id: string | number;
  usuario_id: string | number;
  fecha_compra: string;
  numero_entradas: number;
  total: number;
  codigo_descuento?: string;
  estado: string;
};

const CompraEntradaForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  // Datos hardcodeados del evento (luego vendrán de la API)
  const event: Evento = state?.event || {
    id: 1,
    nombre: "Concierto de Rock",
    descripcion: "Evento con las mejores bandas nacionales",
    fecha: "2023-12-15",
    hora: "20:00",
    lugar: "Estadio Nacional",
    cupo_total: 100,
    precio_base: 75.50,
    estado: "activo",
    image: "https://via.placeholder.com/800x400?text=Concierto+Rock"
  };

  // Estado del formulario
  const [formData, setFormData] = useState({
    cantidad: 1,
    codigoDescuento: '',
    metodoPago: 'tarjeta' as 'tarjeta' | 'transferencia' | 'efectivo',
    datosTarjeta: {
      numero: '',
      nombre: '',
      expiracion: '',
      cvv: ''
    },
    usuario_id: 'user123' // En producción esto vendría de la autenticación
  });

  // Cálculos derivados
  const subtotal = event.precio_base * formData.cantidad;
  const descuento = formData.codigoDescuento === 'DESCUENTO20' ? subtotal * 0.2 : 0;
  const total = subtotal - descuento;

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('tarjeta_')) {
      setFormData({
        ...formData,
        datosTarjeta: {
          ...formData.datosTarjeta,
          [name.split('_')[1]]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: name === 'cantidad' ? parseInt(value) || 0 : value
      });
    }
  };

  // Enviar formulario
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validaciones
    if (formData.cantidad < 1) {
      alert('La cantidad debe ser al menos 1');
      return;
    }

    if (formData.cantidad > event.cupo_total) {
      alert(`No hay suficientes entradas. Cupo disponible: ${event.cupo_total}`);
      return;
    }

    // Preparar datos para la API
    const compraData: CompraData = {
      evento_id: event.id,
      usuario_id: formData.usuario_id,
      fecha_compra: new Date().toISOString(),
      numero_entradas: formData.cantidad,
      total: total,
      codigo_descuento: formData.codigoDescuento || undefined,
      estado: 'pendiente'
    };

    try {
      // Aquí iría la llamada a tu API
      // const response = await api.post('/compras', compraData);
      
      console.log('Datos a enviar:', compraData);
      alert(`Compra exitosa! ID: ${Math.random().toString(36).substring(2, 9).toUpperCase()}`);
      navigate('/mis-compras');
    } catch (error) {
      console.error('Error en la compra:', error);
      alert('Error al procesar la compra');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b border-yellow-500 pb-2">
        <FaTicketAlt className="inline mr-2" />
        Comprar Entradas
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Sección de información del evento */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">{event.nombre}</h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <FaCalendarAlt className="text-yellow-500 mt-1 mr-3" />
              <div>
                <h3 className="font-semibold">Fecha y Hora</h3>
                <p>{new Date(event.fecha).toLocaleDateString('es-ES')} - {event.hora}</p>
              </div>
            </div>

            <div className="flex items-start">
              <FaMapMarkerAlt className="text-yellow-500 mt-1 mr-3" />
              <div>
                <h3 className="font-semibold">Lugar</h3>
                <p>{event.lugar}</p>
              </div>
            </div>

            <div className="flex items-start">
              <FaMoneyBillWave className="text-yellow-500 mt-1 mr-3" />
              <div>
                <h3 className="font-semibold">Precio Unitario</h3>
                <p>${event.precio_base.toFixed(2)}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="font-semibold mb-2">Descripción</h3>
              <p className="text-gray-600">{event.descripcion}</p>
            </div>
          </div>
        </div>

        {/* Formulario de compra */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cantidad de entradas
              </label>
              <input
                type="number"
                name="cantidad"
                min="1"
                max={event.cupo_total}
                value={formData.cantidad}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Máximo disponible: {event.cupo_total}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Código de descuento (opcional)
              </label>
              <input
                type="text"
                name="codigoDescuento"
                value={formData.codigoDescuento}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Ej: DESCUENTO20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Método de pago
              </label>
              <select
                name="metodoPago"
                value={formData.metodoPago}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                required
              >
                <option value="tarjeta">Tarjeta de crédito/débito</option>
                <option value="transferencia">Transferencia bancaria</option>
                <option value="efectivo">Pago en efectivo</option>
              </select>
            </div>

            {formData.metodoPago === 'tarjeta' && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                <h3 className="font-medium flex items-center">
                  <FaCreditCard className="mr-2 text-yellow-500" />
                  Datos de tarjeta
                </h3>
                <div>
                  <input
                    type="text"
                    name="tarjeta_numero"
                    placeholder="Número de tarjeta"
                    value={formData.datosTarjeta.numero}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                    maxLength={16}
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="tarjeta_nombre"
                    placeholder="Nombre en la tarjeta"
                    value={formData.datosTarjeta.nombre}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="tarjeta_expiracion"
                    placeholder="MM/AA"
                    value={formData.datosTarjeta.expiracion}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                    maxLength={5}
                    required
                  />
                  <input
                    type="text"
                    name="tarjeta_cvv"
                    placeholder="CVV"
                    value={formData.datosTarjeta.cvv}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                    maxLength={3}
                    required
                  />
                </div>
              </div>
            )}

            {/* Resumen de compra */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-medium mb-3 text-lg">Resumen de compra</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Entradas x{formData.cantidad}</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {descuento > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Descuento</span>
                    <span>-${descuento.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold border-t border-gray-200 pt-2 mt-2 text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-md transition duration-200"
            >
              Confirmar compra
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompraEntradaForm;