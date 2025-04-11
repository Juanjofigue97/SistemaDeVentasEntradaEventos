import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import Register from './pages/register';
import Login from './pages/login';
import AuthRequired from './pages/AuthRequired';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/dashboard';
import Logout from './pages/logout';
import Perfil from './components/user/Perfil';
import Eventos from './components/user/Eventos';
import Compras from './components/user/Compras';
import Historial from './components/user/Historial';
import ComprarEntradaPage from './components/user/ComprarEntradaPage';

const App = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/auth-required" element={<AuthRequired />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }>
          <Route index element={<Perfil />} />
          <Route path="eventos" element={<Eventos />} />
          <Route path="compras" element={<Compras />} />
          <Route path="historial" element={<Historial />} />
        </Route>

        <Route path="/comprar-entrada/:id" element={<ProtectedRoute><ComprarEntradaPage/></ProtectedRoute>} />
      </Routes>
    </div>
  );
};

export default App;
