const servicesData = {
    contactEmail: "estonidorei@gmail.com",

    services: [
        {
            type: "PRIMARY SERVICE",
            title: "App Commission",
            description:
                "Custom desktop and mobile applications built around your requirements, workflow, and intended use.",
            targets: [
                "STUDENT",
                "PERSONAL",
                "SMALL BUSINESS"
            ],
            examplesTitle: "Suitable for:",
            examples: [
                "Student Projects",
                "Productivity Apps",
                "POS Systems",
                "Inventory Systems",
                "Custom Utility Apps"
            ],
            subject: "App Commission Inquiry"
        },

        {
            type: "AI-ASSISTED SERVICE",
            title: "Web Development",
            description:
                "Websites built using AI-assisted development workflows, with customization based on your project requirements and goals.",
            targets: [
                "PORTFOLIO",
                "LANDING PAGE",
                "SMALL BUSINESS"
            ],
            examplesTitle: "Current technologies:",
            examples: [
                "HTML",
                "CSS",
                "JavaScript"
            ],
            subject: "Website Development Inquiry"
        }
    ]
};

const servicesContainer =
    document.getElementById("services_container");

function createServices() {
    if (!servicesContainer) return;

    servicesContainer.innerHTML = `
        <div class="services_heading">

            <p class="section_label">
                SERVICES
            </p>

            <h1 class="h1_services">
                What I Can Build
            </h1>

            <p class="services_intro">
                I build practical software for students, individuals,
                and small businesses, while also offering AI-assisted
                web development for personal and business needs.
            </p>

        </div>

        <div class="services_grid">

            ${servicesData.services
                .map((service) => createServiceCard(service))
                .join("")}

        </div>
    `;
}

function createServiceCard(service) {
    const gmailUrl =
        "https://mail.google.com/mail/?view=cm&fs=1" +
        `&to=${encodeURIComponent(servicesData.contactEmail)}` +
        `&su=${encodeURIComponent(service.subject)}`;

    return `
        <article class="service_card">

            <div class="service_icon">
                <span>&lt;/&gt;</span>
            </div>

            <div class="service_content">

                <span class="service_type">
                    ${service.type}
                </span>

                <h2 class="service_title">
                    ${service.title}
                </h2>

                <p class="service_description">
                    ${service.description}
                </p>

                <div class="service_targets">

                    ${service.targets
                        .map(
                            (target) => `
                                <span>${target}</span>
                            `
                        )
                        .join("")}

                </div>

                <div class="service_examples">

                    <p>
                        ${service.examplesTitle}
                    </p>

                    ${service.examples
                        .map(
                            (example) => `
                                <span>${example}</span>
                            `
                        )
                        .join("")}

                </div>

            </div>

            <a
                href="${gmailUrl}"
                class="service_contact_button"
                target="_blank"
                rel="noopener noreferrer"
            >
                <span>INQUIRE VIA GMAIL</span>
                <span class="service_contact_arrow">→</span>
            </a>

        </article>
    `;
}

createServices();