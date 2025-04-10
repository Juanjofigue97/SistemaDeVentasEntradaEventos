import Dashboard from "../components/user/dashboard";
import DashAdmin from "../components/admin/DashAdmin";
import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Cargando...</div>;

  if (!user) return <div>No autorizado</div>;

  return (
    <div className="min-h-screen bg-white">
      {user.role === "admin" ? <DashAdmin /> : <Dashboard />}
    </div>
  );
}
