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

    function placeCustomSelectOptionY(c_select__body) {
        let html = document.documentElement;
        let body = document.body;
        let height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        let box = c_select__body.getBoundingClientRect();

        if (Math.abs((height - (box.top + pageYOffset)) - c_select__body.offsetHeight) < 1) { // если при показе у нас смещается высота страницы
            c_select__body.classList.add("c-select__body--top");
        }
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

        placeCustomSelectOptionY(c_select__body);

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