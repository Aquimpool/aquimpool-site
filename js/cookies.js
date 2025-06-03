document.addEventListener("DOMContentLoaded", () => {
    const banner = document.getElementById("cookie-banner");
    const aceptar = document.getElementById("aceptar-cookies");
    const rechazar = document.getElementById("rechazar-cookies");

    // Mostrar el banner si no hay una decisión previa
    if (!localStorage.getItem("cookies-consent")) {
        banner.style.display = "block";
        setTimeout(() => {
            banner.classList.add("show");
        }, 100); // Pequeño retraso para la animación
    }

    // Manejar la aceptación de cookies
    aceptar.addEventListener("click", () => {
        localStorage.setItem("cookies-consent", "accepted");
        banner.classList.remove("show");
        setTimeout(() => (banner.style.display = "none"), 500); // Ocultar después de la animación
    });

    // Manejar el rechazo de cookies
    rechazar.addEventListener("click", () => {
        localStorage.setItem("cookies-consent", "rejected");
        banner.classList.remove("show");
        setTimeout(() => (banner.style.display = "none"), 500); // Ocultar después de la animación
    });
});
