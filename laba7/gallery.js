/*jslint browser */
document.addEventListener("DOMContentLoaded", function () {
    "use strict";
    const gallery = document.getElementById("gallery");
    const slides = Array.from(gallery.querySelectorAll(".gallery-slide"));
    const previous = document.getElementById("gallery-previous");
    const next = document.getElementById("gallery-next");
    const pager = document.getElementById("gallery-pager");
    const status = document.getElementById("gallery-status");
    const desktop = window.matchMedia("(min-width: 768px)");
    let page = 0;
    let perPage = (
        desktop.matches
        ? 3
        : 1
    );

    function render() {
        const pageCount = Math.ceil(slides.length / perPage);
        page = Math.min(page, pageCount - 1);
        slides.forEach(function (slide, index) {
            slide.hidden = index < page * perPage || index >= (page + 1) * perPage;
        });
        previous.disabled = page === 0;
        next.disabled = page === pageCount - 1;
        status.textContent = "Страница " + (page + 1) + " из " + pageCount;
        // Сохраняем кнопки при перелистывании, чтобы не терялся фокус.
        if (pager.children.length !== pageCount) {
            pager.replaceChildren();
            Array.from(Array.from({length: pageCount}).keys()).forEach(function (index) {
                const button = document.createElement("button");
                button.type = "button";
                button.textContent = String(index + 1);
                button.setAttribute("aria-label", "Страница " + (index + 1));
                button.addEventListener("click", function () {
                    page = index;
                    render();
                });
                pager.appendChild(button);
            });
        }
        Array.from(pager.children).forEach(function (button, index) {
            button.setAttribute("aria-current", (
                index === page
                ? "page"
                : "false"
            ));
        });
    }

    previous.addEventListener("click", function () {
        page -= 1;
        render();
    });
    next.addEventListener("click", function () {
        page += 1;
        render();
    });
    desktop.addEventListener("change", function () {
        const firstVisible = page * perPage;
        perPage = (
            desktop.matches
            ? 3
            : 1
        );
        page = Math.floor(firstVisible / perPage);
        render();
    });
    render();
});
