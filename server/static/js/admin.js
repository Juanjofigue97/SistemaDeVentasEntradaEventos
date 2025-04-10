function toggleForm(formId) {
    document.querySelectorAll(".hidden.mb-6").forEach(f => f.classList.add("hidden"));
    document.getElementById(formId).classList.toggle("hidden");
}

async function loadEventos() {
    try {
        const res = await fetch("/events/"); 
        const eventos = await res.json();

        const tbody = document.getElementById("eventList");
        tbody.innerHTML = "";

        eventos.forEach(evt => {
            const fecha = new Date(evt.date).toLocaleDateString();

            tbody.innerHTML += `
                <tr>
                    <td class="border px-2 py-1">${evt.id}</td>
                    <td class="border px-2 py-1">${evt.name}</td>
                    <td class="border px-2 py-1">${evt.description}</td>
                    <td class="border px-2 py-1">${fecha}</td>
                    <td class="border px-2 py-1">${evt.location}</td>
                    <td class="border px-2 py-1">$${evt.price.toFixed(2)}</td>
                    <td class="border px-2 py-1">${evt.capacity}</td>
                    <td class="border px-2 py-1">${evt.tickets_sold}</td>
                    <td class="border px-2 py-1 text-center">
                        <button onclick="eliminarEvento(${evt.id})" class="text-red-600 hover:underline mr-2">Eliminar</button>
                        <button onclick="editarEvento(${evt.id})" class="text-blue-600 hover:underline">Editar</button>
                    </td>
                </tr>
            `;
        });
    } catch (err) {
        console.error("Error al cargar eventos:", err);
    }
}

// Crear Evento
document.getElementById('eventoForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const id = formData.get("id");

    const method = id ? "PUT" : "POST";
    const url = id ? `/admin/eventos/${id}` : "/admin/eventos";

    try {
        const response = await fetch(url, {
            method: method,
            body: formData
        });

        if (!response.ok) throw new Error(await response.text());
        alert(id ? "Evento actualizado" : "Evento creado");
        form.reset();
        document.getElementById("evento_id").value = "";
        loadEventos();
    } catch (err) {
        alert('Error al guardar evento: ' + err.message);
    }
});

async function editarEvento(id) {
    try {
        const res = await fetch(`/eventos/${id}`);
        if (!res.ok) throw new Error("No se pudo obtener el evento");

        const evento = await res.json();
        toggleForm("formEvento");

        document.getElementById("evento_id").value = evento.id;
        document.getElementById("name").value = evento.name;
        document.getElementById("description").value = evento.description;
        document.getElementById("date").value = evento.date.slice(0, 16); // datetime-local
        document.getElementById("location").value = evento.location;
        document.getElementById("price").value = evento.price;
        document.getElementById("capacity").value = evento.capacity;
        document.getElementById("estado").value = evento.estado;

    } catch (err) {
        alert("Error al cargar evento: " + err.message);
    }
}

async function eliminarEvento(id) {
    if (!confirm(`¿Estás seguro de eliminar el evento con ID ${id}?`)) return;

    try {
        const res = await fetch(`/admin/eventos/${id}`, {
            method: "DELETE"
        });

        if (!res.ok) throw new Error(await res.text());

        alert("Evento eliminado correctamente");
        loadEventos();
    } catch (err) {
        alert("Error al eliminar el evento: " + err.message);
    }
}

// Crear Tipo de Entrada
document.getElementById('entryTypeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;

    const data = [{
        event_id: parseInt(form.event_id.value),
        name: form.name.value,
        price: parseFloat(form.price.value),
        capacity: parseInt(form.capacity.value)
    }];

    try {
        const response = await fetch('/admin/entradas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error(await response.text());
        alert('Tipo de entrada creado correctamente');
        form.reset();
    } catch (err) {
        alert('Error: ' + err.message);
    }
});

// Crear Descuento
document.getElementById('discountForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;

    const data = {
        code: form.code.value,
        percentage: parseFloat(form.percentage.value),
        is_active: form.is_active.checked
    };

    try {
        const response = await fetch('/admin/descuentos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error(await response.text());
        alert('Descuento creado correctamente');
        form.reset();
    } catch (err) {
        alert('Error al crear descuento: ' + err.message);
    }
});

window.onload = loadEventos;
