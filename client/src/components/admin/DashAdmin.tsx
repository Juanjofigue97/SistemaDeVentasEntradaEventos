import { useState } from "react";
import {
  HiCalendar,
  HiTicket,
  HiCash,
  HiUsers,
  HiOutlineDotsVertical,
  HiX,
  HiClipboardList,
} from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import logo from "/EventiaDark.png";
import { useAuth } from "../../context/AuthContext";
import UserList from "./UserList";
import EventList from "./EventList";
import DiscountList from "./DiscountList";
import TicketList from "./TicketList";
import EntryTypeList from "./EntryTypeList"; // Asegúrate de que este archivo exista

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("usuarios");
  const [menuOpen, setMenuOpen] = useState(false);
  const { } = useAuth();
  const navigate = useNavigate();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    navigate("/logout");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-gray-700 text-white p-4 border-r border-yellow-500 transition-transform transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:flex-shrink-0`}
      >
        <div className="flex justify-between items-center mb-8">
          <Link to="/">
            <img src={logo} alt="logo" className="h-10 w-auto" />
          </Link>
          <button
            className="text-white text-2xl md:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <HiX />
          </button>
        </div>

        <nav>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => handleTabChange("usuarios")}
                className={`flex items-center w-full p-2 rounded ${
                  activeTab === "usuarios"
                    ? "bg-yellow-500 text-gray-700"
                    : "hover:bg-gray-600"
                }`}
              >
                <HiUsers className="mr-2" /> Usuarios
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabChange("eventos")}
                className={`flex items-center w-full p-2 rounded ${
                  activeTab === "eventos"
                    ? "bg-yellow-500 text-gray-700"
                    : "hover:bg-gray-600"
                }`}
              >
                <HiCalendar className="mr-2" /> Eventos
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabChange("descuentos")}
                className={`flex items-center w-full p-2 rounded ${
                  activeTab === "descuentos"
                    ? "bg-yellow-500 text-gray-700"
                    : "hover:bg-gray-600"
                }`}
              >
                <HiCash className="mr-2" /> Descuentos
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabChange("entradas")}
                className={`flex items-center w-full p-2 rounded ${
                  activeTab === "entradas"
                    ? "bg-yellow-500 text-gray-700"
                    : "hover:bg-gray-600"
                }`}
              >
                <HiTicket className="mr-2" /> Entradas
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabChange("tiposEntrada")}
                className={`flex items-center w-full p-2 rounded ${
                  activeTab === "tiposEntrada"
                    ? "bg-yellow-500 text-gray-700"
                    : "hover:bg-gray-600"
                }`}
              >
                <HiClipboardList className="mr-2" /> Tipos de Entrada
              </button>
            </li>
          </ul>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-6 border border-red-500 hover:bg-red-500 hover:text-white font-semibold py-2 px-4 rounded w-full"
        >
          Cerrar sesión
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto w-full">
        <div className="md:hidden flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-gray-700 capitalize">{activeTab}</h1>
          <button
            className="text-gray-700 text-2xl"
            onClick={() => setMenuOpen(true)}
          >
            <HiOutlineDotsVertical />
          </button>
        </div>

        <h1 className="hidden md:block text-2xl font-bold text-gray-700 mb-6 border-b border-yellow-500 pb-2 capitalize">
          {activeTab}
        </h1>

        {activeTab === "usuarios" && <UserList />}
        {activeTab === "eventos" && <EventList />}
        {activeTab === "descuentos" && <DiscountList />}
        {activeTab === "entradas" && <TicketList />}
        {activeTab === "tiposEntrada" && <EntryTypeList />}
      </main>
    </div>
  );
}
