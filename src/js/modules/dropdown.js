import { placeElemPosY } from "./plugins/placeElemPosY.js";

export function initDropdown() {
    document.querySelectorAll("[data-dropdown]").forEach(item => {
        let header = item.querySelector(".dropdown__header");
        let body = item.querySelector(".dropdown__body");
        placeElemPosY(body, "dropdown__body--top"); // позиционируем сверху, если он смещает контент

        header.addEventListener("click", () => {
            item.toggleAttribute("open");
        });
    });

}