const body = document.body;
const menuToggle = document.querySelector(".menu_toggle");
const pageOverlay = document.querySelector(".page_overlay");
const navLinks = document.querySelectorAll(".navigate_contents a");
const sections = document.querySelectorAll("main section");

function openMenu() {
    body.classList.add("menu_open");

    if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "true");
    }
}

function closeMenu() {
    body.classList.remove("menu_open");

    if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");
    }
}

function toggleMenu() {
    if (body.classList.contains("menu_open")) {
        closeMenu();
    } else {
        openMenu();
    }
}

function setActiveLink(sectionId) {
    navLinks.forEach((link) => {
        const target = link.getAttribute("href");

        link.classList.toggle(
            "active",
            target === `#${sectionId}`
        );
    });
}

function getCurrentSection() {
    const activationPoint =
        window.scrollY + window.innerHeight * 0.35;

    let currentSection = sections[0];

    sections.forEach((section) => {
        const sectionTop =
            section.getBoundingClientRect().top +
            window.scrollY;

        if (sectionTop <= activationPoint) {
            currentSection = section;
        }
    });

    return currentSection;
}

function updateActiveSection() {
    const currentSection = getCurrentSection();

    if (currentSection) {
        setActiveLink(currentSection.id);
    }
}

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            const section = entry.target;

            if (entry.isIntersecting) {
                section.classList.add("section_visible");
                section.classList.remove("section_hidden");
            } else {
                section.classList.remove("section_visible");
                section.classList.add("section_hidden");
            }
        });
    },
    {
        threshold: 0.18,
        rootMargin: "-8% 0px -8% 0px"
    }
);

sections.forEach((section) => {
    sectionObserver.observe(section);
});

if (menuToggle) {
    menuToggle.addEventListener("click", toggleMenu);
}

if (pageOverlay) {
    pageOverlay.addEventListener("click", closeMenu);
}

navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        const targetId = link.getAttribute("href");
        const targetSection =
            document.querySelector(targetId);

        if (!targetSection) {
            return;
        }

        setActiveLink(targetSection.id);
        closeMenu();

        const targetTop =
            targetSection.getBoundingClientRect().top +
            window.scrollY;

        window.scrollTo({
            top: targetTop,
            behavior: "smooth"
        });
    });
});

let scrollTicking = false;

window.addEventListener("scroll", () => {
    if (scrollTicking) {
        return;
    }

    window.requestAnimationFrame(() => {
        updateActiveSection();
        scrollTicking = false;
    });

    scrollTicking = true;
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        closeMenu();
    }

    updateActiveSection();
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});

const matrixElement =
    document.querySelector(".matrix_text");

if (matrixElement) {
    const originalText =
        matrixElement.dataset.text;

    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&@";

    let animationTimer;

    function randomCharacter() {
        return characters[
            Math.floor(
                Math.random() * characters.length
            )
        ];
    }

    function scrambleText() {
        clearInterval(animationTimer);

        let iteration = 0;

        animationTimer = setInterval(() => {
            matrixElement.textContent =
                originalText
                    .split("")
                    .map((character, index) => {
                        if (character === " ") {
                            return " ";
                        }

                        if (index < iteration) {
                            return originalText[index];
                        }

                        return randomCharacter();
                    })
                    .join("");

            iteration += 0.5;

            if (iteration >= originalText.length) {
                clearInterval(animationTimer);

                matrixElement.textContent =
                    originalText;
            }
        }, 45);
    }

    function startMatrixLoop() {
        scrambleText();

        setTimeout(() => {
            startMatrixLoop();
        }, 4200);
    }

    startMatrixLoop();
}

window.addEventListener("load", () => {
    sections.forEach((section) => {
        const rect =
            section.getBoundingClientRect();

        const visible =
            rect.top < window.innerHeight * 0.9 &&
            rect.bottom > window.innerHeight * 0.1;

        if (
            visible ||
            section.classList.contains("home_section")
        ) {
            section.classList.add("section_visible");
            section.classList.remove("section_hidden");
        }
    });

    updateActiveSection();
});