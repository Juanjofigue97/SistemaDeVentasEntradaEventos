import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import logo from "/EventiaDark.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-900 border-b border-gray-700 text-white">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4 relative">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="logo" className="h-20 w-auto" />
        </Link>

        {/* Center links (Desktop) */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-8">
          <a href="#inicio" className="hover:text-yellow-400">Inicio</a>
          <a href="#eventos" className="hover:text-yellow-400">Eventos</a>
          <a href="#beneficios" className="hover:text-yellow-400">Beneficios</a>
          <a href="#faq" className="hover:text-yellow-400">Preguntas Frecuentes</a>
        </div>

        {/* Right buttons */}
        <div className="hidden md:flex space-x-4 items-center">
          {!user ? (
            <>
              <Link
                to="/login"
                className="border border-yellow-500 hover:bg-yellow-500 hover:text-gray-900 font-semibold py-2 px-4 rounded"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded"
              >
                Registrarse
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 text-white hover:text-yellow-400"
              >
                <FaUserCircle className="text-xl" />
                <span>{user.email}</span>
              </Link>
              <button
                onClick={logout}
                className="border border-red-500 hover:bg-red-500 hover:text-white font-semibold py-2 px-4 rounded"
              >
                Cerrar sesión
              </button>
            </>
          )}
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
          <a href="#inicio" className="hover:text-yellow-400">Inicio</a><br />
          <a href="#eventos" className="hover:text-yellow-400">Eventos</a><br />
          <a href="#beneficios" className="hover:text-yellow-400">Beneficios</a><br />
          <a href="#faq" className="hover:text-yellow-400">Preguntas Frecuentes</a>
          <hr />
          {!user ? (
            <>
              <Link to="/login" className="block hover:text-yellow-400">Iniciar Sesión</Link>
              <Link to="/register" className="block hover:text-yellow-400">Registrarse</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="block hover:text-yellow-400 flex items-center gap-2">
                <FaUserCircle /> {user.email}
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false); // cerrar el menú
                }}
                className="text-left w-full hover:text-red-400"
              >
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
