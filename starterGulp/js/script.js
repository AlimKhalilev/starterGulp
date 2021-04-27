// Проверка на поддержку WebP от браузера

function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
    if (support == true) {
        document.querySelector('body').classList.add('webp-support');
    }
});;

$(document).ready(function() {
 
    function initModal() {
    let overlay = document.querySelector(".overlay_modal");
    let body = document.body;
    
    function showModal(id) {
        overlay.classList.add("visible");
        body.classList.add("hideScroll");
        document.querySelector(`#${id}`).classList.add("visible");
    }

    function changeModal(id) { // закрыть текущее модальное окно, и открыть новое через 700 мс
        closeModal();
        setTimeout(() => showModal(id), 700);
    }
    
    function closeModal() {
        overlay.classList.remove("visible");
        body.classList.remove("hideScroll");
        document.querySelector(".modal.visible").classList.remove("visible");
    }
    
    document.querySelectorAll("[data-modal]").forEach(item => {
        item.addEventListener("click", (e) => showModal(e.target.dataset.modal));
    });

    document.querySelectorAll("[data-changeModal]").forEach(item => {
        item.addEventListener("click", (e) => changeModal(e.target.dataset.changemodal));
    });
    
    document.querySelectorAll("[data-closeModal]").forEach(item => {
        item.addEventListener("click", () => closeModal());
    });
}

initModal();
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
    // link: http://sachinchoolur.github.io/lightslider/

function initSlider() {
    // data-slider="4,2,1" (СТРОКА, ГДЕ ЧИСЛА ЧЕРЕЗ ЗАПЯТУЮ БЕЗ ПРОБЕЛОВ: число элементов на компе, на планшете, на мобилках)

    let screen_xs = 576; // mobile
    let screen_sm = 768; // mobile-reverse

    $("[data-slider]").each(function(_, elem) {
        let items = elem.dataset.slider.split(",");
        if (items.length != 3) { // если в dataset слайдера нет 3 количеств элементов для 3 разрешений 
            items = [1, 1, 1]; // на всех разрешениях будет по 1 элементу
        }
        else {
            items = items.map(e => +e); // преобразуем строки в числа
        }

        $(elem).lightSlider({
            item: items[0],
            slideMove: 1,
            slideMargin: "",
            controls: true,
            easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
            speed: 600,
            responsive: [
                {
                    breakpoint: screen_sm,
                    settings: {
                        item: items[1],
                    }
                },
                {
                    breakpoint: screen_xs,
                    settings: {
                        item: items[2],
                    }
                }
            ]
        }); 
    });

}

initSlider();
    // link: https://selectric.js.org

function initSelectric() {
    document.querySelectorAll("select").forEach(item => {
        $(item).selectric();
    });
}

initSelectric();
    function initScroll() {
    let overlay_burger = document.querySelector(".overlay_burger");

    document.querySelectorAll("[data-scroll]").forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            scrollTo(e.target.dataset.scroll)
        });
    });

    function scrollTo(target) {
        if (document.querySelector(".overlay_burger.visible") !== null) { // если в момент клика открыта шторка бургер-меню
            overlay_burger.click();
        }
        document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
    }
}

initScroll();
    
});