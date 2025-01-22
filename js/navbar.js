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
            console.log("Clicked Outside");
        }
    });

    // Close the menu on the Escape key
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && navbarNav.classList.contains("show")) {
            navbarNav.classList.remove("show");
            console.log("Hit Escape");
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const navbarToggler = document.getElementById("navbar-toggler");
    const navbarNav = document.getElementById("navbarNav");

    // Toggle the menu when clicking the button
    navbarToggler.addEventListener("click", () => {
        const isExpanded = navbarNav.classList.contains("show");

        if (isExpanded) {
            // If the menu is open, close it
            navbarNav.classList.remove("show");
            navbarToggler.classList.remove("collapsed");
            navbarToggler.setAttribute("aria-expanded", "false");
            console.log("Close");
        } else {
            // If the menu is closed, open it
            navbarNav.classList.add("show");
            navbarToggler.classList.add("collapsed");
            navbarToggler.setAttribute("aria-expanded", "true");
            console.log("Open");
        }
    });
});