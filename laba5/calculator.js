/*jslint browser */
document.addEventListener("DOMContentLoaded", function () {
    "use strict";
    const form = document.getElementById("order-calculator");
    const quantity = document.getElementById("order-quantity");
    const product = document.getElementById("order-product");
    const result = document.getElementById("order-result");
    const error = document.getElementById("order-error");
    const prices = {"r5500": 9990, "r5600": 11990, "r5600x": 12700, "r5700x": 15990, "r7500f": 13990, "r7600": 17990, "r7700": 18990, "r7800x3d": 28790};

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const value = quantity.value;
        // Проверяем всю строку, чтобы «2abc» не превратилось в 2.
        const valid = /^[1-9][0-9]{0,5}$/.test(value);
        quantity.setAttribute("aria-invalid", String(!valid));
        error.textContent = (
            valid
            ? ""
            : "Введите целое количество от 1 до 999999 без пробелов и других символов."
        );
        if (!valid) {
            result.textContent = "Стоимость не рассчитана.";
            quantity.focus();
            return;
        }
        const total = prices[product.value] * Number(value);
        result.textContent = "Стоимость заказа: " + total.toLocaleString("ru-RU") + " ₽";
    });

    form.addEventListener("input", function () {
        result.textContent = "Нажмите «Рассчитать стоимость».";
        error.textContent = "";
        quantity.removeAttribute("aria-invalid");
    });
});
