import { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { getAllTickets } from "../../services/ticketService";
import { Ticket } from "../../types/ticket";

export default function TicketList() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      const data = await getAllTickets();
      setTickets(data);
    };
    fetchTickets();
  }, []);

  const columns = useMemo<ColumnDef<Ticket>[]>(() => [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "event_id",
      header: "Evento ID",
    },
    {
      accessorKey: "entry_type_id",
      header: "Tipo de Entrada",
    },
    {
      accessorKey: "quantity",
      header: "Cantidad",
    },
    {
      accessorKey: "total_price",
      header: "Total",
      cell: (info) => `$${info.getValue<number>().toFixed(2)}`,
    },
  ], []);

  const table = useReactTable({
    data: tickets,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">🎟️ Entradas Compradas</h2>
      </div>

      <input
        type="text"
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="🔍 Buscar entrada..."
        className="mb-4 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />

      {tickets.length === 0 ? (
        <p className="text-gray-600">No hay entradas registradas.</p>
      ) : (
        <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl shadow">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="p-4 text-left">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-100">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
