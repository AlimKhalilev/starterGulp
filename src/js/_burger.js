function initBurgerMenu() {
    let button_burger = $("[data-burger='button']");
    let menu_burger = $("[data-burger='menu']");
    let overlay = document.querySelector(".overlay_burger");
    let body = document.body;

    function hideMenu() {
        menu_burger.slideUp('normal');
        overlay.classList.remove("visible");
        body.classList.remove("hideScroll");
    }

    function showMenu() {
        menu_burger.slideDown('normal');
        overlay.classList.add("visible");
        body.classList.add("hideScroll");
    }
    
    $(button_burger).click(() => {
        if (!menu_burger.is(':visible')) {
            showMenu()
        } 
        else {
            hideMenu()
        }
    });

    overlay.addEventListener("click", () => {
        $(button_burger).click();
        $(button_burger).find("input").prop('checked', false);
    });
}

initBurgerMenu();