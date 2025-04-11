import { useLocation, useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import FormularioCompra from "./FormularioCompra";
import { ArrowLeft } from "lucide-react";

type LocationState = {
    event: {
        id: number;
        name: string;
        date: string;
        location: string;
        image?: string;
    };
};

const ComprarEntradaPage = () => {
    const { } = useParams();
    const location = useLocation();
    const state = location.state as LocationState;

    useEffect(() => {
        if (!state?.event) {
            console.error("No se encontró información del evento");
        }
    }, [state]);

    if (!state?.event) {
        return <div className="p-4 text-center text-red-500">Evento no encontrado.</div>;
    }

    const { name, date, location: lugar, image, id: eventId } = state.event;

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-2xl mx-auto px-4">
                <Link
                    to="/dashboard/eventos"
                    className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-100 transition"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Volver a eventos
                </Link>

                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h1 className="text-2xl font-bold mb-4">Comprar entradas para:</h1>

                    {image && (
                        <img
                            src={image}
                            alt={name}
                            className="w-full h-64 object-cover rounded-xl mb-4"
                        />
                    )}

                    <h2 className="text-xl font-semibold">{name}</h2>
                    <p className="text-gray-600">{new Date(date).toLocaleString()}</p>
                    <p className="text-gray-500 mb-6">{lugar}</p>

                    <FormularioCompra eventId={eventId} />
                </div>
            </div>
        </div>
    );
};

export default ComprarEntradaPage;
