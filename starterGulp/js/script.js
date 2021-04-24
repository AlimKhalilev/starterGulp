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
    
    function closeModal() {
        overlay.classList.remove("visible");
        body.classList.remove("hideScroll");
        document.querySelector(".modal.visible").classList.remove("visible");
    }
    
    document.querySelectorAll("[data-modal]").forEach(item => {
        item.addEventListener("click", (e) => showModal(e.target.dataset.modal));
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

    $('.main-slider').lightSlider({
    item: 5,
    slideMove: 1,
    slideMargin: "",
    controls: true,
    easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
    speed: 600,
    responsive: [
        {
            breakpoint: 780,
            settings: {
                item: 2,
                slideMove: 1
            }
        },
        {
            breakpoint: 578,
            settings: {
                item: 1,
                slideMove: 1
            }
        }
    ]
}); 
    
});