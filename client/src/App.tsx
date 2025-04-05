import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import Register from './pages/register';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/dashboard';
import Login from './pages/login';

const App = () => {
  return (
      <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* Ruta protegida para el Dashboard */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
  );
};

export default App;
