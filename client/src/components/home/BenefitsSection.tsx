import { FaClock, FaMoneyBillWave, FaBolt } from "react-icons/fa";

const benefits = [
  {
    icon: <FaBolt size={28} className="text-yellow-400" />,
    title: "Simple y rápido",
    description:
      "Olvídate de las preocupaciones por las entradas y enfócate en lo que realmente importa.",
  },
  {
    icon: <FaClock size={28} className="text-yellow-400" />,
    title: "Fácil de usar",
    description: "Registras tu evento en minutos.",
  },
  {
    icon: <FaMoneyBillWave size={28} className="text-yellow-400" />,
    title: "Sin cargo por servicio",
    description: "Ofrecé precios más competitivos y vendé más.",
  },
  {
    icon: <FaMoneyBillWave size={28} className="text-yellow-400" />,
    title: "Cobro directo",
    description: "Conecta tu cuenta y cobrá al instante.",
  },
];

const BenefitsSection = () => {
  return (
    <section className="py-16 px-4 md:px-12 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">¿Por qué usar Eventia?</h2>
        <p className="text-gray-300 text-lg">
          Estas son algunas de las razones por las que organizadores nos eligen.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {benefits.map((benefit, idx) => (
          <div
            key={idx}
            className="bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-yellow-500/30 transition duration-300 text-center"
          >
            <div className="mb-4 flex justify-center">{benefit.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
            <p className="text-gray-400 text-sm">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BenefitsSection;
