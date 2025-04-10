document.addEventListener("DOMContentLoaded", async () => {
    const entryTypeSelect = document.getElementById("entryType");
    const ticketForm = document.getElementById("ticketForm");
    const messageDiv = document.getElementById("message");

    // Extraer evento_id y user_id de la URL
    const pathParts = window.location.pathname.split("/");
    const eventoId = parseInt(pathParts[3]);
    const userId = parseInt(pathParts[4]);

    try {
        // Cargar tipos de entrada para el evento
        const res = await fetch(`/events/${eventoId}/entry-types`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const tipos = await res.json();
        console.log(tipos)

        if (tipos.length === 0) {
            entryTypeSelect.innerHTML = `<option disabled selected>No hay tipos de entrada disponibles</option>`;
        } else {
            entryTypeSelect.innerHTML = tipos.map(t =>
                `<option value="${t.id}">${t.name} - $${t.price.toLocaleString("es-CO")}</option>`
            ).join("");
        }
    } catch (err) {
        console.error("Error al cargar tipos de entrada:", err);
        messageDiv.textContent = "No se pudieron cargar los tipos de entrada.";
        messageDiv.className = "text-red-600";
    }

    ticketForm.addEventListener("submit", async e => {
        e.preventDefault();

        const data = {
            event_id: eventoId,
            user_id: userId,
            entry_type_id: parseInt(entryTypeSelect.value),
            quantity: parseInt(document.getElementById("quantity").value),
            discount_code: document.getElementById("discountCode").value || null
        };

        try {
            const token = localStorage.getItem("access_token");

            const res = await fetch("/tickets/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            const result = await res.json();

            if (res.ok) {
                messageDiv.textContent = `Compra exitosa. Total: $${result.total_price}`;
                messageDiv.className = "text-green-600 font-semibold";
                window.location.href = "/dashboard";
            } else {
                messageDiv.textContent = result.detail || "Error en la compra.";
                messageDiv.className = "text-red-600 font-semibold";
            }
        } catch (err) {
            console.error("Error al enviar ticket:", err);
            messageDiv.textContent = "Error en la conexión.";
            messageDiv.className = "text-red-600 font-semibold";
        }
    });
});
