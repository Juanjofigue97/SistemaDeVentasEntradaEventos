import { useState } from "react";
import { HiCalendar, HiUser, HiTicket, HiShoppingBag, HiLogout } from "react-icons/hi";
import EventList from "../common/EventList";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("eventos");

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-700 text-white p-4 border-r border-yellow-500">
        <h2 className="text-xl font-bold mb-8">EventosApp</h2>
        
        <nav>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveTab("eventos")}
                className={`flex items-center w-full p-2 rounded ${activeTab === "eventos" ? "bg-yellow-500 text-gray-700" : "hover:bg-gray-600"}`}
              >
                <HiCalendar className="mr-2" /> Eventos
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("perfil")}
                className={`flex items-center w-full p-2 rounded ${activeTab === "perfil" ? "bg-yellow-500 text-gray-700" : "hover:bg-gray-600"}`}
              >
                <HiUser className="mr-2" /> Perfil
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("compras")}
                className={`flex items-center w-full p-2 rounded ${activeTab === "compras" ? "bg-yellow-500 text-gray-700" : "hover:bg-gray-600"}`}
              >
                <HiTicket className="mr-2" /> Comprar entradas
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("historial")}
                className={`flex items-center w-full p-2 rounded ${activeTab === "historial" ? "bg-yellow-500 text-gray-700" : "hover:bg-gray-600"}`}
              >
                <HiShoppingBag className="mr-2" /> Historial
              </button>
            </li>
          </ul>
        </nav>

        <button className="flex items-center mt-8 p-2 text-red-300 hover:bg-gray-600 w-full rounded">
          <HiLogout className="mr-2" /> Cerrar sesión
        </button>
      </div>

      {/* Contenido principal */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-700 mb-6 border-b border-yellow-500 pb-2">
          {activeTab === "eventos" && "Eventos Disponibles"}
          {activeTab === "perfil" && "Mi Perfil"}
          {activeTab === "compras" && "Compra de Entradas"}
          {activeTab === "historial" && "Historial de Compras"}
        </h1>

        {activeTab === "eventos" && (
            <EventList />
        )}

        {activeTab === "compras" && (
          <div className="max-w-md border border-yellow-500 rounded-lg p-6">
            <h3 className="font-bold text-gray-700 mb-4">Selecciona un evento</h3>
            <select className="w-full p-2 border border-gray-300 rounded mb-4">
              <option>Concierto de Rock</option>
              <option>Festival de Jazz</option>
            </select>
            <button className="bg-yellow-500 text-gray-700 w-full py-2 rounded hover:bg-yellow-600">
              Comprar entrada
            </button>
          </div>
        )}

        {/* Añade aquí las otras pestañas */}
      </main>
    </div>
  );
}