import { Link, Outlet, useLocation } from "react-router-dom";
import { HiCalendar, HiUser, HiShoppingBag, HiOutlineDotsVertical, HiX } from "react-icons/hi";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { } = useAuth();
  const location = useLocation();

  const getTabName = () => {
    if (location.pathname.includes("eventos")) return "Eventos Disponibles";
    if (location.pathname.includes("compras")) return "Compra de Entradas";
    if (location.pathname.includes("historial")) return "Historial de Compras";
    return "Mi Perfil";
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 z-50 h-full w-64 bg-gray-700 text-white p-4 border-r border-yellow-500 transition-transform transform ${menuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:flex-shrink-0`}>
        <div className="flex justify-between items-center mb-8">
          <Link to="/">
            <img src="/EventiaDark.png" alt="logo" className="h-10 w-auto" />
          </Link>
          <button className="text-white text-2xl md:hidden" onClick={() => setMenuOpen(false)}>
            <HiX />
          </button>
        </div>

        <nav>
          <ul className="space-y-2">
            <li>
              <Link to="/dashboard" className={`flex items-center w-full p-2 rounded ${location.pathname === "/dashboard" ? "bg-yellow-500 text-gray-700" : "hover:bg-gray-600"}`}>
                <HiUser className="mr-2" /> Perfil
              </Link>
            </li>
            <li>
              <Link to="/dashboard/eventos" className={`flex items-center w-full p-2 rounded ${location.pathname.includes("eventos") ? "bg-yellow-500 text-gray-700" : "hover:bg-gray-600"}`}>
                <HiCalendar className="mr-2" /> Eventos
              </Link>
            </li>
            <li>
              <Link to="/dashboard/historial" className={`flex items-center w-full p-2 rounded ${location.pathname.includes("historial") ? "bg-yellow-500 text-gray-700" : "hover:bg-gray-600"}`}>
                <HiShoppingBag className="mr-2" /> Historial
              </Link>
            </li>
          </ul>
        </nav>

        <button
          onClick={() => window.location.href = "/logout"}
          className="mt-6 border border-red-500 hover:bg-red-500 hover:text-white font-semibold py-2 px-4 rounded w-full"
        >
          Cerrar sesión
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto w-full">
        {/* Top bar for mobile */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-gray-700">{getTabName()}</h1>
          <button className="text-gray-700 text-2xl" onClick={() => setMenuOpen(true)}>
            <HiOutlineDotsVertical />
          </button>
        </div>

        {/* Título en desktop */}
        <h1 className="hidden md:block text-2xl font-bold text-gray-700 mb-6 border-b border-yellow-500 pb-2">
          {getTabName()}
        </h1>

        {/* Aquí se renderiza cada módulo */}
        <Outlet />
      </main>
    </div>
  );
}
