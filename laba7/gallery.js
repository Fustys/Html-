/*jslint browser */
document.addEventListener("DOMContentLoaded", function () {
    "use strict";
    const gallery = document.getElementById("gallery");
    const slideList = gallery.querySelector(".gallery-slides");
    const slides = Array.from(slideList.querySelectorAll(".gallery-slide"));
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
        page = (page + pageCount) % pageCount;
        const firstVisible = page * perPage;
        // На последней странице дополняем ряд изображениями с начала галереи.
        const orderedSlides = slides.slice(firstVisible).concat(slides.slice(0, firstVisible));
        orderedSlides.forEach(function (slide, index) {
            slide.hidden = index >= perPage;
            slideList.appendChild(slide);
        });
        status.textContent = "Страница " + (page + 1) + " из " + pageCount;
        // Сохраняем кнопки при перелистывании, чтобы не терялся фокус.
        if (pager.children.length !== pageCount) {
            pager.replaceChildren();
            Array.from(Array.from({length: pageCount}).keys()).forEach(function (index) {
                const button = document.createElement("button");
                button.type = "button";
                button.setAttribute("aria-label", "Страница " + (index + 1));
                button.setAttribute("aria-controls", "gallery-slides");
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
