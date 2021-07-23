--include("_webpsup.js");

$(document).ready(function() {

    /* GLOBALS */

    const g_html = document.documentElement;
    const g_body = document.body;
    const g_scrollBarWidth = getScrollBarWidth();

    function getScrollBarWidth() { // получаем ширину скролла
        let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0); // высота видимой страницы
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
    
    // ##############

    --include("_modal.js")
    --include("_burger.js")
    --include("_slider.js")
    --include("_scroll.js")
    
    --include("_passwordSwitcher.js")
    --include("_customSelect.js")
    --include("_details.js")
    --include("_dropdown.js")
});