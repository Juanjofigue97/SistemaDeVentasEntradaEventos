import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import logo from "/EventiaDark.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsOpen(false);
    navigate("/logout");
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-gray-900 border-b border-gray-700 text-white relative z-50">
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

        {/* Right buttons (Desktop) */}
        <div className="hidden md:flex space-x-4 items-center">
          {!user ? (
            <>
              <Link to="/login" className="border border-yellow-500 hover:bg-yellow-500 hover:text-gray-900 font-semibold py-2 px-4 rounded">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded">
                Registrarse
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="flex items-center gap-2 text-white hover:text-yellow-400">
                <FaUserCircle className="text-xl" />
                <span>{user.email}</span>
              </Link>
              <button onClick={handleLogout} className="border border-red-500 hover:bg-red-500 hover:text-white font-semibold py-2 px-4 rounded">
                Cerrar sesión
              </button>
            </>
          )}
        </div>

        {/* Toggle button (Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-400 hover:text-white z-50"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Fondo oscuro detrás del menú */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMenu}
        ></div>
      )}

      {/* Menú móvil deslizable */}
      <div className={`fixed top-0 left-0 h-full w-[70%] bg-gray-800 text-white p-6 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out z-50 md:hidden`}>
        <nav className="space-y-4">
          <a href="#inicio" onClick={closeMenu} className="block hover:text-yellow-400">Inicio</a>
          <a href="#eventos" onClick={closeMenu} className="block hover:text-yellow-400">Eventos</a>
          <a href="#beneficios" onClick={closeMenu} className="block hover:text-yellow-400">Beneficios</a>
          <a href="#faq" onClick={closeMenu} className="block hover:text-yellow-400">Preguntas Frecuentes</a>
          <hr className="border-gray-600" />

          {!user ? (
            <>
              <Link to="/login" onClick={closeMenu} className="block hover:text-yellow-400">Iniciar Sesión</Link>
              <Link to="/register" onClick={closeMenu} className="block hover:text-yellow-400">Registrarse</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" onClick={closeMenu} className="block hover:text-yellow-400 flex items-center gap-2">
                <FaUserCircle /> {user.email}
              </Link>
              <button onClick={handleLogout} className="w-full text-left hover:text-red-400">Cerrar sesión</button>
            </>
          )}
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
