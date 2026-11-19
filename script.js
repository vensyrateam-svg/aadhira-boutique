
/* 1. Mobile navigation */

const menuButton = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuButton && navMenu) {
    menuButton.addEventListener("click", function () {
        const isOpen = navMenu.classList.toggle("active");

        menuButton.setAttribute("aria-expanded", isOpen);
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    navMenu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navMenu.classList.remove("active");
            menuButton.setAttribute("aria-expanded", "false");
        });
    });
}


/* 2. Boutique WhatsApp number */

// Keep your existing boutiqueNumber line here.


/* 3. Customer enquiry form */

const enquiryForm = document.getElementById("enquiry-form");

if (enquiryForm) {
    enquiryForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("customer-name").value.trim();
        const phone = document.getElementById("customer-phone").value.trim();
        const service = document.getElementById("service").value;
        const requirements = document.getElementById("customer-message").value.trim();

        const enquiryMessage =
            `Hello Aadhira Boutique!

Name: ${name}
Phone: ${phone}
Service: ${service}
Requirements: ${requirements}`;

        const whatsappURL =
            `https://wa.me/${boutiqueNumber}?text=${encodeURIComponent(enquiryMessage)}`;

        window.open(whatsappURL, "_blank");
    });
}


const galleryImages = document.querySelectorAll(".collection-card img");

const lightbox = document.getElementById("design-lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxDescription = document.getElementById("lightbox-description");
const lightboxClose = document.getElementById("lightbox-close");

const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");
const lightboxCounter = document.getElementById("lightbox-counter");

let currentImageIndex = 0;

function showDesign(index) {
    currentImageIndex = (index + galleryImages.length) % galleryImages.length;

    const image = galleryImages[currentImageIndex];
    const card = image.closest(".collection-card");

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    lightboxTitle.textContent = card.querySelector("h3").textContent;
    lightboxDescription.textContent = card.querySelector("p").textContent;

    lightboxCounter.textContent =
        `${currentImageIndex + 1} / ${galleryImages.length}`;
}

galleryImages.forEach(function (image, index) {
    image.style.cursor = "pointer";

    image.addEventListener("click", function () {
        showDesign(index);
        lightbox.classList.add("active");
    });
});

lightboxNext.addEventListener("click", function () {
    showDesign(currentImageIndex + 1);
});

lightboxPrev.addEventListener("click", function () {
    showDesign(currentImageIndex - 1);
});

lightboxClose.addEventListener("click", function () {
    lightbox.classList.remove("active");
});

lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
        lightbox.classList.remove("active");
    }
});

document.addEventListener("keydown", function (event) {
    if (!lightbox.classList.contains("active")) return;

    if (event.key === "Escape") {
        lightbox.classList.remove("active");
    }

    if (event.key === "ArrowRight") {
        showDesign(currentImageIndex + 1);
    }

    if (event.key === "ArrowLeft") {
        showDesign(currentImageIndex - 1);
    }
});





/* AADHIRA - Repeatable Scroll Reveal */

const revealElements = document.querySelectorAll(
    "section:not(#home), .collection-card, .craft-card"
);

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion || !("IntersectionObserver" in window)) {

    revealElements.forEach(function (element) {
        element.classList.add("is-visible");
    });

} else {

    const revealObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                } else {
                    entry.target.classList.remove("is-visible");
                }

            });

        },
        {
            threshold: 0.05
        }
    );

    revealElements.forEach(function (element, index) {

        element.classList.add("reveal-on-scroll");

        element.style.transitionDelay =
            (index % 3) * 100 + "ms";

        revealObserver.observe(element);

    });

}


