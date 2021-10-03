class Scroll {
    static overlayBurger = document.querySelector(".overlay--burger");

    static checkBeforeMove() {
        if (this.overlayBurger.classList.contains("visible")) { // если в момент клика открыта шторка бургер-меню
            this.overlayBurger.click();
        }
    }

    static moveTo(target) {
        this.checkBeforeMove();
        document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
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

Scroll.initEvents();