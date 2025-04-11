import { useAuth } from "../../context/AuthContext";
import {
  User as UserIcon,
  Mail,
  Badge,
  Phone,
  ShieldCheck,
} from "lucide-react";

export default function Perfil() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-2xl shadow-lg bg-white border border-yellow-400">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        👋 ¡Hola, <span className="text-yellow-600">{user.name}</span>!
      </h2>

      <div className="space-y-4 text-gray-700 text-sm">
        <div className="flex items-center gap-3">
          <UserIcon className="text-yellow-500" size={20} />
          <span className="font-medium">Nombre:</span> {user.name}
        </div>

        <div className="flex items-center gap-3">
          <Mail className="text-yellow-500" size={20} />
          <span className="font-medium">Correo:</span> {user.email}
        </div>

        <div className="flex items-center gap-3">
          <Badge className="text-yellow-500" size={20} />
          <span className="font-medium">Identificación:</span> {user.identificacion}
        </div>

        <div className="flex items-center gap-3">
          <Phone className="text-yellow-500" size={20} />
          <span className="font-medium">Celular:</span> {user.celular}
        </div>

        <div className="flex items-center gap-3">
          <ShieldCheck className={`text-${user.is_admin ? "green" : "gray"}-500`} size={20} />
          <span className="font-medium">Rol:</span>{" "}
          {user.is_admin ? (
            <span className="text-green-600 font-semibold">Administrador</span>
          ) : (
            <span className="text-gray-600">Usuario</span>
          )}
        </div>
      </div>
    </div>
  );
}
