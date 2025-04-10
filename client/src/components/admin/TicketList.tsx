export default function TicketList() {
    return (
      <div className="border border-yellow-500 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Entradas Vendidas</h2>
  
        <table className="w-full text-left border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Usuario</th>
              <th className="p-2">Evento</th>
              <th className="p-2">Cantidad</th>
              <th className="p-2">Total</th>
              <th className="p-2">Fecha</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-2">juan@email.com</td>
              <td className="p-2">Concierto de Rock</td>
              <td className="p-2">2</td>
              <td className="p-2">$80.000</td>
              <td className="p-2">05/04/2025</td>
            </tr>
            {/* ...otras entradas */}
          </tbody>
        </table>
      </div>
    );
  }
  