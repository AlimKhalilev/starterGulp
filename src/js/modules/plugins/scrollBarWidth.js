function getScrollBarWidth() { // получаем ширину скролла
    let width = 0;
    let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0); // высота видимой страницы
    let height = Math.max(document.body.scrollHeight, 
                          document.body.offsetHeight,   
                          document.documentElement.clientHeight, 
                          document.documentElement.scrollHeight, 
                          document.documentElement.offsetHeight); // общ. высота страницы

    const scrollBlock = document.createElement("div");
    scrollBlock.classList.add("scroll-block-dummy");
    document.body.appendChild(scrollBlock);

    const scrollBarWidth = scrollBlock.offsetWidth - scrollBlock.clientWidth;
    document.body.removeChild(scrollBlock);
    width = (height > vh ? scrollBarWidth : 0); // если общая высота страницы больше видимой высоты, не добавляем ширину скролла

    return function() {
        return width;
    }
}

export const scrollBarWidth = getScrollBarWidth(); // возвращаем через замыкание, чтобы каждый раз не создавать DOM узел