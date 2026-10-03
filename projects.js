const projects = [
    {
        type: "SOFTWARE PROJECT",
        name: "iTinda",
        image: "img_projects/itinda.png",
        imageAlt: "iTinda application icon",
        summary:
            "A point-of-sale software application designed for handling products, inventory, sales transactions, and basic store operations.",
        stack: "C# + SQLite",
        details:
            "iTinda brings common point-of-sale workflows into one desktop application. It is designed to help manage products, monitor inventory, process transactions, and keep sales records organized.",
        tags: [
            "C#",
            "SQLITE",
            "POS",
            "INVENTORY",
            "SALES"
        ],
        codeUrl: "https://github.com/grenVoid/iTinda",
        exploreUrl: "iTinda.html"
    },

    {
        type: "MOBILE PROJECT",
        name: "CalPRESS",
        image: "img_projects/calpress.svg",
        imageAlt: "CalPRESS application icon",
        summary:
            "A simple mobile calculator application focused on quick and straightforward everyday calculations.",
        stack: "Java + XML + SQLite",
        details:
            "CalPRESS is a lightweight calculator application built for mobile use. The project focuses on simple interaction, practical calculations, and a clean interface.",
        tags: [
            "JAVA",
            "XML",
            "SQLITE",
            "MOBILE",
            "CALCULATOR"
        ],
        codeUrl: "https://github.com/grenVoid/CalPRESS",
        downloadUrl:
            "https://github.com/grenVoid/CalPRESS/releases/download/v1.0.0/CalPRESS.apk",
        exploreUrl: "CalPRESS.html"
    },

    {
        type: "MOBILE PROJECT",
        name: "Chrona",
        image: "img_projects/chrona.png",
        imageAlt: "Chrona application icon",
        summary:
            "A mobile productivity application that combines scheduling, reminders, and accountability to help users stay organized and follow through with planned activities.",
        stack: "Java + XML + SQLite",
        details:
            "Chrona is built around planned activities and personal accountability. Users can organize schedules, receive reminders, and keep track of commitments they want to complete.",
        tags: [
            "JAVA",
            "XML",
            "SQLITE",
            "SCHEDULING",
            "REMINDERS",
            "ACCOUNTABILITY"
        ],
        codeUrl: "https://github.com/grenVoid/CHRONA",
        downloadUrl:
            "https://github.com/grenVoid/CHRONA/releases/download/v1.0.0/CHRONA-release_v1.0.apk",
        exploreUrl: "Chrona.html"
    }
];

const projectsList = document.getElementById("projects_list");

let redirectTimer = null;
let redirectTarget = null;

function createRedirectModal() {
    if (document.getElementById("github_redirect_modal")) {
        return;
    }

    const modal = document.createElement("div");

    modal.id = "github_redirect_modal";

    modal.innerHTML = `
        <div class="github_redirect_backdrop"></div>

        <div
            class="github_redirect_box"
            role="dialog"
            aria-modal="true"
            aria-labelledby="github_redirect_title"
        >

            <div class="github_redirect_label">
                EXTERNAL LINK
            </div>

            <h2 id="github_redirect_title">
                You're about to leave this page
            </h2>

            <p>
                You are being redirected to GitHub to view the
                source code of this project.
            </p>

            <div class="github_redirect_countdown">
                Redirecting in
                <span id="github_redirect_timer">3</span>
            </div>

            <button
                type="button"
                class="github_redirect_cancel"
                id="github_redirect_cancel"
            >
                CANCEL
            </button>

        </div>
    `;

    document.body.appendChild(modal);

    const cancelButton = document.getElementById(
        "github_redirect_cancel"
    );

    const backdrop = modal.querySelector(
        ".github_redirect_backdrop"
    );

    cancelButton.addEventListener("click", cancelGithubRedirect);
    backdrop.addEventListener("click", cancelGithubRedirect);
}

function openGithubRedirect(url) {
    createRedirectModal();

    const modal = document.getElementById(
        "github_redirect_modal"
    );

    const timerElement = document.getElementById(
        "github_redirect_timer"
    );

    redirectTarget = url;

    clearInterval(redirectTimer);

    let countdown = 3;

    timerElement.textContent = countdown;

    modal.classList.add("is_active");

    redirectTimer = setInterval(() => {
        countdown -= 1;

        timerElement.textContent = countdown;

        if (countdown <= 0) {
            clearInterval(redirectTimer);

            if (redirectTarget) {
                window.location.href = redirectTarget;
            }
        }
    }, 1000);
}

function cancelGithubRedirect() {
    clearInterval(redirectTimer);

    redirectTimer = null;
    redirectTarget = null;

    const modal = document.getElementById(
        "github_redirect_modal"
    );

    if (modal) {
        modal.classList.remove("is_active");
    }
}

function createProjectCard(project) {
    const card = document.createElement("article");

    card.className = "project_card";

    const downloadButton = project.downloadUrl
        ? `
            <a
                href="${project.downloadUrl}"
                class="project_button project_download_button"
                download
            >
                DOWNLOAD FOR FREE
            </a>
        `
        : "";

    card.innerHTML = `
        <div class="project_icon_wrap">

            <img
                src="${project.image}"
                alt="${project.imageAlt}"
                class="project_icon"
            >

        </div>

        <div class="project_card_top">

            <span class="project_type">
                ${project.type}
            </span>

            <h2 class="project_name">
                ${project.name}
            </h2>

            <p class="project_summary">
                ${project.summary}
            </p>

            <div class="project_stack">
                ${project.stack}
            </div>

            <div class="project_details_trigger">

                <span>
                    MORE DETAILS
                </span>

                <span class="project_arrow">
                    ↓
                </span>

            </div>

            <div class="project_more">

                <p>
                    ${project.details}
                </p>

                <div class="project_tags">

                    ${project.tags
                        .map(
                            (tag) => `
                                <span>
                                    ${tag}
                                </span>
                            `
                        )
                        .join("")}

                </div>

            </div>

        </div>

        <div class="project_actions">

            <a
                href="${project.codeUrl}"
                class="project_button project_code_button"
                data-github-url="${project.codeUrl}"
            >
                VIEW CODE
            </a>

            ${downloadButton}

            <a
                href="${project.exploreUrl}"
                class="project_button project_explore_button"
            >
                EXPLORE
            </a>

        </div>
    `;

    const codeButton = card.querySelector(
        ".project_code_button"
    );

    codeButton.addEventListener("click", (event) => {
        event.preventDefault();

        const githubUrl = codeButton.getAttribute(
            "data-github-url"
        );

        if (githubUrl) {
            openGithubRedirect(githubUrl);
        }
    });

    return card;
}

if (projectsList) {
    projects.forEach((project) => {
        projectsList.appendChild(
            createProjectCard(project)
        );
    });
}