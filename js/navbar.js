new bootstrap.Collapse(document.getElementById("navbarNav"), { toggle: false });

document.addEventListener("DOMContentLoaded", () => {
    const navbarToggler = document.getElementById("navbar-toggler");
    const navbarNav = document.getElementById("navbarNav");

    // Close the menu when clicking outside it
    document.addEventListener("click", (event) => {
        if (
            !navbarNav.contains(event.target) &&
            !navbarToggler.contains(event.target) &&
            navbarNav.classList.contains("show")
        ) {
            navbarNav.classList.remove("show");
        }
    });

    // Close the menu on Escape key
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && navbarNav.classList.contains("show")) {
            navbarNav.classList.remove("show");
        }
    });
});