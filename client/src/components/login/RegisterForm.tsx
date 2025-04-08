// src/components/RegisterForm.tsx
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "/Eventia.png";

const RegisterForm = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [cedula, setCedula] = useState("");
  const [celular, setCelular] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const userData = {
      name: nombre,
      email,
      identificacion: parseInt(cedula),
      celular: parseInt(celular),
      password,
      is_admin: false,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        userData
      );
  
      // ✅ Si llega aquí, el registro fue exitoso
      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: "Ya puedes iniciar sesión",
        confirmButtonColor: "#facc15",
      });
  
      // Redirigir o limpiar formulario si deseas
    } catch (error: any) {
      if (error.response?.status === 400 && error.response?.data.detail === "Email ya registrado") {
        Swal.fire({
          icon: "error",
          title: "Registro fallido",
          text: "El correo ya está registrado",
          confirmButtonColor: "#facc15",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error del servidor",
          text: "Ocurrió un error inesperado",
          confirmButtonColor: "#facc15",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        {/* Logo/Icono */}
        <div className="flex justify-center">
          <Link to="/" className="">
            <img src={logo} alt="logo" className="h-30 w-auto" />
          </Link>
        </div>
        <br />
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Regístrate
        </h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-gray-700">
              Nombre Completo
            </label>
            <input
              type="text"
              id="nombre"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-900"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-900"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cedula" className="block text-gray-700">
              Cédula
            </label>
            <input
              type="text"
              id="cedula"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-900"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="celular" className="block text-gray-700">
              Celular
            </label>
            <input
              type="text"
              id="celular"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-900"
              value={celular}
              onChange={(e) => setCelular(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-900"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 bg-yellow-500 text-white rounded-md ${
              loading && "opacity-50 cursor-not-allowed"
            }`}
            disabled={loading}
          >
            {loading ? "Cargando..." : "Registrarme"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-black">¿Ya estás registrado?</p>
          <a href="/login" className="text-yellow-500 hover:underline">
            Ingresa a tu cuenta
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
