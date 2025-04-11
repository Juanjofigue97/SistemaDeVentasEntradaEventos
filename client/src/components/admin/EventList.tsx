import { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { Event } from "../../types/event";
import { getEvents, deleteEvent } from "../../services/eventService";
import Modal from "./EventModal";
import { Eye, Edit, Trash2, Plus } from "lucide-react";

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [modalType, setModalType] = useState<"create" | "edit" | "detail" | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const data = await getEvents();
    setEvents(data);
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Estás seguro de eliminar este evento?")) {
      await deleteEvent(id);
      fetchEvents();
    }
  };

  const openModal = (type: "create" | "edit" | "detail", event?: Event) => {
    setSelectedEvent(event || null);
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedEvent(null);
    fetchEvents();
  };

  const columns = useMemo<ColumnDef<Event>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "name",
        header: "Nombre",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "date",
        header: "Fecha",
        cell: (info) =>
          new Date(info.getValue() as string).toLocaleDateString(),
      },
      {
        accessorKey: "location",
        header: "Lugar",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "price",
        header: "Precio",
        cell: (info) => `$${info.getValue()}`,
      },
      {
        accessorKey: "estado",
        header: "Estado",
        cell: (info) => {
          const estado = info.getValue() as string;
          return (
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                estado === "activo"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {estado}
            </span>
          );
        },
      },
      {
        id: "acciones",
        header: "Acciones",
        cell: ({ row }) => {
          const event = row.original;
          return (
            <div className="flex gap-2 justify-center">
              <button
                title="Detalles"
                onClick={() => openModal("detail", event)}
                className="p-2 text-blue-600 hover:bg-blue-100 rounded transition"
              >
                <Eye size={18} />
              </button>
              <button
                title="Editar"
                onClick={() => openModal("edit", event)}
                className="p-2 text-yellow-600 hover:bg-yellow-100 rounded transition"
              >
                <Edit size={18} />
              </button>
              <button
                title="Eliminar"
                onClick={() => handleDelete(event.id)}
                className="p-2 text-red-600 hover:bg-red-100 rounded transition"
              >
                <Trash2 size={18} />
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: events,
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
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">🎟️ Eventos Registrados</h2>
        <button
          onClick={() => openModal("create")}
          className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-medium px-4 py-2 rounded-lg shadow-md transition duration-200"
        >
          <Plus size={18} /> Crear Evento
        </button>
      </div>

      <input
        type="text"
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="🔍 Buscar evento..."
        className="mb-4 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />

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

      {modalType && (
        <Modal
          type={modalType}
          event={selectedEvent}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
