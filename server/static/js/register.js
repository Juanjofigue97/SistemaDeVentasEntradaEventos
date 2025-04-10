// register.js
document.getElementById("registerForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const form = e.target;
    
    const data = {
        name: form.name.value,
        email: form.email.value,
        identificacion: parseInt(form.identificacion.value),
        celular: parseInt(form.celular.value),
        password: form.password.value,
        is_admin: form.is_admin.checked
    };

    try {
        const response = await fetch("/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const error = await response.json();
            alert("Error: " + error.detail);
        } else {
            alert("Usuario registrado con éxito. Ahora puedes iniciar sesión.");
            window.location.href = "/";
        }
    } catch (err) {
        alert("Error en la conexión con el servidor.");
        console.error(err);
    }
});
