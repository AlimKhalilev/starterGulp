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
    
    /* GLOBALS */

const g_html = document.documentElement;
const g_body = document.body;
const g_scrollBarWidth = getScrollBarWidth();
  
function getScrollBarWidth() { // получаем ширину скролла
    let vh = Math.max(g_html.clientHeight || 0, window.innerHeight || 0); // высота видимой страницы
    let height = Math.max(g_body.scrollHeight, g_body.offsetHeight, g_html.clientHeight, g_html.scrollHeight, g_html.offsetHeight); // общ. высота страницы

    const scrollBlock = document.createElement("div");
    scrollBlock.classList.add("scroll-block-dummy");
    g_body.appendChild(scrollBlock);

    const scrollBarWidth = scrollBlock.offsetWidth - scrollBlock.clientWidth;
    g_body.removeChild(scrollBlock);
    return (height > vh ? scrollBarWidth : 0); // если общая высота страницы больше видимой высоты, не добавляем ширину скролла
}

function placeElemPositionY(elem, className) { // устанавливаем элемент сверху или снизу от основного элемента
    let height = Math.max(g_body.scrollHeight, g_body.offsetHeight, g_html.clientHeight, g_html.scrollHeight, g_html.offsetHeight);
    let box = elem.getBoundingClientRect();

    if (Math.abs((height - (box.top + pageYOffset)) - elem.offsetHeight) < 1) { // если при показе у нас смещается высота страницы
        elem.classList.add(className);
    }
}

    class Modal {
    static overlay = document.querySelector(".overlay--modal");
    static header = document.querySelector(".header");
    static paddingElems = [g_body, this.header];
    static isModalVisible = false; // открыто ли какое-либо модальное окно

    static toggleOverlay() {
        this.overlay.classList.toggle("visible");
        g_body.classList.toggle("hideScroll");
        this.paddingElems.forEach(elem => { // все элементы, куда нужно добавить padding - добавляем
            elem.style.paddingRight = (elem.style.paddingRight === "" ? `${g_scrollBarWidth}px` : "");
        });
    }

    static show(id) {
        if (!this.isModalVisible) {
            this.toggleOverlay();
            document.querySelector(`#${id}`).classList.add("visible");
            this.isModalVisible = true;
        }
        else {
            return "Модальное окно уже открыто!";
        }
    }

    static change(id) { // закрыть текущее модальное окно, и открыть новое через 700 мс
        this.close();
        setTimeout(() => this.show(id), 700);
    }

    static close() {
        if (this.isModalVisible) {
            document.querySelector(".modal.visible").classList.remove("visible");
            setTimeout(() => {
                this.toggleOverlay();
                this.isModalVisible = false;
            }, 150); // так как 0.3s ease-in-out, это нужно чтобы окно модальное не прыгало резко влево во время закрытия
        }
        else {
            return "Активное модальное окно отсутствует!";
        }
    }

    static initEvents() {
        document.querySelectorAll("[data-modal]").forEach(item => {
            item.addEventListener("click", () => {
                this.show(item.dataset.modal)
            });
        });
    
        document.querySelectorAll("[data-changeModal]").forEach(item => {
            item.addEventListener("click", () => this.change(item.dataset.changemodal));
        });
        
        document.querySelectorAll("[data-closeModal]").forEach(item => {
            item.addEventListener("click", () => this.close());
        });
    }
}

Modal.initEvents();
    class BurgerMenu {
    static button_burger = $("[data-burger='button']");
    static menu_burger = $("[data-burger='menu']");
    static overlay = document.querySelector(".overlay--burger");
    static checkbox = $(this.button_burger).find("input");
    static state = false;

    static toggle() {
        this.menu_burger.slideToggle('normal');
        this.overlay.classList.toggle("visible");
        g_body.classList.toggle("hideScroll");

        this.checkbox.prop("checked", !this.state); 
        this.state = !this.state;
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
    // link: http://sachinchoolur.github.io/lightslider/

function initSlider() {
    // data-slider="4,3,2,1" (СТРОКА, ГДЕ ЧИСЛА ЧЕРЕЗ ЗАПЯТУЮ БЕЗ ПРОБЕЛОВ: число элементов на компе, на ноуте, на планшете, на мобилках)

    let screen_sm = 768; // mobile
    let screen_md = 992; // planshet
    let screen_lg = 1280; // notebooks

    $("[data-slider]").each(function(_, elem) {
        let items = elem.dataset.slider.split(",");
        if (items.length != 4) { // если в dataset слайдера нет 3 количеств элементов для 3 разрешений 
            items = [1, 1, 1, 1]; // на всех разрешениях будет по 1 элементу
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
                    breakpoint: screen_lg,
                    settings: {
                        item: items[1],
                    }
                },
                {
                    breakpoint: screen_md,
                    settings: {
                        item: items[2],
                    }
                },
                {
                    breakpoint: screen_sm,
                    settings: {
                        item: items[3],
                    }
                }
            ]
        }); 
    });

}

initSlider();
    class Scroll {
    static overlayBurger = document.querySelector(".overlay--burger");

    static checkBeforeMove() {
        if (this.overlayBurger.classList.contains("visible")) { // если в момент клика открыта шторка бургер-меню
            BurgerMenu.toggle(); // закрываем ее
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
    
    function inputChangeTypePassword() {
    let pathSvg = "img/sprite.svg";
    let iconsNames = ["#eye_open", "#eye_close"];

    document.querySelectorAll("[data-passwordSwitcher]").forEach(item => {
        let icon = item.querySelector(".c-field__icon");
        let input = item.querySelector(".c-field__input");
        let icon_use = item.querySelector(".c-field__icon use");

        icon.addEventListener("click", (e) => {
            if (input.getAttribute("type") == "password") {
                input.setAttribute("type", "text");
                icon_use.setAttribute("xlink:href", pathSvg + iconsNames[0])
            }
            else {
                input.setAttribute("type", "password");
                icon_use.setAttribute("xlink:href", pathSvg + iconsNames[1]);
            }
        });
    });
}

inputChangeTypePassword();
    function initCustomSelect() {
    document.querySelectorAll("[data-customSelect]").forEach(item => {
        let parentElem = item.parentNode;
        let optionNodeList = item.querySelectorAll("option");
        let icon = parentElem.querySelector("svg");

        item.classList.add("visually-hidden");
        renderCustomSelect(parentElem, optionNodeList, icon);

    });

    function getActiveTitle(nodeList) {
        let activeTitle = "";
        nodeList.forEach((option, i) => {
            if (i == 0) {
                activeTitle = option.innerHTML;
            }
            if (option.hasAttribute("selected")) {
                activeTitle = option.innerHTML;
            }
        });
        return activeTitle;
    }

    function renderCustomSelectItems(nodeList, itemsList) {
        itemsList.innerHTML = "";

        nodeList.forEach((option, id) => {
            let c_select__item = document.createElement("li");
            c_select__item.classList.add("c-select__item");
            c_select__item.setAttribute("data-id", id);
            c_select__item.innerHTML = option.innerHTML;

            option.getAttributeNames().forEach(attr => {
                c_select__item.setAttribute(attr, option.getAttribute(attr));
            });

            itemsList.appendChild(c_select__item);
        });
    }

    function renderCustomSelect(parent, nodeList, icon) {
        let c_select__inner = document.createElement("div");
        c_select__inner.classList.add("c-select__inner");

        let c_select__header = document.createElement("div");
        c_select__header.classList.add("c-select__header");

        let c_select__title = document.createElement("span");
        c_select__title.classList.add("c-select__title");
        c_select__title.innerHTML = getActiveTitle(nodeList);

        c_select__header.appendChild(c_select__title);
        if (icon !== null) {
            c_select__header.appendChild(icon);
        }

        let c_select__body = document.createElement("div");
        c_select__body.classList.add("c-select__body");

        c_select__header.classList.add("c-select__container");
        c_select__body.classList.add("c-select__container");

        let c_select__items = document.createElement("ul");
        c_select__items.classList.add("c-select__items");

        renderCustomSelectItems(nodeList, c_select__items);

        c_select__body.appendChild(c_select__items);

        c_select__inner.appendChild(c_select__header);
        c_select__inner.appendChild(c_select__body);

        parent.appendChild(c_select__inner);

        placeElemPositionY(c_select__body, "c-select__body--top");

        c_select__inner.addEventListener("click", function(e) {
            c_select__inner.classList.toggle("c-select__inner--open");
        });

        c_select__items.addEventListener("click", function(e) {
            if (e.target.classList.contains("c-select__item")) {
                nodeList.forEach(elem => {
                    elem.removeAttribute("selected");
                });
                nodeList[+e.target.dataset.id].setAttribute("selected", "");
                renderCustomSelectItems(nodeList, c_select__items);
                c_select__title.innerHTML = getActiveTitle(nodeList);
            }
        });
    }
}

initCustomSelect();
    function initDetails() {
    $("[data-details]").each(function() {
        $(this).find(".details__header").click(() => {
            $(this).find(".details__body").slideToggle('normal'); // плавно открываем или закрываем body details
            $(this).toggleClass("details--opened"); // по необходимости добавляем модификатор открытого details
        });
    });
}

initDetails();

/*
// код был написан, дабы избежать использования jquery, однако он хуже и менее читабельный
// желательно доработь код и сделать более читабельным

function moveDetailsBody(body, height, state) {
    let counterHeight = (state === 1 ? 0 : height);
    let counterStep = 2;
    let counterDelay = 5;

    let interval = setInterval(() => {
        counterHeight += counterStep * +state;
        body.style.height = counterHeight + "px";

        if ((state === 1 && counterHeight >= height) || (state === -1 && counterHeight <= 0)) {
            clearTimeout(interval);
            body.style.height = (state === 1 ? height : 0) + "px";
        }

    }, counterDelay);
}

document.querySelectorAll("[data-details]").forEach(item => {
    let d_header = item.querySelector(".details__header");
    let d_body = item.querySelector(".details__body");
    let d_body_height = d_body.offsetHeight;
    d_body.style.height = 0;

    d_header.addEventListener("click", function() {
        item.classList.toggle("details--opened");
        moveDetailsBody(d_body, d_body_height, (d_body.offsetHeight === 0 ? 1 : -1));
    });
});

*/
    function initDropdown() {
    // document.querySelectorAll(".dropdown--click").forEach(item => {
    //     item.addEventListener("click", () => {
    //         item.classList.toggle("dropdown--active");
    //     });
    // });
    $(".dropdown").each(function () {
        let header = $(this).find(".dropdown__header");
        let body = $(this).find(".dropdown__body");

        placeElemPositionY(body[0], "dropdown__body--top"); // позиционируем сверху, если он смещает контент
        body.hide();

        if ($(this).hasClass("dropdown--click")) { // если имеет модификатор клика, вешаем событие на клик (тип dropdown)
            header.click(function () {
                body.fadeToggle("slow");
            });
        }
        else if ($(this).hasClass("dropdown--hover")) { // если нет, вешаем событие на наведение (тип tooltip)
            header.hover(
                function () {
                    body.fadeToggle("slow");
                }, function () {
                    body.fadeToggle("slow");
                }
            );
        }
    });


}

initDropdown();

    function adaptImg() {
    let basePixel = 16;

    setTimeout(() => { // на всякий случай, чтобы не было нулевых размеров 
        document.querySelectorAll("[adaptImg]").forEach(item => {
            let width = item.naturalWidth / basePixel;
            let height = item.naturalHeight / basePixel;

            if (width > 0) {
                item.style.width = `${width}rem`;
                //item.style.height = `${height}rem`;
            }
        });
    }, 50);
}

adaptImg();
