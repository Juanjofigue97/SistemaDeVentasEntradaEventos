import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import { authenticateUser } from '../../services/authService';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = authenticateUser(email, password);

    if (result.success && result.role) {
      login({ email, role: "admin" });
      navigate("/dashboard");
    } else {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: result.message || 'Error desconocido',
        confirmButtonColor: '#facc15',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white-700">Correo electrónico</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 mt-1 border border-gray-300 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="Ingrese su correo electrónico"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-white-700">Contraseña</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 mt-1 border border-gray-300 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="Ingrese su contraseña"
        />
      </div>

      <button
        type="submit"
        className="w-full p-3 mt-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      >
        Iniciar sesión
      </button>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-300">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="text-yellow-500 hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
