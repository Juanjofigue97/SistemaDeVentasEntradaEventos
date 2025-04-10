// login.js
document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const form = e.target;
    
    const formData = new URLSearchParams();
    formData.append("username", form.username.value);
    formData.append("password", form.password.value);

    try {
        const response = await fetch("/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formData
        });

        if (!response.ok) {
            const error = await response.json();
            alert("Error: " + error.detail);
        } else {
            const data = await response.json();
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("user_id", data.user_id);
            alert("Inicio de sesión exitoso.");
            // Redirige a tu dashboard o página principal
            if (data.is_admin) {
                window.location.href = "/admin";
            } else {
                window.location.href = "/dashboard";
            }
        }
    } catch (err) {
        alert("Error al conectar con el servidor.");
        console.error(err);
    }
});
