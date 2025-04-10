document.addEventListener("DOMContentLoaded", async () => {
    try {
        const res = await fetch("/events/");
        if (!res.ok) throw new Error("No se pudieron cargar los eventos");

        const eventos = await res.json();
        const container = document.getElementById("eventosContainer");

        eventos.forEach(evento => {
            console.log(evento)
            const card = document.createElement("div");
            card.className = "bg-white rounded-lg shadow-md overflow-hidden";

            const fechaFormateada = new Date(evento.date).toLocaleString("es-CO", {
                dateStyle: "medium",
                timeStyle: "short"
            });
            
            card.innerHTML = `
                <img src="${evento.image}" 
                     alt="${evento.name}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <h3 class="text-xl font-semibold text-blue-700">${evento.name}</h3>
                    <p class="text-sm text-gray-600">${evento.description}</p>
                    <p class="mt-2 text-sm"><strong>Fecha:</strong> ${fechaFormateada}</p>
                    <p class="text-sm"><strong>Ubicación:</strong> ${evento.location}</p>
                    <p class="text-sm"><strong>Precio:</strong> $${evento.price.toLocaleString("es-CO")}</p>
                    <button onclick="comprarEvento(${evento.id})"
                        class="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Comprar
                    </button>
                </div>
            `;

            container.appendChild(card);
        });

    } catch (err) {
        console.error("Error al cargar eventos:", err);
        const container = document.getElementById("eventosContainer");
        container.innerHTML = `<p class="text-red-600">No se pudieron cargar los eventos.</p>`;
    }
});

function comprarEvento(eventoId) {
    alert("Funcionalidad de compra en construcción. Evento ID: " + eventoId);
    // Aquí luego puedes abrir un modal, seleccionar tipo de entrada, etc.
}
