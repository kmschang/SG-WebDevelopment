document.addEventListener("DOMContentLoaded", () => {
    const navbarToggler = document.getElementById("navbar-toggler");
    const navbarNav = document.getElementById("navbarNav");

    // Close the menu when the toggler is clicked again
    navbarToggler.addEventListener("click", () => {
        const isCollapsed = navbarNav.classList.contains("show");
        if (isCollapsed) {
            const collapseInstance = bootstrap.Collapse.getInstance(navbarNav) || new bootstrap.Collapse(navbarNav);
            collapseInstance.hide();
        }
    });

    // Close the menu when clicking outside of it
    document.addEventListener("click", (event) => {
        if (
            !navbarNav.contains(event.target) &&
            !navbarToggler.contains(event.target) &&
            navbarNav.classList.contains("show")
        ) {
            const collapseInstance = bootstrap.Collapse.getInstance(navbarNav) || new bootstrap.Collapse(navbarNav);
            collapseInstance.hide();
        }
    });

    // Close the menu when pressing the Escape key
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && navbarNav.classList.contains("show")) {
            const collapseInstance = bootstrap.Collapse.getInstance(navbarNav) || new bootstrap.Collapse(navbarNav);
            collapseInstance.hide();
        }
    });
});