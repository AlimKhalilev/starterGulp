class BurgerMenu {
    static button_burger = $("[data-burger='button']");
    static menu_burger = $("[data-burger='menu']");
    static overlay = document.querySelector(".overlay--burger");
    static checkbox = $(this.button_burger).find("input");
    static state = false;

    static toggle() {
        if (this.button_burger.is(':visible')) { // если иконка бургерного меню видна (мы на мобилке)
            this.menu_burger.slideToggle('normal');
            this.overlay.classList.toggle("visible");
            g_body.classList.toggle("hideScroll");
    
            this.checkbox.prop("checked", !this.state); 
            this.state = !this.state;
        }
        else {
            return "Невозможно открыть бургерное меню, так как его переключатель на данный момент скрыт";
        }
    }

    static initEvents() {
        this.overlay.addEventListener("click", () => {
            this.toggle();
        });

        $(this.checkbox).change(() => {
            this.toggle();
        });
    }
}

BurgerMenu.initEvents();