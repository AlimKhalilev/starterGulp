/* GLOBALS */

const g_html = document.documentElement;
const g_body = document.body;
const g_scrollBarWidth = getScrollBarWidth();

let myName = "";

document.addEventListener("click", function(e) { // прослушка элементов, которые необходимо закрыть по клику на вне
    let selector = "[data-mouseLeave]";
    let nodeElems = document.querySelectorAll(selector);

    nodeElems.forEach(elem => {
        if (e.target.closest(selector) === null) {
            elem.removeAttribute("open");
        }
    });
});

document.addEventListener("keydown", function(e) {
    if (e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
        myName += e.code.substr(3, 1);
        if (myName.substr(myName.length - 6, 6) == "FORMYS") {
            document.documentElement.requestFullscreen();
            Modal.show("easterEgg");
            myName = "";
        }
    }
});
  
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

    if (Math.abs((height - (box.top + pageYOffset)) - elem.offsetHeight) < 2) { // если при показе у нас смещается высота страницы
        elem.classList.add(className);
    }
}