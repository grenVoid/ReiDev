const contactData = {
    title: "Let's Connect",

    description:
        "For project inquiries, collaborations, or questions, you can reach me through any of the platforms below.",

    links: [
        {
            name: "Facebook",
            icon: "img_contacts/facebook.png",
            url: "https://facebook.com/geoven.rei.e.nicolas"
        },
        {
            name: "TikTok",
            icon: "img_contacts/tiktok.png",
            url: "https://www.tiktok.com/@g_reiiiiiiiii"
        },
        {
            name: "Instagram",
            icon: "img_contacts/instagram.png",
            url: "https://instagram.com/euwii_13"
        },
        {
            name: "Gmail",
            icon: "img_contacts/gmail.png",
            url:
                "https://mail.google.com/mail/?view=cm&fs=1&to=estonidorei@gmail.com&su=Project%20Inquiry"
        },
        {
            name: "GitHub",
            icon: "img_contacts/github.png",
            url: "https://github.com/grenVoid"
        }
    ]
};

const contactContainer =
    document.getElementById("contact_container");

function renderContact() {
    if (!contactContainer) return;

    contactContainer.innerHTML = `
        <p class="section_label">
            CONTACT
        </p>

        <h1 class="h1_contact">
            ${contactData.title}
        </h1>

        <p class="contact_description">
            ${contactData.description}
        </p>

        <div class="contact_socials">

            ${contactData.links
                .map(
                    (link) => `
                        <a
                            href="${link.url}"
                            class="contact_social"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="${link.name}"
                        >
                            <img
                                src="${link.icon}"
                                alt="${link.name}"
                            >
                        </a>
                    `
                )
                .join("")}

        </div>
    `;
}

renderContact();