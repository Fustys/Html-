/*jslint browser */
document.addEventListener("DOMContentLoaded", function () {
    "use strict";
    const form = document.getElementById("service-calculator");
    const quantity = document.getElementById("service-quantity");
    const options = document.getElementById("service-options");
    const property = document.getElementById("service-property");
    const format = document.getElementById("ryzen-model");
    const urgent = document.getElementById("ryzen-x");
    const result = document.getElementById("service-result");
    const error = document.getElementById("service-error");
    const prices = {r5600: 11990, r7600: 17990, r7600x: 16990, r7700: 18990, r7700x: 21990};

    function update() {
        const type = form.querySelector("input[name=service-type]:checked").value;
        options.hidden = type !== "r7600";
        property.hidden = type !== "r7700";
        format.disabled = options.hidden;
        urgent.disabled = property.hidden;
        const valid = /^[1-9][0-9]{0,5}$/.test(quantity.value);
        quantity.setAttribute("aria-invalid", String(!valid));
        error.textContent = (
            valid
            ? ""
            : "Введите целое количество от 1 до 999999."
        );
        if (!valid) {
            result.textContent = "Стоимость не рассчитана.";
            return;
        }
        let unitPrice = prices[type];
        // Скрытые настройки не влияют на стоимость другой серии Ryzen.
        if (type === "r7600") {
            unitPrice = prices[format.value];
        }
        if (type === "r7700" && urgent.checked) {
            unitPrice = prices.r7700x;
        }
        const total = unitPrice * Number(quantity.value);
        result.textContent = "Стоимость: " + total.toLocaleString("ru-RU") + " ₽ (" + unitPrice.toLocaleString("ru-RU") + " ₽ × " + quantity.value + ")";
    }

    form.addEventListener("input", update);
    form.addEventListener("change", update);
    form.addEventListener("submit", function (event) {
        event.preventDefault();
    });
    update();
});
