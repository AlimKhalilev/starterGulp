export function placeElemPosY(elem, className) { // устанавливаем элемент сверху или снизу от основного элемента
    let height = Math.max(document.body.scrollHeight, 
                          document.body.offsetHeight, 
                          document.documentElement.clientHeight, 
                          document.documentElement.scrollHeight, 
                          document.documentElement.offsetHeight);
    let box = elem.getBoundingClientRect();

    if (Math.abs((height - (box.top + pageYOffset)) - elem.offsetHeight) < 2) { // если при показе у нас смещается высота страницы
        elem.classList.add(className);
    }
}