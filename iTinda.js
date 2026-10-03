const animatedElements = document.querySelectorAll(
    ".itinda_hero_content, " +
    ".itinda_hero_visual, " +
    ".information_heading, " +
    ".info_block, " +
    ".info_gallery_item, " +
    ".itinda_footer_content"
);

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
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px"
    }
);

animatedElements.forEach((element) => {
    animationObserver.observe(element);
});