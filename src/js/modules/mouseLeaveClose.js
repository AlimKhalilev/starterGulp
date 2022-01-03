export class MouseLeaveClose {
    static initEvents() {
        document.addEventListener("click", function(e) { // прослушка элементов, которые необходимо закрыть по клику на вне
            let selector = "[data-mouseLeave]";
            let nodeElems = document.querySelectorAll(selector);
        
            nodeElems.forEach(elem => {
                if (e.target.closest(selector) === null) {
                    elem.removeAttribute("open");
                }
            });
        });
    }
}