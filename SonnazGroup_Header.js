function toggleNavigation() {
  const background = document.getElementById('side-navigation-background');
  const sideNav = document.getElementById('side-navigation');

  sideNav.classList.toggle('active');
  background.classList.toggle('active');
}

function closeNavigation() {
  const background = document.getElementById('side-navigation-background');
  const sideNav = document.getElementById('side-navigation');

  sideNav.classList.remove('active');
  background.classList.remove('active');
}

document.getElementById('menu-button').addEventListener('click', function() {
  toggleNavigation();
});

document.getElementById('side-navigation-background').addEventListener('click', function() {
  closeNavigation();
});

document.getElementById('menu-button').addEventListener('click', function() {
  toggleNavigation();
});

document.getElementById('back-button').addEventListener('click', function() {
  closeNavigation();
});

document.addEventListener('DOMContentLoaded', function() {
  const mainLinkButtons = document.querySelectorAll('.main-link-container button:first-child');
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  let currentlyOpenSubLinks = null;

  // Function to close sub-links with transition
  const closeSubLinks = (container) => {
    container.style.maxHeight = '0px';
    container.style.opacity = '0';
    setTimeout(() => {
      container.classList.remove('show');
    }, 300);
  };

  // Toggle sub-links when the main link button is clicked
  mainLinkButtons.forEach((button, index) => {
    button.addEventListener('click', function(event) {
      event.preventDefault();

      const mainLinkContainer = this.closest('.main-link-container');
      const subLinksContainer = mainLinkContainer.nextElementSibling;
      const dropdownToggle = mainLinkContainer.querySelector('.dropdown-toggle');

      // Close currently open sub-links if they're different from the clicked one
      if (currentlyOpenSubLinks && currentlyOpenSubLinks !== subLinksContainer) {
        closeSubLinks(currentlyOpenSubLinks);
        const previousToggle = currentlyOpenSubLinks.previousElementSibling.querySelector('.dropdown-toggle');
        previousToggle.querySelectorAll('.carrot-icon').forEach(icon => {
          icon.classList.remove('rotated');
        });
        currentlyOpenSubLinks = null;
      }

      // Toggle the sub-links visibility
      if (subLinksContainer && subLinksContainer.classList.contains('sub-links-container')) {
        if (subLinksContainer.classList.contains('show')) {
          closeSubLinks(subLinksContainer);
          currentlyOpenSubLinks = null;
        } else {
          subLinksContainer.classList.add('show');
          subLinksContainer.style.maxHeight = subLinksContainer.scrollHeight + "px";
          subLinksContainer.style.opacity = '1';
          currentlyOpenSubLinks = subLinksContainer;
        }

        // Toggle the carrot icon rotation
        dropdownToggle.querySelectorAll('.carrot-icon').forEach(icon => {
          icon.classList.toggle('rotated');
        });
      }
    });
  });

  // Toggle sub-links when dropdown toggle is clicked
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(event) {
      event.preventDefault();

      const mainLinkContainer = this.closest('.main-link-container');
      const subLinksContainer = mainLinkContainer.nextElementSibling;

      // Close currently open sub-links if they're different from the clicked one
      if (currentlyOpenSubLinks && currentlyOpenSubLinks !== subLinksContainer) {
        closeSubLinks(currentlyOpenSubLinks);
        const previousToggle = currentlyOpenSubLinks.previousElementSibling.querySelector('.dropdown-toggle');
        previousToggle.querySelectorAll('.carrot-icon').forEach(icon => {
          icon.classList.remove('rotated');
        });
        currentlyOpenSubLinks = null;
      }

      // Toggle the sub-links visibility
      if (subLinksContainer && subLinksContainer.classList.contains('sub-links-container')) {
        if (subLinksContainer.classList.contains('show')) {
          closeSubLinks(subLinksContainer);
          currentlyOpenSubLinks = null;
        } else {
          subLinksContainer.classList.add('show');
          subLinksContainer.style.maxHeight = subLinksContainer.scrollHeight + "px";
          subLinksContainer.style.opacity = '1';
          currentlyOpenSubLinks = subLinksContainer;
        }

        // Toggle the carrot icon rotation
        this.querySelectorAll('.carrot-icon').forEach(icon => {
          icon.classList.toggle('rotated');
        });
      }
    });
  });
});
