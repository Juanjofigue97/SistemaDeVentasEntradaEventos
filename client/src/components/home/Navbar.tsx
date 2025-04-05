import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 border-b border-gray-700 text-white">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4 relative">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          🎫 Eventia
        </Link>

        {/* Center links (Desktop) */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-8">
          <Link to="/" className="hover:text-yellow-400">
            Inicio
          </Link>
          <Link to="/eventos" className="hover:text-yellow-400">
            Eventos
          </Link>
          <Link to="/historial" className="hover:text-yellow-400">
            Historial
          </Link>
        </div>

        {/* Right buttons */}
        <div className="hidden md:flex space-x-4">
          <Link
            to="/login"
            className="border border-yellow-500 hover:bg-yellow-500 hover:text-gray-900 font-semibold py-2 px-4 rounded"
          >
            Iniciar Sesión
          </Link>
          <Link
            to="/registro"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded"
          >
            Registrarse
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-400 hover:text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link to="/" className="block hover:text-yellow-400">Inicio</Link>
          <Link to="/eventos" className="block hover:text-yellow-400">Eventos</Link>
          <Link to="/historial" className="block hover:text-yellow-400">Historial</Link>
          <hr/>
          <Link to="/login" className="block hover:text-yellow-400">Iniciar Sesión</Link>
          <Link to="/registro" className="block hover:text-yellow-400">Registrarse</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
