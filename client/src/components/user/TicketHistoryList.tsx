import { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { getUserTickets, TicketHistory } from "../../services/ticketService";

interface Props {
  userId: number;
}

export default function TicketHistoryList({ userId }: Props) {
  const [tickets, setTickets] = useState<TicketHistory[]>([]);
  const [columnFilters, setColumnFilters] = useState<any[]>([]);

  useEffect(() => {
    getUserTickets(userId).then(setTickets).catch(console.error);
  }, [userId]);

  const columns = useMemo<ColumnDef<TicketHistory>[]>(() => [
    {
      accessorKey: "name_evento",
      header: "🎫 Evento",
      enableColumnFilter: true,
    },
    {
      accessorKey: "date",
      header: "📅 Fecha",
      cell: (info) =>
        new Date(info.getValue() as string).toLocaleDateString("es-ES"),
    },
    {
      accessorKey: "locacion",
      header: "📍 Lugar",
    },
    {
      accessorKey: "tipo_entrada",
      header: "🎟️ Tipo Entrada",
    },
    {
      accessorKey: "entradas",
      header: "🔢 Cantidad",
    },
    {
      accessorKey: "total",
      header: "💰 Total",
      cell: (info) => `$${info.getValue()}`,
    },
    {
      accessorKey: "estado",
      header: "📌 Estado",
      enableColumnFilter: true,
    },
  ], []);

  const table = useReactTable({
    data: tickets,
    columns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {/* Filtro por evento */}
        <input
          type="text"
          placeholder="Filtrar por evento..."
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={(table.getColumn("name_evento")?.getFilterValue() ?? "") as string}
          onChange={(e) => table.getColumn("name_evento")?.setFilterValue(e.target.value)}
        />

        {/* Filtro por estado */}
        <input
          type="text"
          placeholder="Filtrar por estado..."
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={(table.getColumn("estado")?.getFilterValue() ?? "") as string}
          onChange={(e) => table.getColumn("estado")?.setFilterValue(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl shadow">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-yellow-100 text-yellow-800 uppercase text-xs">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-3 text-left font-semibold">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-100">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-yellow-50 transition">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-3 text-gray-700">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {table.getRowModel().rows.length === 0 && (
          <div className="text-center p-6 text-gray-500">
            No se encontraron resultados con los filtros actuales.
          </div>
        )}
      </div>
    </div>
  );
}
