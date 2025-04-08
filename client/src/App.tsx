import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import Register from './pages/register';
import Login from './pages/login';
import AuthRequired from './pages/AuthRequired';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/dashboard';
import CompraEntradaForm from './components/user/comprar_entrada';

const App = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth-required" element={<AuthRequired />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/comprar-entrada/:id" element={
          <ProtectedRoute>
            <CompraEntradaForm />
          </ProtectedRoute>} />
      </Routes>
    </div>
  );
};

export default App;
