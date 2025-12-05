/* const ham = document.getElementById("hamburger");
const nav = document.getElementById("navMenu");

ham.addEventListener("click", () => {
    nav.classList.toggle("open");
});


const searchInput = document.getElementById("searchInput");
const grid = document.getElementById("pelisGrid");

searchInput.addEventListener("input", () => {
    const term = searchInput.value.toLowerCase();
    const cards = grid.querySelectorAll(".peli-card");

    cards.forEach(card => {
        const title = card.querySelector("p").textContent.toLowerCase();
        card.style.display = title.includes(term) ? "block" : "none";
    });
});
 */
