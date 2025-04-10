document.addEventListener("DOMContentLoaded", async () => {
    // Cargar eventos
    try {
        const userId = localStorage.getItem("user_id");
        const res = await fetch("/events/");
        if (!res.ok) throw new Error("No se pudieron cargar los eventos");

        const eventos = await res.json();
        const container = document.getElementById("eventosContainer");

        eventos.forEach(evento => {
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
                    <p class="text-sm"><strong>Precio Base:</strong> $${evento.price.toLocaleString("es-CO")}</p>
                    <button onclick="window.location.href='/events/comprar/${evento.id}/${userId}'"
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

    // Cargar historial de tickets
    try {
        const userId = localStorage.getItem("user_id");
        if (!userId) throw new Error("Usuario no identificado");

        const res = await fetch(`user/${userId}/tickets`);
        if (!res.ok) throw new Error("No se pudieron cargar los tickets");

        const datos = await res.json();
        const container_tickets = document.getElementById("historialCompras");

        datos.forEach(dato => {
            const hist = document.createElement("tr");
            hist.className = "border-b"; // <-- aquí usaste paréntesis, debería ser un string

            hist.innerHTML = `
                <td class="px-6 py-4">${dato.name_evento}</td>
                <td class="px-6 py-4">${dato.date}</td>
                <td class="px-6 py-4">${dato.locacion}</td>
                <td class="px-6 py-4">${dato.entradas}</td>
                <td class="px-6 py-4">$${dato.total}</td>
            `;
            container_tickets.appendChild(hist);
        });
    } catch (err) {
        console.error("Error al cargar tickets:", err);
        const container_tickets = document.getElementById("historialCompras");
        container_tickets.innerHTML = `<p class="text-red-600">No se pudieron cargar los tickets.</p>`;
    }
});
