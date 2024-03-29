import { BurgerMenu } from "./burger.js";

export class Scroll {
    static overlayBurger = document.querySelector(".overlay--burger");

    static checkBeforeMove() {
        if (this.overlayBurger.classList.contains("visible")) { // если в момент клика открыта шторка бургер-меню
            BurgerMenu.toggle(); // закрываем ее
        }
    }

    static moveTo(target) {
        this.checkBeforeMove();
        let elem = document.querySelector(target);
        if (elem !== null) {
            document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
        }
    }

    static initEvents() {
        document.querySelectorAll("[data-scroll]").forEach(item => {
            item.addEventListener("click", (e) => {
                e.preventDefault();
                this.moveTo(e.target.dataset.scroll);
            });
        });
    }
}