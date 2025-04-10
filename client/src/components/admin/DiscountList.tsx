export default function DiscountList() {
    return (
      <div className="border border-yellow-500 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Gestión de Descuentos</h2>
  
        <button className="mb-4 bg-yellow-500 text-gray-700 py-2 px-4 rounded hover:bg-yellow-600">
          Crear nuevo descuento
        </button>
  
        <table className="w-full text-left border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Código</th>
              <th className="p-2">Porcentaje</th>
              <th className="p-2">Válido hasta</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-2">PRIMAVERA25</td>
              <td className="p-2">25%</td>
              <td className="p-2">30/04/2025</td>
              <td className="p-2 space-x-2">
                <button className="text-blue-600 hover:underline">Editar</button>
                <button className="text-red-600 hover:underline">Eliminar</button>
              </td>
            </tr>
            {/* ...otros descuentos */}
          </tbody>
        </table>
      </div>
    );
  }
  