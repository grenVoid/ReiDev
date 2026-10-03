const SUPABASE_URL =
    "https://zauprktqiqjdadtnezej.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_fT10C60dj5cqfX3Vj92mJQ_4hw2yueV";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

const feedbackContainer =
    document.getElementById("feedback_container");

let feedbackLoading = false;

function escapeHtml(value) {
    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function createStars(rating) {
    let stars = "";

    for (let i = 1; i <= 5; i++) {
        stars += i <= rating ? "★" : "☆";
    }

    return stars;
}

function renderFeedback(items) {
    const list =
        document.getElementById("feedback_list");

    if (!list) return;

    if (!items.length) {
        list.innerHTML = `
            <div class="feedback_empty">
                No published feedback yet.
            </div>
        `;

        return;
    }

    list.innerHTML = items
        .map((item) => {
            const email =
                escapeHtml(item.email);

            const message =
                escapeHtml(item.message);

            const rating =
                Number(item.rating);

            return `
                <article class="feedback_item">

                    <div class="feedback_email">
                        ${email}
                    </div>

                    <p class="feedback_message">
                        ${message}
                    </p>

                    ${
                        rating >= 1 &&
                        rating <= 5
                            ? `
                                <div
                                    class="feedback_rating"
                                    aria-label="${rating} out of 5 stars"
                                >
                                    ${createStars(rating)}
                                </div>
                            `
                            : ""
                    }

                </article>
            `;
        })
        .join("");
}

async function loadFeedback(showLoading = false) {
    if (feedbackLoading) return;

    const list =
        document.getElementById("feedback_list");

    if (!list) return;

    feedbackLoading = true;

    if (showLoading) {
        list.innerHTML = `
            <div class="feedback_loading">
                Loading feedback...
            </div>
        `;
    }

    try {
        const {
            data,
            error
        } = await supabaseClient.rpc(
            "get_published_feedback"
        );

        if (error) {
            console.error(
                "Feedback loading error:",
                error
            );

            if (showLoading) {
                list.innerHTML = `
                    <div class="feedback_empty">
                        Unable to load feedback.
                    </div>
                `;
            }

            return;
        }

        renderFeedback(
            Array.isArray(data) ? data : []
        );

    } catch (error) {
        console.error(
            "Feedback request error:",
            error
        );

        if (showLoading) {
            list.innerHTML = `
                <div class="feedback_empty">
                    Unable to load feedback.
                </div>
            `;
        }

    } finally {
        feedbackLoading = false;
    }
}

function setFeedbackStatus(
    message,
    state
) {
    const status =
        document.getElementById(
            "feedback_status"
        );

    if (!status) return;

    status.textContent = message;

    status.className =
        `feedback_status ${state}`;
}

function renderFeedbackForm() {
    if (!feedbackContainer) return;

    feedbackContainer.innerHTML = `
        <p class="section_label">
            FEEDBACK
        </p>

        <h1 class="h1_feedback">
            Feedback
        </h1>

        <p class="feedback_intro">
            Your feedback helps me improve my work.
        </p>

        <form
            class="feedback_form"
            id="feedback_form"
        >

            <div class="feedback_field">

                <label for="feedback_email">
                    YOUR GMAIL
                </label>

                <input
                    type="email"
                    id="feedback_email"
                    name="email"
                    placeholder="Enter your Gmail address"
                    autocomplete="email"
                    maxlength="120"
                    required
                >

                <span class="feedback_hint">
                    Your Gmail will not be displayed publicly.
                </span>

            </div>

            <div class="feedback_field">

                <label for="feedback_message">
                    YOUR MESSAGE
                </label>

                <textarea
                    id="feedback_message"
                    name="message"
                    placeholder="Write your feedback here..."
                    maxlength="1000"
                    rows="5"
                    required
                ></textarea>

                <span class="feedback_hint">
                    Tell me what you think about my work,
                    projects, or website.
                </span>

            </div>

            <button
                type="submit"
                class="feedback_send_button"
            >
                FEEDBACK SEND
            </button>

            <div
                class="feedback_status ready"
                id="feedback_status"
            >
                READY TO SEND
            </div>

        </form>

        <div class="feedback_published">

            <div class="feedback_published_heading">
                PUBLISHED FEEDBACK
            </div>

            <div
                class="feedback_list"
                id="feedback_list"
            >
                <div class="feedback_loading">
                    Loading feedback...
                </div>
            </div>

        </div>
    `;

    const form =
        document.getElementById(
            "feedback_form"
        );

    form.addEventListener(
        "submit",
        submitFeedback
    );

    loadFeedback(true);
}

async function submitFeedback(event) {
    event.preventDefault();

    const form =
        event.currentTarget;

    const email =
        document
            .getElementById("feedback_email")
            .value
            .trim();

    const message =
        document
            .getElementById("feedback_message")
            .value
            .trim();

    if (!email) {
        setFeedbackStatus(
            "PLEASE ENTER YOUR GMAIL",
            "error"
        );

        return;
    }

    if (
        !/^[^\s@]+@gmail\.com$/i.test(email)
    ) {
        setFeedbackStatus(
            "PLEASE ENTER A VALID GMAIL",
            "error"
        );

        return;
    }

    if (!message) {
        setFeedbackStatus(
            "PLEASE ENTER YOUR MESSAGE",
            "error"
        );

        return;
    }

    if (message.length < 5) {
        setFeedbackStatus(
            "MESSAGE IS TOO SHORT",
            "error"
        );

        return;
    }

    if (message.length > 1000) {
        setFeedbackStatus(
            "MESSAGE IS TOO LONG",
            "error"
        );

        return;
    }

    const button =
        form.querySelector(
            ".feedback_send_button"
        );

    button.disabled = true;

    setFeedbackStatus(
        "SENDING...",
        "sending"
    );

    try {
        const {
            error
        } = await supabaseClient
            .from("feedback")
            .insert({
                email: email,
                message: message
            });

        if (error) {
            console.error(
                "Feedback submission error:",
                error
            );

            setFeedbackStatus(
                "SENDING FAILED",
                "error"
            );

            return;
        }

        form.reset();

        setFeedbackStatus(
            "FEEDBACK SENT — AWAITING REVIEW",
            "success"
        );

        await loadFeedback();

    } catch (error) {
        console.error(
            "Feedback request error:",
            error
        );

        setFeedbackStatus(
            "SENDING FAILED",
            "error"
        );

    } finally {
        button.disabled = false;
    }
}

renderFeedbackForm();

setInterval(() => {
    loadFeedback(false);
}, 10000);

document.addEventListener(
    "visibilitychange",
    () => {
        if (!document.hidden) {
            loadFeedback(false);
        }
    }
);