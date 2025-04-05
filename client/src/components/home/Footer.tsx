import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Logo / Nombre */}
        <div>
          <h3 className="text-2xl font-bold mb-2">Eventia</h3>
          <p className="text-sm text-gray-400">
            Tu plataforma confiable para descubrir y asistir a los mejores eventos.
          </p>
        </div>

        {/* Enlaces rápidos */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Enlaces</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-yellow-500 transition">Inicio</a></li>
            <li><a href="#" className="hover:text-yellow-500 transition">Eventos</a></li>
            <li><a href="#" className="hover:text-yellow-500 transition">Nosotros</a></li>
            <li><a href="#" className="hover:text-yellow-500 transition">Contacto</a></li>
          </ul>
        </div>

        {/* Redes Sociales */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Síguenos</h4>
          <div className="flex gap-4">
            <a href="#" className="hover:text-yellow-500"><FaFacebook size={20} /></a>
            <a href="#" className="hover:text-yellow-500"><FaInstagram size={20} /></a>
            <a href="#" className="hover:text-yellow-500"><FaTwitter size={20} /></a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Eventia. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
