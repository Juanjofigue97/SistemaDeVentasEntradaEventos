import { useState } from "react";
import {
  HiCalendar,
  HiUser,
  HiTicket,
  HiShoppingBag,
  HiOutlineDotsVertical,
  HiX,
} from "react-icons/hi";
import EventList from "../common/EventList";
import { Link, useNavigate } from "react-router-dom";
import logo from "/EventiaDark.png";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("perfil");
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setMenuOpen(false); // Cierra menú en móvil
  };

  const handleLogout = () => {
    navigate("/logout");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - Desktop & Mobile */}
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
                onClick={() => handleTabChange("perfil")}
                className={`flex items-center w-full p-2 rounded ${
                  activeTab === "perfil"
                    ? "bg-yellow-500 text-gray-700"
                    : "hover:bg-gray-600"
                }`}
              >
                <HiUser className="mr-2" /> Perfil
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
                onClick={() => handleTabChange("compras")}
                className={`flex items-center w-full p-2 rounded ${
                  activeTab === "compras"
                    ? "bg-yellow-500 text-gray-700"
                    : "hover:bg-gray-600"
                }`}
              >
                <HiTicket className="mr-2" /> Comprar entradas
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabChange("historial")}
                className={`flex items-center w-full p-2 rounded ${
                  activeTab === "historial"
                    ? "bg-yellow-500 text-gray-700"
                    : "hover:bg-gray-600"
                }`}
              >
                <HiShoppingBag className="mr-2" /> Historial
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
        {/* Top bar for mobile */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-gray-700">
            {activeTab === "eventos" && "Eventos Disponibles"}
            {activeTab === "perfil" && "Mi Perfil"}
            {activeTab === "compras" && "Compra de Entradas"}
            {activeTab === "historial" && "Historial de Compras"}
          </h1>
          <button
            className="text-gray-700 text-2xl"
            onClick={() => setMenuOpen(true)}
          >
            <HiOutlineDotsVertical />
          </button>
        </div>

        {/* Título en desktop */}
        <h1 className="hidden md:block text-2xl font-bold text-gray-700 mb-6 border-b border-yellow-500 pb-2">
          {activeTab === "eventos" && "Eventos Disponibles"}
          {activeTab === "perfil" && "Mi Perfil"}
          {activeTab === "compras" && "Compra de Entradas"}
          {activeTab === "historial" && "Historial de Compras"}
        </h1>

        {activeTab === "eventos" && <EventList />}

        {activeTab === "compras" && (
          <div className="max-w-md border border-yellow-500 rounded-lg p-6">
            <h3 className="font-bold text-gray-700 mb-4">
              Selecciona un evento
            </h3>
            <select className="w-full p-2 border border-gray-300 rounded mb-4">
              <option>Concierto de Rock</option>
              <option>Festival de Jazz</option>
            </select>
            <button className="bg-yellow-500 text-gray-700 w-full py-2 rounded hover:bg-yellow-600">
              Comprar entrada
            </button>
          </div>
        )}

        {activeTab === "perfil" && (
          <div className="max-w-md border border-yellow-500 rounded-lg p-6">
            ¡Hola! <strong>{user?.email}</strong>
          </div>
        )}
      </main>
    </div>
  );
}
