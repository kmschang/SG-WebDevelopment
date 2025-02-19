// Back To Top Button
const backToTopBtn = document.getElementById('backToTopBtn');
window.onscroll = function() {
    if (document.body.scrollTop > window.innerHeight || document.documentElement.scrollTop > window.innerHeight) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
};
backToTopBtn.onclick = function() {
    window.scrollTo({ top: 0, behavior: "smooth"});
}


// No Scroll Padding
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.no-scroll-padding').forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default scroll behavior
            const targetId = this.getAttribute('href').substring(1); // Get the target ID
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const targetPosition = targetElement.offsetTop; // Get element's top position
                window.scrollTo({
                    top: targetPosition, // Scroll directly to the element
                    behavior: 'smooth' // Smooth scrolling
                });
            }
        });
    });
});
