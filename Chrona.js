const animatedElements = document.querySelectorAll(
    ".chrona_hero_content, " +
    ".chrona_hero_visual, " +
    ".information_heading, " +
    ".info_block, " +
    ".chrona_footer_content"
);

document.body.classList.add("chrona_animate_ready");

const animationObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            entry.target.classList.toggle(
                "is-visible",
                entry.isIntersecting
            );
        });
    },
    {
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px"
    }
);

animatedElements.forEach((element) => {
    animationObserver.observe(element);
});