const searchInput = document.getElementById("searchInput");
const grid = document.getElementById("pelisGrid");

if (searchInput && grid) {
  searchInput.addEventListener("input", () => {
      const term = searchInput.value.toLowerCase();
      const cards = grid.querySelectorAll(".peli-card");

      cards.forEach(card => {
          const title = card.querySelector("p").textContent.toLowerCase();
          card.style.display = title.includes(term) ? "block" : "none";
      });
  });
}

// Toggle del menú usando clases existentes (.hamburger, .nav, .nav.open)
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    const checkbox = document.querySelector('#menu-toggle');
    if (!hamburger || !nav) return;

    const open = () => {
        nav.classList.add('open');
        hamburger.setAttribute('aria-expanded', 'true');
        if (checkbox) checkbox.checked = true;
    };
    const close = () => {
        nav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        if (checkbox) checkbox.checked = false;
    };
    const toggle = (e) => {
        e.preventDefault();
        if (nav.classList.contains('open')) {
            close();
        } else {
            open();
        }
    };

    hamburger.addEventListener('click', toggle);

    // Cerrar al hacer click fuera
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
            close();
        }
    });

    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') close();
    });
});

