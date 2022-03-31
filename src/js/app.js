import { WebpClass } from "./modules/webpSupport.js";
import { Modal } from "./modules/modal.js";
import { Scroll } from "./modules/scroll.js";
import { EasterEgg } from "./modules/easterEgg.js";
import { MouseLeaveClose } from "./modules/mouseLeaveClose.js";
import { ContentSelect } from "./modules/contentSelect.js";
import { BurgerMenu } from "./modules/burger.js";
import { Intersection } from "./modules/intersection.js";

import { adaptImg } from "./modules/adaptImg.js";
import { initCustomSelect } from "./modules/customSelect.js";
import { inputChangeTypePassword } from "./modules/passwordSwitcher.js";
import { initDropdown } from "./modules/dropdown.js";
import { initDetails } from "./modules/details.js";
import { initFancyBox } from "./modules/fancybox.js";
import { initBodyVh } from "./modules/bodyVh.js";

import { catSwiper } from "./modules/swiper.js";

WebpClass.init(); // добавление класса webp для тэга html
MouseLeaveClose.initEvents(); // добавление обработчика по атрибуту data-mouseLeave чтобы закрыть элемент из вне (клик по body куда-либо)
Modal.initEvents(); // инициализация событий модального окна
Scroll.initEvents(); // инициализация скролла до элемента
Intersection.initAnimEvents(); // инициализация прослушивания скролла до элемента
EasterEgg.initEvents(); // инициализация пасхалки FORMYS
ContentSelect.createMarkup(); // создать разметку для ContentSelect
ContentSelect.initEvents(); // инициализация событий ContentSelect
BurgerMenu.initEvents(); // инициализация бургерного меню на мобилке

initCustomSelect(); // инициализация кастомного селекта
adaptImg(); // инициализация включения размера картинки в rem'ах при атрибуте adaptImg у тэга img
inputChangeTypePassword(); // инициализация переключателя типа поля (password / text)
initDropdown(); // инициализация выпадающего меню
initDetails(); // инициализация блока details
initBodyVh(); // прописываем переменную css (--vh) для body (адаптивная высота под мобилку)
initFancyBox(); // инициализация библиотеки для галереи

document.querySelectorAll(".version").forEach(item => { // устанавливаем на нужных элементах версию разработки
    item.innerHTML = "1.3.1";
});

document.querySelectorAll(".year").forEach(item => { // устанавливаем на нужных элементах версию разработки
    item.innerHTML = new Date().getFullYear();
});