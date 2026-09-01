// =====================================
// NAVBAR & SCROLL
// =====================================
const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const links = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", function () {
    if (window.scrollY > 20) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
});

// =====================================
// MENU MOBILE
// =====================================
menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
    const open = navLinks.classList.contains("active");
    menuToggle.textContent = open ? "×" : "☰";
    menuToggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
});

links.forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("active");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-label", "Buka menu");
    });
});

// =====================================
// NAVBAR ACTIVE SECTION
// =====================================
const sections = document.querySelectorAll("main section[id]");
const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            links.forEach(function (link) {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === "#" + entry.target.id
                );
            });
        }
    });
}, {
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0
});
sections.forEach(section => sectionObserver.observe(section));

// =====================================
// ANIMASI SAAT SCROLL
// =====================================
const cards = document.querySelectorAll(
    ".profile-card, .gender-card, .population-total, .facility-card, .place-card, .facility-photo-card, .info-banner"
);

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

cards.forEach(function (card) {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity .6s ease, transform .6s ease";
    observer.observe(card);
});

// =====================================
// FILTER FASILITAS
// =====================================
const filterButtons = document.querySelectorAll(".facility-filter");
const facilityCards = document.querySelectorAll(".facility-photo-card");

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const filter = button.dataset.filter;

        filterButtons.forEach(item => item.classList.remove("active"));
        button.classList.add("active");

        facilityCards.forEach(function (card) {
            const show = filter === "all" || card.dataset.category === filter;
            card.classList.toggle("is-hidden", !show);
        });
    });
});

// =====================================
// MAP ASLI - LEAFLET / OPENSTREETMAP
// =====================================
const desaMapElement = document.getElementById("desaMap");

if (desaMapElement && typeof L !== "undefined") {
    const desaMensere = [1.21444, 109.11887];

    const map = L.map("desaMap", {
        scrollWheelZoom: false
    }).setView(desaMensere, 14);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>'
    }).addTo(map);

    L.marker(desaMensere)
        .addTo(map)
        .bindPopup("<strong>Desa Mensere</strong><br>Kecamatan Tebas, Kabupaten Sambas")
        .openPopup();

    map.on("click", function () {
        map.scrollWheelZoom.enable();
    });

    map.on("mouseout", function () {
        map.scrollWheelZoom.disable();
    });
}

console.log("Website Desa Mensere berhasil dijalankan.");
