import { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { Discount } from "../../types/discount";
import { getAllDiscounts, deleteDiscount } from "../../services/discountService";
import DiscountModal from "./DiscountModal";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Eye } from "lucide-react";

export default function DiscountList() {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [selected, setSelected] = useState<Discount | null>(null);
  const [modalType, setModalType] = useState<"create" | "edit" | "detail" | null>(null);
  const [globalFilter, setGlobalFilter] = useState("");

  const fetchDiscounts = async () => {
    const data = await getAllDiscounts();
    setDiscounts(data);
  };

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("¿Estás seguro de eliminar este descuento?")) {
      await deleteDiscount(id);
      fetchDiscounts();
    }
  };

  const openModal = (type: "create" | "edit" | "detail", discount?: Discount) => {
    setSelected(discount || null);
    setModalType(type);
  };

  const closeModal = () => {
    setSelected(null);
    setModalType(null);
    fetchDiscounts();
  };

  const columns = useMemo<ColumnDef<Discount>[]>(() => [
    {
      accessorKey: "code",
      header: "Código",
    },
    {
      accessorKey: "percentage",
      header: "Descuento (%)",
    },
    {
      accessorKey: "is_active",
      header: "Estado",
      cell: (info) =>
        info.getValue() ? (
          <span className="px-2 py-1 text-sm rounded bg-green-100 text-green-600">Activo</span>
        ) : (
          <span className="px-2 py-1 text-sm rounded bg-red-100 text-red-600">Inactivo</span>
        ),
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
    data: discounts,
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
        <h2 className="text-2xl font-semibold text-gray-700">🏷️ Descuentos</h2>
        <button
          onClick={() => openModal("create")}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl"
        >
          Crear Descuento
        </button>
      </div>

      <input
        type="text"
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="🔍 Buscar descuento..."
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
        <DiscountModal type={modalType} discount={selected} onClose={closeModal} />
      )}
    </div>
  );
}
