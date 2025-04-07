// src/components/RegisterForm.tsx
import { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [cedula, setCedula] = useState('');
  const [celular, setCelular] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    const userData = {
      nombre,
      email,
      cedula,
      celular,
      password,
    };

    try {
      const response = await axios.post('/api/register', userData); // Reemplaza con la URL real del backend
      if (response.data.success) {
        // Redirige a una página de éxito o muestra un mensaje
      }
    } catch (err) {
      setError('Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        {/* Logo/Icono */}
        <div className="text-center mb-6">
          <i className="text-6xl text-yellow-500 fas fa-user-circle"></i>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Regístrate</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-gray-700">Nombre Completo</label>
            <input
              type="text"
              id="nombre"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cedula" className="block text-gray-700">Cédula</label>
            <input
              type="text"
              id="cedula"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="celular" className="block text-gray-700">Celular</label>
            <input
              type="text"
              id="celular"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={celular}
              onChange={(e) => setCelular(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Contraseña</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 bg-yellow-500 text-white rounded-md ${loading && 'opacity-50 cursor-not-allowed'}`}
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Registrarme'}
          </button>
        </form>

        <p className="mt-4 text-center">
          <p className="text-black">¿Ya estás registrado?{' '}</p>
          <a href="/login" className="text-yellow-500 hover:underline">Ingresa a tu cuenta</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
