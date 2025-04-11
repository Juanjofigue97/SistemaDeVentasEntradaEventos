import { useAuth } from "../../context/AuthContext";

export default function Perfil() {
  const { user } = useAuth();
  return (
    <div className="max-w-md border border-yellow-500 rounded-lg p-6">
      ¡Hola! <strong>{user?.email}</strong>
    </div>
  );
}
