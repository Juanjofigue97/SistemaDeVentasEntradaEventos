import { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { EntryType } from "../../types/entryType";
import {
  getAllEntryTypes,
  deleteEntryType,
} from "../../services/entryTypeService";
import EntryTypeModal from "./EntryTypeModal";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Eye } from "lucide-react";

export default function EntryTypeList() {
  const [entryTypes, setEntryTypes] = useState<EntryType[]>([]);
  const [selected, setSelected] = useState<EntryType | null>(null);
  const [modalType, setModalType] = useState<"create" | "edit" | "detail" | null>(null);
  const [globalFilter, setGlobalFilter] = useState("");

  const fetchEntryTypes = async () => {
    const data = await getAllEntryTypes();
    setEntryTypes(data);
  };

  useEffect(() => {
    fetchEntryTypes();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("¿Estás seguro de eliminar este tipo de entrada?")) {
      await deleteEntryType(id);
      fetchEntryTypes();
    }
  };

  const openModal = (type: "create" | "edit" | "detail", entryType?: EntryType) => {
    setSelected(entryType || null);
    setModalType(type);
  };

  const closeModal = () => {
    setSelected(null);
    setModalType(null);
    fetchEntryTypes();
  };

  const columns = useMemo<ColumnDef<EntryType>[]>(() => [
    {
      accessorKey: "name",
      header: "Nombre",
    },
    {
      accessorKey: "price",
      header: "Precio",
    },
    {
      accessorKey: "capacity",
      header: "Cupos",
    },
    {
      header: "Acciones",
      id: "actions",
      cell: ({ row }) => (
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => openModal("detail", row.original)}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded transition"
          >
            <Eye size={18} />
          </button>
          <button
            onClick={() => openModal("edit", row.original)}
            className="text-yellow-500 hover:text-yellow-600"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDelete(row.original.id)}
            className="text-red-500 hover:text-red-600"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ], []);

  const table = useReactTable({
    data: entryTypes,
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">🎫 Tipos de Entrada</h2>
        <button
          onClick={() => openModal("create")}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl"
        >
          Crear Tipo
        </button>
      </div>

      <input
        type="text"
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="🔍 Buscar tipo..."
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
        <EntryTypeModal type={modalType} entryType={selected} onClose={closeModal} />
      )}
    </div>
  );
}
