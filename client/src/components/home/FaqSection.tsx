import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
const faqs = [
  {
    question: "¿Cómo funcionan las entradas digitales?",
    answer:
      "Las entradas digitales se envían por correo electrónico con un código QR único que puede escanearse en el evento.",
  },
  {
    question: "¿Puedo validar entradas sin conexión a internet?",
    answer:
      "Sí, nuestra app de escaneo permite validar entradas aún sin conexión activa.",
  },
  {
    question: "¿Qué sucede si un asistente pierde su entrada?",
    answer:
      "Puede recuperarla fácilmente ingresando con su correo o contactando al organizador.",
  },
  {
    question: "¿Hay costos adicionales por usar Eventia?",
    answer:
      "No. No cobramos cargos por servicio a los asistentes ni comisiones ocultas.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 px-4 md:px-12 bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Preguntas Frecuentes
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Consultas de nuestros clientes sobre las ticketeras QR y las entradas digitales.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left px-6 py-4 flex justify-between items-center bg-gray-100 dark:bg-gray-800 hover:bg-yellow-500 dark:hover:bg-yellow-500 hover:text-white dark:hover:text-white transition"
            >
              <span className="font-medium">{faq.question}</span>
              <FaChevronDown
                className={`transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-sm">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
