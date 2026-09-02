document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header");
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const links = document.querySelectorAll(".nav-links a");

    // Header saat halaman discroll
    window.addEventListener("scroll", () => {
        if (header) header.classList.toggle("scrolled", window.scrollY > 20);
    });

    // Menu mobile
    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            menuToggle.textContent = navLinks.classList.contains("active") ? "×" : "☰";
        });
    }

    // Tutup menu setelah memilih halaman
    links.forEach(link => {
        link.addEventListener("click", () => {
            if (navLinks) navLinks.classList.remove("active");
            if (menuToggle) menuToggle.textContent = "☰";
        });
    });

    // Tandai menu halaman yang sedang dibuka
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    links.forEach(link => {
        const href = link.getAttribute("href");
        if (href === currentPage || (currentPage === "" && href === "index.html")) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    // Animasi elemen saat masuk layar
    const animatedElements = document.querySelectorAll(
        ".profile-card, .gender-card, .population-total, .facility-card, .place-card, .facility-photo-card, .info-banner"
    );
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        animatedElements.forEach(el => observer.observe(el));
    } else {
        animatedElements.forEach(el => el.classList.add("show"));
    }

    // Filter fasilitas
    const filterButtons = document.querySelectorAll(".filter-btn");
    const facilityCards = document.querySelectorAll(".facility-photo-card");
    if (filterButtons.length && facilityCards.length) {
        filterButtons.forEach(button => {
            button.addEventListener("click", () => {
                filterButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");
                const filter = button.dataset.filter;
                facilityCards.forEach(card => {
                    const category = card.dataset.category;
                    card.style.display = filter === "all" || category === filter ? "" : "none";
                });
            });
        });
    }

    // Peta Desa Mensere
    const mapElement = document.getElementById("desaMap");
    if (mapElement && typeof L !== "undefined") {
        const desaMensere = [1.21444, 109.11887];
        const map = L.map("desaMap").setView(desaMensere, 14);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap contributors",
            maxZoom: 19
        }).addTo(map);
        L.marker(desaMensere).addTo(map)
            .bindPopup("<strong>Desa Mensere</strong><br>Kecamatan Tebas, Kabupaten Sambas")
            .openPopup();

        map.on("click", () => map.scrollWheelZoom.enable());
        map.on("mouseout", () => map.scrollWheelZoom.disable());
        map.scrollWheelZoom.disable();
    }

    // Tombol kembali ke atas
    const backToTop = document.querySelector(".back-to-top");
    if (backToTop) {
        window.addEventListener("scroll", () => {
            backToTop.classList.toggle("show", window.scrollY > 400);
        });
        backToTop.addEventListener("click", event => {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});
